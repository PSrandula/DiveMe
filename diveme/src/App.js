import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import LoginPage from './components/login page/login'; 
import RegisterPage from './components/register page/register';
import HomePage from './components/home page/home';
import Navbar from './components/nav bar/navbar';
import Footer from './components/footer/footer';
import Packages from './components/packages/package';
import Map from './components/map/map';
import DiveCenter from './components/dive centers/divecenter';
import Booking from './components/booking page/booking';

function AppContent() {
  const location = useLocation();
  const hideNavbarRoutes = ['/', '/register'];

  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <div className="app-container">
      {!shouldHideNavbar && <Navbar />}
      
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/map" element={<Map />} />
        <Route path="/dive" element={<DiveCenter />} />
        <Route path="/booking" element={<Booking />} />
      </Routes>

      {!shouldHideNavbar && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
