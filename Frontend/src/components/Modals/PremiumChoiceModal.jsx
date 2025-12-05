// /src/components/Modals/PremiumChoiceModal.jsx
import React from 'react';
import './Modal.css';

const PremiumChoiceModal = ({ isOpen, onClose, onWatchAd, onSubscribe }) => {
  if (!isOpen) return null;

  return (
    <div className="modal active">
      <div className="modal-content">
        {/* close button (matches .close-modal in Modal.css) */}
        <button className="close-modal" onClick={onClose}>
          &times;
        </button>

        {/* title (matches .modal-title in Modal.css) */}
        <h2 className="modal-title">Premium Wallpaper</h2>

        <p
          style={{
            color: 'var(--text-gray)',
            marginBottom: '1rem',
          }}
        >
          Choose how you want to download this premium wallpaper:
        </p>

        {/* choices container */}
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            marginTop: '2rem',
          }}
        >
          {/* WATCH AD OPTION */}
          <div
            onClick={onWatchAd}
            style={{
              flex: 1,
              padding: '2rem',
              border: '2px solid var(--dark-lighter)',
              borderRadius: '15px',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s',
              background: 'var(--dark)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--primary)';
              e.currentTarget.style.transform = 'translateY(-5px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--dark-lighter)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <div
              style={{
                fontSize: '3rem',
                marginBottom: '1rem',
              }}
            >
              📺
            </div>
            <h3>Watch Ad</h3>
            <p
              style={{
                color: 'var(--text-gray)',
                marginTop: '0.5rem',
              }}
            >
              Free download after watching a short ad
            </p>
          </div>

          {/* SUBSCRIBE OPTION */}
          <div
            onClick={onSubscribe}
            style={{
              flex: 1,
              padding: '2rem',
              border: '2px solid var(--dark-lighter)',
              borderRadius: '15px',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s',
              background: 'var(--dark)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--primary)';
              e.currentTarget.style.transform = 'translateY(-5px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--dark-lighter)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <div
              style={{
                fontSize: '3rem',
                marginBottom: '1rem',
              }}
            >
              ⭐
            </div>
            <h3>Get Pro</h3>
            <p
              style={{
                color: 'var(--text-gray)',
                marginTop: '0.5rem',
              }}
            >
              Unlimited premium downloads
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumChoiceModal;
