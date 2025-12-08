import React, { useState } from "react";
import Navbar from "../components/Navbar.jsx";
import WallpaperCard from "../components/WallpaperCard.jsx";
import LoginModal from "../components/loginModal.jsx";
import OtpModal from "../components/OtpModal.jsx";
import AdModal from "../components/AdModal";
import SubscriptionModal from "../components/SubscriptionModal.jsx";
import { WALLPAPERS } from "../data/wallpapers.js";
import { useAuth } from "../context/AuthContext.jsx";
import axios from "axios";
import "./Home.css";
import PreviewModal from "../components/PreviewModal.jsx";


const Home = () => {
  const { user , logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
const [activeTab, setActiveTab] = useState("all"); 

const [showOtpModal, setShowOtpModal] = useState(false);
const [otpEmail, setOtpEmail] = useState("");
  const [loginOpen, setLoginOpen]       = useState(false);
  const [adOpen, setAdOpen]             = useState(false);
  const [subOpen, setSubOpen]           = useState(false);
  const [selectedWallpaper, setSelectedWallpaper] = useState(null);
  const [previewOpen, setPreviewOpen] = useState(false);
const [previewItem, setPreviewItem] = useState(null);

  // ---------- preview (new tab) ----------
  const handlePreview = (item) => {
  setPreviewItem(item);
  setPreviewOpen(true);
};


  // ---------- actual file download (axios → blob) ----------
  const startDownload = async (item) => {
    try {
      const res = await axios.get(item.fullUrl, {
        responseType: "blob",
      });

      const blob = new Blob([res.data], {
        type: item.mediaType === "video" ? "video/mp4" : "image/jpeg",
      });

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download =
        item.title.replace(/\s+/g, "_").toLowerCase() +
        (item.mediaType === "video" ? ".mp4" : ".jpg");
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("download error", err);
      alert("Download failed");
    }
  };

  // ---------- Download rules ----------
  const handleDownload = (item) => {
    // PREMIUM wallpaper
    if (item.isPremium) {
      if (!user) {
        setLoginOpen(true);
        return;
      }
      if (!user.isPremium) {
        setSubOpen(true);
        return;
      }
      startDownload(item); // logged in + premium
      return;
    }

    // NON-PREMIUM wallpaper
    if (user?.isPremium) {
      // premium user => no ads
      startDownload(item);
      return;
    }

    // free user => watch ad then download
    setSelectedWallpaper(item);
    setAdOpen(true);
  };

  const handleAdComplete = () => {
    if (selectedWallpaper) {
      startDownload(selectedWallpaper);
    }
    setAdOpen(false);
  };

  const filteredWallpapers = WALLPAPERS.filter((item) => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return true; //serachbox khalitosb dikhega

    const Title = item.title.toLowerCase().includes(q);
    const Tags = item.tags?.some((tag) =>
      tag.toLowerCase().includes(q)
    );

    return Title || Tags;
  }

);

const filteredByTab = filteredWallpapers.filter((item) => {
  if (activeTab === "all") return true;
  if (activeTab === "trending") return item.trending === true;
});

  return (
    <div className="home-root">
      <Navbar
      user={user}
        onLoginClick={() => setLoginOpen(true)}
        onProClick={() => setSubOpen(true)}
        onLogoutClick={logout}  
         searchValue={searchTerm}            
        onSearchChange={setSearchTerm}
      />

      <div className="filter-bar"
      style={{
    textAlign: "center",
    display: "flex",
    // justifyContent: "space-between",
    gap:"4em",
    alignItems: "center",
    padding: "12px 16px",
    margin: "0 2em"
  }}
      >
  <span
    className={activeTab === "all" ? "tab active" : "tab"}
    onClick={() => setActiveTab("all")}
  >
    All
  </span>

  <span
    className={activeTab === "trending" ? "tab active" : "tab"}
    onClick={() => setActiveTab("trending")}
  >
    🔥 Trending
  </span>
</div>


      <main className="home-main">
        <div className="wallpaper-grid">
          
            {filteredByTab.map((item) => (
            <WallpaperCard
                key={item.id}
                item={item}
                onDownload={handleDownload}
                onPreview={handlePreview}
  />
))}

            
          
        </div>
      </main>

      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} onRegisterSuccess={(email) => {
    setOtpEmail(email);
    setShowOtpModal(true);  // OTP modal khol do
  }} />

  <OtpModal
  open={showOtpModal}
  email={otpEmail}
  onClose={() => setShowOtpModal(false)}
  onVerified={(user) => {
    // yahan chaaho to AuthContext ka setUser call kar sakte ho
    console.log("verified user", user);
  }}
/>

  <PreviewModal
  open={previewOpen}
  item={previewItem}
  onClose={() => setPreviewOpen(false)}
/>


      <AdModal
        open={adOpen}
        onClose={() => setAdOpen(false)}
        onComplete={handleAdComplete}
      />
      <SubscriptionModal open={subOpen} onClose={() => setSubOpen(false)} />
    </div>
  );
};

export default Home;
