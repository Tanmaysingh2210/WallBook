import React from "react";
import "./Wallpaper.css";

const WallpaperCard = ({ item, onDownload, onPreview }) => {
  const handleCardClick = (e) => {
    // download button pe click kare to preview na khule
    if (e.target.closest(".download-btn")) return;
    onPreview(item);
  };

  return (
    <div className="wallpaper-card" onClick={handleCardClick}>
      
      <div className="live-badge">
        <span className="live-dot" />
        Live
      </div>

     
      {item.isPremium && <div className="premium-badge">👑 Premium</div>}

      
      {item.mediaType === "video" ? (
        <video
          className="wallpaper-media"
          src={item.fullUrl}
          autoPlay
          loop
          muted
          playsInline
        />
      ) : (
        <img
          className="wallpaper-media"
          src={item.thumbnail}
          alt={item.title}
        />
      )}

      
      <div className="wallpaper-footer">
        <div className="wallpaper-title">{item.title}</div>
        <button
          className="download-btn"
          onClick={() => onDownload(item)}
        >
          ⬇ Download
        </button>
      </div>
    </div>
  );
};

export default WallpaperCard;