import React from 'react';
import { AuthProvider } from './context/AuthContext.jsx';
import Home from './pages/Home.jsx';
import './App.css';
import Contact from './components/Footer/ContactUs.jsx';
import PrivacyPolicy from './components/Footer/PrivacyPolicy.jsx';
import RefundPolicy from './components/Footer/RefundPolicy.jsx';
import Terms from './components/Footer/Terms.jsx';
import {Routes, Route } from "react-router-dom";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;