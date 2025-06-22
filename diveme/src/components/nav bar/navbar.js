import React, { useState, useEffect } from 'react';
import { Search, Menu, X, Home, ShoppingBag, Users, MapPin, FileText, UserPlus } from 'lucide-react';

export default function DiveMeNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
         <header className={`diveme-header ${isScrolled ? 'scrolled' : ''}`}>
        {/* Logo Section */}
        <a href="/" className="logo-section" aria-label="DiveMe Home">
          <img
            src="./logo.jpg"
            alt="DiveMe Logo"
            className="logo-image"
            onError={(e) => {
              // Hide the image and show fallback when image fails to load
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
          <div className="logo-fallback" style={{display: 'none'}}>
            DM
          </div>
          <span className="logo-text">DiveMe</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="navigation">
          <div className="nav-links">
            <a href="/home" className="nav-link">
              <Home size={12} />
              Home
            </a>
            <a href="/admin" className="nav-link">
              <Users size={12} />
                Admin Dashboard
            </a>
            <a href="/packages" className="nav-link">
              <ShoppingBag size={12} />
              Packages
            </a>
            <a href="/map" className="nav-link">
              <MapPin size={12} />
                Map View
            </a>
            <a href="/dive" className="nav-link">
              <FileText size={12} />
              Dive Centers
            </a>
            <a href="/activebooking" className="nav-link">
              <FileText size={12} />
              Active Bookings
            </a>
          </div>
          <a href="/" className="signup-btn">
            <UserPlus size={12} />
            Sign Up
          </a>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="mobile-menu-toggle"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <nav className="mobile-nav-links">
          <a href="/home" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
            <Home size={20} />
            Home
          </a>
          <a href="/admin" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
            <Users size={20} />
            Admin Dashboard
          </a>
          <a href="/packages" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
            <ShoppingBag size={20} />
            Packages
          </a>
          <a href="/map" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
            <MapPin size={20} />
            MapView
          </a>
          <a href="/dive" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
            <FileText size={20} />
            Dive Centers
          </a>
          <a href="/activebooking" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
            <FileText size={20} />
            Active sBooking
          </a>
          <a href="/" className="mobile-signup-btn" onClick={() => setIsMobileMenuOpen(false)}>
            <UserPlus size={20} />
            Sign Up
          </a>
        </nav>
      </div>

      <style>{`
        /* General Reset */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Poppins', sans-serif;
        }

        /* Header Styles */
        .diveme-header {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 80px;
          z-index: 1000;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 2rem;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          background: rgba(0, 188, 212, 0.95);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 4px 20px rgba(0, 188, 212, 0.1);
        }

        .diveme-header.scrolled {
          height: 70px;
          background: rgba(0, 96, 167, 0.98);
          border-bottom-left-radius: 20px;
          border-bottom-right-radius: 20px;
          box-shadow: 0 8px 32px rgba(0, 96, 167, 0.3);
        }
        .diveme-header .logo-section {
         margin-top: 55px; /* Try 8px or adjust as needed */
        }


        /* Logo Section */
        .logo-section {
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          transition: transform 0.3s ease;
        }

        .logo-section:hover {
          transform: scale(1.05);
        }

        .logo-image {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 4px 15px rgba(0, 188, 212, 0.4);
          transition: all 0.3s ease;
          background: linear-gradient(135deg, #00bcd4, #0097a7);
        }

        .logo-image:hover {
          box-shadow: 0 6px 25px rgba(0, 188, 212, 0.6);
          transform: rotate(5deg) scale(1.05);
          border-color: rgba(255, 255, 255, 0.5);
        }

        /* Fallback logo when image fails to load */
        .logo-fallback {
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, #00bcd4, #0097a7);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1.5rem;
          font-weight: bold;
          box-shadow: 0 4px 15px rgba(0, 188, 212, 0.4);
          transition: all 0.3s ease;
        }

        .logo-fallback:hover {
          box-shadow: 0 6px 25px rgba(0, 188, 212, 0.6);
          transform: rotate(10deg);
        }

        .logo-text {
          color: white;
          font-size: 1.5rem;
          font-weight: 700;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        /* Navigation */
        .navigation {
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 1.6rem;
        }

        .nav-link {
          position: relative;
          color: white;
          text-decoration: none;
          font-weight: 600;
          font-size: 1rem;
          padding: 8px 16px;
          border-radius: 20px;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .nav-link:hover {
          background: rgba(255, 255, 255, 0.15);
          color: #e0f7fa;
          transform: translateY(-2px);
        }

        .nav-link::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: 0;
          left: 50%;
          background: #e0f7fa;
          transition: all 0.3s ease;
          transform: translateX(-50%);
        }

        .nav-link:hover::after {
          width: 80%;
        }

        /* Sign Up Button */
        .signup-btn {
          background: linear-gradient(135deg, #ff6b35, #f7931e);
          color: white;
          text-decoration: none;
          padding: 12px 24px;
          border-radius: 25px;
          font-weight: 600;
          font-size: 1rem;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .signup-btn:hover {
          background: linear-gradient(135deg, #f7931e, #ff6b35);
          transform: translateY(-2px);
          box-shadow: 0 6px 25px rgba(255, 107, 53, 0.4);
        }

        /* Mobile Menu Toggle */
        .mobile-menu-toggle {
          display: none;
          background: none;
          border: none;
          color: white;
          font-size: 1.5rem;
          cursor: pointer;
          padding: 8px;
          border-radius: 8px;
          transition: all 0.3s ease;
        }

        .mobile-menu-toggle:hover {
          background: rgba(255, 255, 255, 0.15);
        }

        /* Mobile Menu */
        .mobile-menu {
          position: fixed;
          top: 80px;
          left: 0;
          width: 100%;
          background: linear-gradient(135deg, rgba(0, 188, 212, 0.98), rgba(0, 151, 167, 0.98));
          backdrop-filter: blur(20px);
          transform: translateY(-100%);
          opacity: 0;
          visibility: hidden;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          border-bottom-left-radius: 20px;
          border-bottom-right-radius: 20px;
          box-shadow: 0 8px 32px rgba(0, 188, 212, 0.3);
        }

        .mobile-menu.open {
          transform: translateY(0);
          opacity: 1;
          visibility: visible;
        }

        .mobile-nav-links {
          display: flex;
          flex-direction: column;
          padding: 2rem;
          gap: 1rem;
        }

        .mobile-nav-link {
          color: white;
          text-decoration: none;
          font-weight: 600;
          font-size: 1.1rem;
          padding: 16px 20px;
          border-radius: 12px;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 12px;
          background: rgba(255, 255, 255, 0.1);
        }

        .mobile-nav-link:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateX(8px);
        }

        .mobile-signup-btn {
          background: linear-gradient(135deg, #ff6b35, #f7931e);
          color: white;
          text-decoration: none;
          padding: 16px 24px;
          border-radius: 12px;
          font-weight: 600;
          font-size: 1.1rem;
          text-align: center;
          margin-top: 1rem;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
        }

        .mobile-signup-btn:hover {
          background: linear-gradient(135deg, #f7931e, #ff6b35);
          transform: scale(1.02);
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .nav-search-form {
            min-width: 220px;
          }
          
          .nav-links {
            gap: 1.5rem;
          }
        }

        @media (max-width: 768px) {
          .diveme-header {
            padding: 0 1rem;
          }

          .nav-search-form {
            display: none;
          }

          .nav-links {
            display: none;
          }

          .signup-btn {
            display: none;
          }

          .mobile-menu-toggle {
            display: block;
          }
        }

        @media (max-width: 480px) {
          .diveme-header {
            height: 70px;
          }

          .mobile-menu {
            top: 70px;
          }

          .logo-text {
            font-size: 1.2rem;
          }

          .logo-image, .logo-fallback {
            width: 40px;
            height: 40px;
          }

          .logo-fallback {
            font-size: 1.2rem;
          }
        }
      `}</style>
    </>
  );
}