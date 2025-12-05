export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';
export const RAZORPAY_KEY = process.env.REACT_APP_RAZORPAY_KEY || 'rzp_test_key';

export const SUBSCRIPTION_PLANS = {
  MONTHLY: {
    name: 'Monthly',
    price: 99,
    duration: '1 month'
  },
  YEARLY: {
    name: 'Yearly',
    price: 999,
    duration: '1 year',
    savings: '17%'
  }
};

export const AD_DURATION = 5; // seconds