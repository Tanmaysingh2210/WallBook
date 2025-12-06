import crypto from "crypto";
import razorpayInstance from "../../config/razorpay.js";
import Payment from "../../models/payment.js";
import User from "../../models/user.js";
import { start } from "repl";

export const createOrder = async (req, res) => {


    try {
        const { amount, planType } = req.body;
        const userId = req.user.id;

        if (!amount || amount <= 0) {
            return res.status(400).json({
                success: false,
                message: 'Invalid amount'
            });
        }

        const options = {
            amount: amount * 100,
            currency: 'INR',
            receipt: `receipt_${Date.now()}`,
            notes: {
                userId: userId,
                planType: planType
            },
        };

        const order = await razorpayInstance.orders.create(options);

        const payment = new Payment({
            userId: userId,
            razorpayOrderId: order.id,
            amount: amount,
            currency: options.currency,
            planType: planType,
            status: 'created'
        });

        await payment.save();

        res.status(200).json({
            success: true,
            order: {
                id: order.id,
                amount: order.amount,
                currency: order.currency
            },
            key: process.env.RAZORPAY_KEY_ID,
        });
    } catch (err) {
        console.error('Error creating order:', err);
        res.status(500).json({
            success: false,
            message: 'Failed to create order',
            error: err.message,
        });
    }
};

export const verifyPayment = async (req, res) => {


    function addDays(startDate, days) {
        const d = new Date(startDate);
        d.setDate(d.getDate() + days);
        return d;
    }

    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        const userId = req.user.id;

        const sign = razorpay_order_id + '|' + razorpay_payment_id;
        const expectedSign = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET)
            .update(sign.toString())
            .digest('hex');

        if (razorpay_signature !== expectedSign) {
            return res.status(400).json({
                success: false,
                message: 'Invalid payment signature'
            });
        }

        const payment = await Payment.findOne({ razorpayOrderId: razorpay_order_id });
        if (!payment) {
            return res.status(404).json({
                success: false,
                message: 'Payment record not found'
            });
        }

        payment.razorpayPaymentId = razorpay_payment_id;
        payment.razorpaySignature = razorpay_signature;
        payment.status = 'paid';
        await payment.save();

        const startDate = new Date();
        let endDate;

        switch (payment.planType) {
            case 'basic':
                endDate = addDays(startDate, 7);
                break;
            case 'pro':
                endDate = addDays(startDate, 30);
                break;
            case 'enterprise':
                endDate = addDays(startDate , 90);
                break;
            default:
                throw new Error("Unknown plan type");
        }

        // Update user record
        const user = await User.findByIdAndUpdate(
            userId,
            {
                isPremium: true,
                planType: payment.planType,
                subscriptionStartDate: startDate,
                subscriptionEndDate: endDate,
                lastPaymentId: payment._id,
            },
            { new: true }
        ).select('-password');

        res.status(200).json({
            success: true,
            message: 'Payment verified successfully',
            user: user,
            payment: payment,
        });
    } catch (err) {
        console.error('Error verifying payment:', err);
        res.status(500).json({
            success: false,
            message: 'Failed to verify payment',
            error: err.message,
        });
    }
};

export const getPaymentHistory = async (req, res) => {
    try {
        const userId = req.user.id;

        const payments = await Payment.find({ userId: userId })
            .sort({ createdAt: -1 })
            .select('-__v');

        res.status(200).json({
            success: true,
            payments: payments,
        });
    } catch (error) {
        console.error('Error fetching payment history:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch payment history',
            error: error.message,
        });
    }
};
