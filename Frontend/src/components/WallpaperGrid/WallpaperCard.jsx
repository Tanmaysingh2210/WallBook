// /src/components/WallpaperGrid/WallpaperCard.jsx
import React from 'react';

const WallpaperCard = ({ wallpaper, onDownload, onPreview }) => {

    const isVideo = wallpaper.type === 'video';
  return (
    <div className="wallpaper-card">
      {/* Live Badge */}
      <div className="live-badge">
        <span className="live-dot"></span>
        Live
      </div>

      {/* Premium Badge */}
      {wallpaper.premium && (
        <div className="premium-badge">
          👑 Premium
        </div>
      )}

      {/* Wallpaper Image - PREVIEW ON CLICK */}
      {isVideo ? (
        <video
          className="wallpaper-img"
          src={wallpaper.thumbnail}
          muted
          loop
          autoPlay
        />
      ) : (
      <img
        src={wallpaper.thumbnail}
        alt={wallpaper.title}
        className="wallpaper-img"
        loading="lazy"
        onClick={() => onPreview(wallpaper.id)}
      />
      )}

      {/* Overlay on Hover */}
      <div className="wallpaper-overlay">
        <div className="wallpaper-title">{wallpaper.title}</div>

        <div className="wallpaper-info">
          <span>📐 {wallpaper.resolution}</span>
          <span>⬇ {wallpaper.downloads}</span>
        </div>

        <div className="wallpaper-meta">
          {/* DOWNLOAD BUTTON – DIRECT DOWNLOAD */}
          <button
            className="download-btn"
            onClick={() => onDownload(wallpaper.id)}
          >
            ⬇ Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default WallpaperCard;
