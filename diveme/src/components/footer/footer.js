import React from 'react';
import { Phone, Clock, Facebook, Instagram, Youtube, Twitter, Mail } from 'lucide-react';

export default function DiveMeFooter() {
  return (
    <>
    <footer className="dm-footer">
        <div className="dm-footer-container">
          <div className="dm-footer-top">
            <div className="dm-footer-logo">
              <div className="dm-footer-logo-section">
                <div className="dm-logo-image">
                  <img src="./logo.jpg" alt="DiveMe Logo" />
                </div>
                <h2>DiveMe</h2>
              </div>
              <p className="dm-footer-tagline">
                Explore the depths of the ocean with expert guidance. Join Sri Lanka's premier diving community.
              </p>
            </div>
            
            <div className="dm-newsletter">
              <h3>
                <Mail size={18} />
                Stay Updated
              </h3>
              <p style={{marginBottom: '12px', opacity: '0.9'}}>
                Get diving tips and exclusive offers.
              </p>
              <div className="dm-newsletter-form">
                <input type="email" placeholder="Enter your email address" />
                <button type="submit">Subscribe</button>
              </div>
            </div>
          </div>
          
          <div className="dm-footer-content">
            <div className="dm-footer-section">
              <h3>Contact Us</h3>
              <div className="dm-contact-info">
                <div className="dm-contact-item">
                  <div className="icon-wrapper">
                    <Phone size={14} />
                  </div>
                  <p>(+94) 41 2221 585<br />(+94) 70 3597 669</p>
                </div>
                <div className="dm-contact-item">
                  <div className="icon-wrapper">
                    <Clock size={14} />
                  </div>
                  <p>Open Daily: 6:00 AM - 6:00 PM<br />Dive Season: Nov - Apr</p>
                </div>
              </div>
            </div>

            <div className="dm-footer-section">
              <h3>Quick Links</h3>
              <ul className="dm-footer-links">
                <li><a href="/about">About DiveMe</a></li>
                <li><a href="/locations">Diving Locations</a></li>
                <li><a href="/equipment">Equipment Rental</a></li>
                <li><a href="/blog">Diving Blog</a></li>
                <li><a href="/contact">Contact Us</a></li>
              </ul>
            </div>

            <div className="dm-footer-section">
              <h3>Our Services</h3>
              <div className="dm-services-list">
                <div className="dm-service-item">🐠 Guided Diving Tours</div>
                <div className="dm-service-item">⚓ Equipment Rental</div>
                <div className="dm-service-item">🐋 Whale Watching</div>
                <div className="dm-service-item">📸 Underwater Photography</div>
              </div>
            </div>
          </div>
          
          <div className="dm-footer-bottom">
            <div className="dm-social-icons">
              <a href="#" className="dm-social-icon" aria-label="Facebook">
                <Facebook size={18} />
              </a>
              <a href="#" className="dm-social-icon" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="#" className="dm-social-icon" aria-label="Twitter">
                <Twitter size={18} />
              </a>
              <a href="#" className="dm-social-icon" aria-label="YouTube">
                <Youtube size={18} />
              </a>
            </div>
            <div className="dm-copyright">
              <p>&copy; {new Date().getFullYear()} DiveMe. All Rights Reserved. | Dive Safe, Dive Smart</p>
            </div>
          </div>
        </div>
      </footer>
     </>
  );
}