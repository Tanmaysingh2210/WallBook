import express from 'express';
import {createOrder , verifyPayment , getPaymentHistory} from '../controllers/payment/paymentController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/create-order',authMiddleware, createOrder);
router.post('/verify-payment',authMiddleware, verifyPayment);
router.get('/history',authMiddleware, getPaymentHistory);

export default router;