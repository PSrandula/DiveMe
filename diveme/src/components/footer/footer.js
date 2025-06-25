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
                  <p>Open Daily: 6:00 AM - 8:00 PM<br />Dive Season: Nov - Apr</p>
                </div>
              </div>
            </div>

            <div className="dm-footer-section">
              <h3>Quick Links</h3>
              <ul className="dm-footer-links">
                <li><a href="/about">About DiveMe</a></li>
                <li><a href="/map">Diving Locations</a></li>
                <li><a href="/terms&condition">Terms & Conditions</a></li>
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
      <style>{`
        /* Footer Styles */
        .dm-footer {
          background: linear-gradient(135deg, #006064, #00838f, #0097a7);
          color: #fff;
          padding: 0;
          font-family: 'Poppins', sans-serif;
          position: relative;
          overflow: hidden;
        }

        .dm-footer::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 20"><path d="M0,10 Q25,0 50,10 T100,10 L100,20 L0,20 Z" fill="rgba(255,255,255,0.03)"/></svg>') repeat-x;
          background-size: 200px 40px;
          animation: wave 8s linear infinite;
        }

        @keyframes wave {
          0% { transform: translateX(0); }
          100% { transform: translateX(-200px); }
        }

        .dm-footer-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          position: relative;
          z-index: 1;
        }

        /* Footer Top Section - Reduced padding */
        .dm-footer-top {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          padding: 30px 0 25px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.15);
          gap: 30px;
        }

        .dm-footer-logo {
          max-width: 350px;
        }

        .dm-footer-logo-section {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 15px;
        }

        .dm-logo-image {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          box-shadow: 0 6px 20px rgba(0, 188, 212, 0.4);
          animation: float 3s ease-in-out infinite;
          background: linear-gradient(135deg, #00bcd4, #0097a7);
        }

        .dm-logo-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }

        .dm-footer-logo h2 {
          font-size: 28px;
          font-weight: 700;
          margin: 0;
          letter-spacing: 1px;
          background: linear-gradient(135deg, #ffffff, #e0f7fa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .dm-footer-tagline {
          font-size: 15px;
          opacity: 0.9;
          line-height: 1.5;
          margin-bottom: 0;
        }

        .dm-newsletter {
          max-width: 400px;
        }

        .dm-newsletter h3 {
          margin-bottom: 12px;
          font-size: 20px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .dm-newsletter-form {
          display: flex;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50px;
          padding: 4px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .dm-newsletter-form input {
          flex: 1;
          padding: 12px 16px;
          border: none;
          border-radius: 45px;
          font-size: 14px;
          outline: none;
          background: transparent;
          color: white;
        }

        .dm-newsletter-form input::placeholder {
          color: rgba(255, 255, 255, 0.7);
        }

        .dm-newsletter-form button {
          background: linear-gradient(135deg, #ff6b35, #f7931e);
          color: white;
          border: none;
          border-radius: 45px;
          padding: 12px 20px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);
          font-size: 14px;
        }

        .dm-newsletter-form button:hover {
          background: linear-gradient(135deg, #f7931e, #ff6b35);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(255, 107, 53, 0.4);
        }

        /* Main Content Area - Reduced padding */
        .dm-footer-content {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
          gap: 30px;
          padding: 30px 0 20px;
        }

        .dm-footer-section h3 {
          color: #fff;
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 18px;
          position: relative;
          padding-bottom: 8px;
          text-align: center;
        }

       .dm-footer-section h3::after {
        content: '';
        position: absolute;
        left: 50%; /* Center horizontally */
        transform: translateX(-50%); /* Adjust position back to truly center */
        bottom: 0;
        width: 40px;
        height: 2px;
        background: linear-gradient(135deg, #00bcd4, #ff6b35);
        border-radius: 10px;
        }


        /* Contact Section - More compact */
        .dm-contact-info {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .dm-contact-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 12px;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 10px;
          transition: all 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .dm-contact-item:hover {
          background: rgba(255, 255, 255, 0.12);
          transform: translateY(-1px);
        }

        .dm-contact-item .icon-wrapper {
          width: 32px;
          height: 32px;
          background: linear-gradient(135deg, #00bcd4, #0097a7);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          flex-shrink: 0;
        }

        .dm-contact-item p {
          font-size: 13px;
          margin: 0;
          line-height: 1.5;
          color: rgba(255, 255, 255, 0.9);
        }

        /* Links Styling - More compact */
       .dm-footer-links {
        list-style: none;
         padding: 0;
        margin: 0;
        text-align: center; /* 🆕 Add this */
        }


        .dm-footer-links li {
          margin-bottom: 8px;
        }

        .dm-footer-links a {
          color: rgba(255, 255, 255, 0.8);
          text-decoration: none;
          font-size: 14px;
          transition: all 0.3s ease;
          display: inline-block;
          position: relative;
          padding: 6px 0;
        }

        .dm-footer-links a::before {
          content: '→';
          position: absolute;
          left: -18px;
          opacity: 0;
          transition: all 0.3s ease;
          color: #00bcd4;
        }

        .dm-footer-links a:hover {
          color: #fff;
          transform: translateX(12px);
        }

        .dm-footer-links a:hover::before {
          opacity: 1;
          left: -12px;
        }

        /* Services Section - More compact */
        .dm-services-list {
          display: grid;
          gap: 8px;
        }

        .dm-service-item {
          background: rgba(255, 255, 255, 0.08);
          padding: 10px 12px;
          border-radius: 6px;
          font-size: 13px;
          border-left: 3px solid #00bcd4;
          transition: all 0.3s ease;
        }

        .dm-service-item:hover {
          background: rgba(255, 255, 255, 0.12);
          border-left-color: #ff6b35;
        }

        /* Footer Bottom - Reduced padding */
        .dm-footer-bottom {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
          padding: 20px 0;
          border-top: 1px solid rgba(255, 255, 255, 0.15);
          gap: 15px;
        }

        .dm-social-icons {
          display: flex;
          gap: 12px;
        }

        .dm-social-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          color: #fff;
          transition: all 0.3s ease;
          border: 2px solid transparent;
        }

        .dm-social-icon:hover {
          background: linear-gradient(135deg, #00bcd4, #ff6b35);
          color: #fff;
          transform: translateY(-3px) scale(1.05);
          border-color: rgba(255, 255, 255, 0.3);
          box-shadow: 0 6px 20px rgba(0, 188, 212, 0.4);
        }

        .dm-copyright {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .dm-copyright p {
          font-size: 13px;
          margin: 0;
          opacity: 0.8;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .dm-footer-top {
            flex-direction: column;
            text-align: center;
            gap: 25px;
            padding: 25px 0 20px;
          }
          
          .dm-footer-content {
            grid-template-columns: 1fr;
            gap: 25px;
            padding: 25px 0 15px;
          }
          
          .dm-footer-bottom {
            flex-direction: column;
            text-align: center;
            gap: 20px;
            padding: 15px 0;
          }
          
          .dm-social-icons {
            justify-content: center;
          }

          .dm-newsletter-form {
            flex-direction: column;
            background: none;
            padding: 0;
            gap: 8px;
          }

          .dm-newsletter-form input,
          .dm-newsletter-form button {
            border-radius: 25px;
          }

          .dm-newsletter-form input {
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
          }
        }

        @media (max-width: 480px) {
          .dm-footer-container {
            padding: 0 15px;
          }
          
          .dm-footer-top {
            padding: 20px 0 15px;
          }
          
          .dm-footer-logo h2 {
            font-size: 24px;
          }
          
          .dm-logo-image {
            width: 40px;
            height: 40px;
          }

          .dm-footer-content {
            padding: 20px 0 12px;
          }

          .dm-footer-bottom {
            padding: 12px 0;
          }
        }
      `}</style>
     </>
  );
}