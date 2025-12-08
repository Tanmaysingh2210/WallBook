import React from "react";
import "./Modal.css";

const PreviewModal = ({ open, item, onClose }) => {
  if (!open || !item) return null;

  const isVideo = item.mediaType === "video";

  return (
    <div className="modal-backdrop">
      {/* 🔥 Right-click disable added here */}
      <div
        className="modal"
        style={{ maxWidth: "420px" }}
        onContextMenu={(e) => e.preventDefault()}
      >
        <button className="modal-close" onClick={onClose}>
          ×
        </button>

        <h2 className="modal-title" style={{ marginBottom: "1rem" }}>
          {item.title}
        </h2>

        <div
          style={{
            width: "100%",
            borderRadius: "15px",
            overflow: "hidden",
            background: "#000",
          }}
        >
          {isVideo ? (
            <video
              src={item.fullUrl}
              autoPlay
              loop
              controls
              controlsList="nodownload"         // ❌ no download option
              disablePictureInPicture            // ❌ PIP block
              onContextMenu={(e) => e.preventDefault()} // ❌ right-click block
              style={{ width: "100%", display: "block" }}
            />
          ) : (
            <img
              src={item.fullUrl}
              alt={item.title}
              onContextMenu={(e) => e.preventDefault()}
              style={{ width: "100%", display: "block" }}
            />
          )}
        </div>

        <p
          style={{
            marginTop: "0.75rem",
            fontSize: "0.85rem",
            color: "var(--text-gray)",
          }}
        >
          Preview only – download will be done only using below{" "}
          <b>Download</b> button .
        </p>
      </div>
    </div>
  );
};

export default PreviewModal;
