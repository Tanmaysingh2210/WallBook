// /src/components/Modals/SubscriptionModal.jsx
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import Button from '../common/Button.jsx';
import { SUBSCRIPTION_PLANS } from '../../utils/constants.js';
import { initiateRazorpayPayment, loadRazorpayScript } from '../../services/razorpay.js';
import { api } from '../../services/api.js';
import './Modal.css';

const SubscriptionModal = ({ isOpen, onClose }) => {
  
  const [selectedPlan, setSelectedPlan] = useState('MONTHLY');
  const [loading, setLoading] = useState(false);
  const { user, updateSubscription } = useAuth();

  const handlePayment = async () => {
    if (!selectedPlan) {
      alert('Please select a plan');
      return;
    }

    setLoading(true);

    try {
      // Load Razorpay script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        alert('Failed to load payment gateway');
        return;
      }

      // Create order (sends 'MONTHLY' or 'YEARLY' to backend)
      const orderData = await api.createOrder(selectedPlan);

      // Initialize Razorpay payment
      initiateRazorpayPayment(
        orderData,
        user,
        async (response) => {
          // Payment successful -> verify on backend
          const verifyResult = await api.verifyPayment(
            response.razorpay_payment_id,
            response.razorpay_order_id,
            response.razorpay_signature
          );

          if (verifyResult.success) {
            updateSubscription(verifyResult.subscription);
            alert('Subscription activated successfully!');
            onClose();
          }
        },
        (error) => {
          console.error('Payment failed:', error);
          alert('Payment failed. Please try again.');
        }
      );
    } catch (error) {
      console.error('Error processing payment:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal active">
      <div className="modal-content">
        {/* Close button (Modal.css: .close-modal) */}
        <button className="close-modal" onClick={onClose}>
          &times;
        </button>

        {/* Title (Modal.css: .modal-title) */}
        <h2 className="modal-title">Choose Your Plan</h2>
        <p
          style={{
            color: 'var(--text-gray)',
            marginBottom: '1rem',
          }}
        >
          Unlock unlimited premium wallpapers
        </p>

        {/* Plans grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '1.5rem',
            marginTop: '1.5rem',
          }}
        >
          {Object.entries(SUBSCRIPTION_PLANS).map(([key, plan]) => (
            <div
              key={key}
              onClick={() => setSelectedPlan(key)} // use key directly: 'MONTHLY' / 'YEARLY'
              style={{
                padding: '2rem',
                border: `2px solid ${
                  selectedPlan === key ? 'var(--primary)' : 'var(--dark-lighter)'
                }`,
                borderRadius: '15px',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s',
                background:
                  selectedPlan === key ? 'var(--dark-lighter)' : 'var(--dark)',
              }}
            >
              <h3>{plan.name}</h3>

              <div
                style={{
                  fontSize: '2.5rem',
                  fontWeight: 'bold',
                  color: 'var(--primary)',
                  margin: '1rem 0',
                }}
              >
                ₹{plan.price}
              </div>

              <p style={{ color: 'var(--text-gray)' }}>per {plan.duration}</p>

              {plan.savings && (
                <span
                  style={{
                    background: 'var(--premium)',
                    color: 'var(--dark)',
                    padding: '0.4rem 1rem',
                    borderRadius: '20px',
                    fontSize: '0.85rem',
                    fontWeight: 'bold',
                    display: 'inline-block',
                    marginTop: '0.5rem',
                  }}
                >
                  Save {plan.savings}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Continue button */}
        <Button
          variant="primary"
          fullWidth
          onClick={handlePayment}
          disabled={loading}
          style={{ marginTop: '2rem' }}
        >
          {loading ? 'Processing...' : 'Continue to Payment'}
        </Button>
      </div>
    </div>
  );
};

export default SubscriptionModal;
