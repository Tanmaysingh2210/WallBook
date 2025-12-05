export const initiateRazorpayPayment = (orderData, user, onSuccess, onFailure) => {
  const options = {
    key: process.env.REACT_APP_RAZORPAY_KEY,
    amount: orderData.amount,
    currency: orderData.currency,
    name: 'WallBook',
    description: `${orderData.plan} Subscription`,
    order_id: orderData.orderId,
    handler: function(response) {
      // Payment successful
      onSuccess(response);
    },
    prefill: {
      name: user.name,
      email: user.email,
    },
    theme: {
      color: '#ef4444'
    },
    modal: {
      ondismiss: function() {
        onFailure('Payment cancelled');
      }
    }
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
};

export const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};