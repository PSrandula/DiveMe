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
import ActiveBooking from './components/active booking/activebooking';
import AboutUs from './components/about diveme/about';
import ContactUs from './components/contact us/contact';
import TermsConditions from './components/terms & conditions/terms&condition';

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
        <Route path="/activebooking" element={<ActiveBooking />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/terms&condition" element={<TermsConditions />} />
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
