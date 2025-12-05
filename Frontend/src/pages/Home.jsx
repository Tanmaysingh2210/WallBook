// /src/pages/Home.jsx
import React, { useState } from 'react';
import Navbar from '../components/Navbar/Navbar.jsx';
import FilterBar from '../components/FilterBar/FilterBar.jsx';
import WallpaperGrid from '../components/WallpaperGrid/WalllpaperGrid.jsx';
import LoginModal from '../components/Modals/loginModal.jsx';
import PremiumChoiceModal from '../components/Modals/PremiumChoiceModal.jsx';
import AdModal from '../components/Modals/AdModal.jsx';
import SubscriptionModal from '../components/Modals/SubscriptionModal.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useWallpapers } from '../hooks/useWallpapers.js';
import { downloadFile } from '../utils/helpers.js';
import { WALLPAPERS } from '../data/wallpapers.js';
import './Home.css';

const Home = () => {
  const { user } = useAuth();
  const { wallpapers, filter, setFilter, searchQuery, setSearchQuery } = useWallpapers();
  
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [showAdModal, setShowAdModal] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [currentWallpaper, setCurrentWallpaper] = useState(null);

  const handleDownload = (wallpaperId) => {
  const wallpaper = WALLPAPERS.find(w => w.id === wallpaperId);
  const ext = wallpaper.type === "video" ? "mp4" : "jpg";

  if (!wallpaper.premium) {
    // Free wallpaper - direct download
    downloadFile(wallpaper.fullImage, `${wallpaper.title}${ext}`);
    wallpaper.downloads++;
  } else {
    // Premium wallpaper
    if (!user) {
      setShowLoginModal(true);
    } else if (user.subscription) {
      downloadFile(wallpaper.fullImage, `${wallpaper.title}${ext}`);
      wallpaper.downloads++;
    } else {
      setCurrentWallpaper(wallpaper);
      setShowPremiumModal(true);
    }
  }
};

const handlePreview = (wallpaperId) => {
  const wallpaper = WALLPAPERS.find(w => w.id === wallpaperId);
  if (!wallpaper) return;
  window.open(wallpaper.fullImage, '_blank'); // sirf open, download nahi
};



  const handleWatchAd = () => {
    setShowPremiumModal(false);
    setShowAdModal(true);
  };

  const handleSubscribe = () => {
    setShowPremiumModal(false);
    setShowSubscriptionModal(true);
  };

  const handleAdComplete = () => {
    if (currentWallpaper) {
      downloadFile(currentWallpaper.fullImage, `${currentWallpaper.title}${ext}`);
      currentWallpaper.downloads++;
    }
  };

  return (
    <div className="home">
      <Navbar
        user={user}
        onLogin={() => setShowLoginModal(true)}
        onSubscribe={() => (user ? setShowSubscriptionModal(true) : setShowLoginModal(true))}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <FilterBar
        activeFilter={filter}
        onFilterChange={setFilter}
      />

      <div className="container">
        <WallpaperGrid
          wallpapers={wallpapers}
          onDownload={handleDownload}
          onPreview={handlePreview}
        />
      </div>

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />

      <PremiumChoiceModal
        isOpen={showPremiumModal}
        onClose={() => setShowPremiumModal(false)}
        onWatchAd={handleWatchAd}
        onSubscribe={handleSubscribe}
      />

      <AdModal
        isOpen={showAdModal}
        onClose={() => setShowAdModal(false)}
        onAdComplete={handleAdComplete}
      />

      <SubscriptionModal
        isOpen={showSubscriptionModal}
        onClose={() => setShowSubscriptionModal(false)}
      />
    </div>
  );
};

export default Home;
