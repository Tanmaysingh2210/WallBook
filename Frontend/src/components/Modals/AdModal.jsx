// /src/components/Modals/AdModal.jsx
import React, { useState, useEffect } from 'react';
import Button from '../common/Button.jsx';
import { AD_DURATION } from '../../utils/constants.js';
import './Modal.css';

const AdModal = ({ isOpen, onClose, onAdComplete }) => {
  const [timeLeft, setTimeLeft] = useState(AD_DURATION);

  useEffect(() => {
    if (!isOpen) {
      // reset timer when modal is closed
      setTimeLeft(AD_DURATION);
      return;
    }

    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isOpen, timeLeft]);

  const handleComplete = () => {
    onAdComplete();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal active">
      <div className="modal-content">
        {/* Optional close button using .close-modal from Modal.css */}
        <button className="close-modal" onClick={onClose}>
          &times;
        </button>

        <h2 className="modal-title">Watch Advertisement</h2>

        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              background: 'var(--dark)',
              padding: '4rem',
              borderRadius: '15px',
              margin: '1rem 0',
              border: '2px dashed var(--text-gray)',
            }}
          >
            <p
              style={{
                color: 'var(--text-gray)',
                marginBottom: '2rem',
              }}
            >
              Advertisement will play here
            </p>

            <div
              style={{
                fontSize: '4rem',
                fontWeight: 'bold',
                color: 'var(--primary)',
              }}
            >
              {timeLeft}
            </div>
          </div>

          <Button
            variant="primary"
            fullWidth
            disabled={timeLeft > 0}
            onClick={handleComplete}
          >
            {timeLeft > 0
              ? `Please wait... (${timeLeft}s)`
              : 'Download Now'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdModal;
