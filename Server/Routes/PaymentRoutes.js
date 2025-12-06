import express from 'express';
import {createOrder , verifyPayment , getPaymentHistory} from '../controllers/payment/paymentController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware);
router.post('/create-order', createOrder);
router.post('/verify-payment', verifyPayment);
router.get('/history', getPaymentHistory);

export default router;