import React, { useState } from "react";
import "./Modal.css";
import Button from "../components/common/Button.jsx";
import { useAuth } from "../../src/context/AuthContext.jsx";
import { createOrderApi, verifyPaymentApi } from "../api/api.js";

// Razorpay script loader
const loadRazorpay = () =>
  new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });


const PLANS = {
  basic: { label: "Basic (7 days)", amount: 29 },
  pro: { label: "Pro (30 days)", amount: 79 },
  enterprise: { label: "Enterprise (90 days)", amount: 199 },
};

const SubscriptionModal = ({ open, onClose }) => {
  const { user, updateUser } = useAuth();
  const [selected, setSelected] = useState("pro");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleSubscribe = async () => {
    if (!user) {
      alert("Please login first");
      return;
    }

    setLoading(true);
    try {
      const ok = await loadRazorpay();
      if (!ok) {
        alert("Failed to load Razorpay");
        setLoading(false);
        return;
      }

      const { amount } = PLANS[selected];
      const { data } = await createOrderApi({
        amount,
        planType: selected,
      });

      const options = {
        key: data.key,
        amount: data.order.amount,
        currency: data.order.currency,
        name: "WallBook",
        description: `${PLANS[selected].label}`,
        order_id: data.order.id,
        handler: async (response) => {
          try {
            const verifyRes = await verifyPaymentApi({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (verifyRes.data.success) {
              updateUser(verifyRes.data.user);
              alert("Subscription activated!");
              onClose();
            } else {
              alert(verifyRes.data.message || "Verification failed");
            }
          } catch (err) {
            alert("Verification error");
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
        },
        theme: { color: "#ef4444" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Payment error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        <h2 className="modal-title">Get WallBook Pro</h2>
        <p className="modal-sub">
          Premium live wallpapers, no ads, high-quality downloads.
        </p>

        <div className="plan-grid">
          {Object.entries(PLANS).map(([key, plan]) => (
            <div
              key={key}
              className={`plan-card ${
                selected === key ? "plan-active" : ""
              }`}
              onClick={() => setSelected(key)}
            >
              <h3>{plan.label}</h3>
              <div className="plan-price">₹{plan.amount}</div>
            </div>
          ))}
        </div>

        <Button full onClick={handleSubscribe} disabled={loading}>
          {loading ? "Processing..." : "Continue to payment"}
        </Button>
      </div>
    </div>
  );
};

export default SubscriptionModal;
