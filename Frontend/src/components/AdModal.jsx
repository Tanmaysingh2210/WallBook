// src/components/modals/AdModal.jsx
import React, { useEffect, useState } from "react";
import Button from "../components/common/Button.jsx";
import "./Modal.css";

const AD_SECONDS = 5;

const AdModal = ({ open, onClose, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(AD_SECONDS);

  useEffect(() => {
    if (!open) {
      setTimeLeft(AD_SECONDS);
      return;
    }
    if (timeLeft <= 0) return;

    const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [open, timeLeft]);

  if (!open) return null;

  const handleClick = () => {
    if (timeLeft > 0) return;
    onComplete();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        <h2 className="modal-title">Watch Ad to Download</h2>
        <p className="modal-sub">
          Free download unlock hoga jaise hi ad timer complete hoga.
        </p>

        <div className="ad-box">
          <p>Ad is playing...</p>
          <div className="ad-timer">{timeLeft}s</div>
        </div>

        <Button
          full
          disabled={timeLeft > 0}
          onClick={handleClick}
        >
          {timeLeft > 0
            ? `Please wait (${timeLeft}s)`
            : "Download now"}
        </Button>
      </div>
    </div>
  );
};

export default AdModal;
