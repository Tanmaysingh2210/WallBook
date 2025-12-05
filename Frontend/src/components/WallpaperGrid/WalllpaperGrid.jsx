import React from 'react';
import WallpaperCard from './WallpaperCard';
import './WallpaperGrid.css';

const WallpaperGrid = ({ wallpapers, onDownload,onPreview }) => {
  if (wallpapers.length === 0) {
    return (
      <div className="no-results">
        <h2>No wallpapers found</h2>
        <p>Try adjusting your search or filter</p>
      </div>
    );
  }

  return (
    <div className="wallpaper-grid">
      {wallpapers.map((wallpaper) => (
        <WallpaperCard
          key={wallpaper.id}
          wallpaper={wallpaper}
          onDownload={onDownload}
          onPreview={onPreview}
        />
      ))}
    </div>
  );
};

export default WallpaperGrid;