import React from 'react';
import { AuthProvider } from './context/AuthContext.jsx';
import Home from './pages/Home.jsx';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Home />
    </AuthProvider>
  );
}

export default App;