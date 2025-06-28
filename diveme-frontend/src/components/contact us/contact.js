import React, { useState } from "react";
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaClock, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaWater, FaFish, FaAnchor } from "react-icons/fa";

const ContactUs = () => {
  const [formData, setState] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setState({ name: "", email: "", subject: "", message: "" });
    alert("Thank you for your message! We'll dive into it and get back to you soon.");
  };

  return (
    <div className="dive-contact-container">
      {/* Hero Section */}
      <section className="dive-contact-hero">
        <div className="dive-contact-overlay">
          <h1>Dive Into Contact</h1>
          <p>We're here to answer all your underwater questions. Reach out and let's make a splash!</p>
          <div className="dive-decorative-elements">
            <FaWater className="water-icon" />
            <FaFish className="fish-icon fish-1" />
            <FaFish className="fish-icon fish-2" />
            <FaAnchor className="anchor-icon" />
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="dive-contact-section">
        <div className="dive-contact-wrapper">
          {/* Section Header */}
          <div className="dive-section-header">
            <h2>Make Waves With Us</h2>
            <p>Whether you're a beginner or seasoned diver, we're ready to help you explore the depths</p>
            <div className="dive-header-underline"></div>
          </div>

          <div className="dive-contact-content">
            {/* Contact Information */}
            <div className="dive-contact-info">
              <h3>Dive Center Information</h3>
              
              <div className="dive-info-card">
                <div className="dive-info-icon">
                  <FaMapMarkerAlt />
                </div>
                <div className="dive-info-details">
                  <h4>Our Dive Location</h4>
                  <p> No 22/5, Colombo, Srilanka</p>
                </div>
              </div>
              
              <div className="dive-info-card">
                <div className="dive-info-icon">
                  <FaEnvelope />
                </div>
                <div className="dive-info-details">
                  <h4>Email Us</h4>
                  <p>diveme@gmail.com</p>
                </div>
              </div>
              
              <div className="dive-info-card">
                <div className="dive-info-icon">
                  <FaPhone />
                </div>
                <div className="dive-info-details">
                  <h4>Call Us</h4>
                  <p>+94 70 35 97 669</p>
                  <p>+94 41 22 21 585</p>
                </div>
              </div>
              
              <div className="dive-info-card">
                <div className="dive-info-icon">
                  <FaClock />
                </div>
                <div className="dive-info-details">
                  <h4>Dive Center Hours</h4>
                  <p>Monday - Friday: 6:00 AM - 8:00 PM</p>
                  <p>Saturday: 8:00 AM - 2:00 PM</p>
                  <p>Sunday: Closed (except for special dive trips)</p>
                </div>
              </div>
              
              <div className="dive-social-media">
                <h4>Dive Into Our Community</h4>
                <div className="dive-social-icons">
                  <a href="#" aria-label="Facebook"><FaFacebook /></a>
                  <a href="" aria-label="Instagram"><FaInstagram /></a>
                  <a href="" aria-label="LinkedIn"><FaLinkedin /></a>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="dive-contact-form-container">
              <h3>Send Us a Message</h3>
              <form className="dive-contact-form" onSubmit={handleSubmit}>
                <div className="dive-form-group">
                  <label htmlFor="name">Full Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name" 
                    required 
                  />
                </div>
                
                <div className="dive-form-group">
                  <label htmlFor="email">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your email" 
                    required 
                  />
                </div>
                
                <div className="dive-form-group">
                  <label htmlFor="subject">Subject</label>
                  <input 
                    type="text" 
                    id="subject" 
                    name="subject" 
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What's your question about?" 
                    required 
                  />
                </div>
                
                <div className="dive-form-group">
                  <label htmlFor="message">Message</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your diving inquiry..." 
                    rows="5" 
                    required 
                  ></textarea>
                </div>
                
                <button type="submit" className="dive-submit-btn">
                  Send Message
                  <FaWater className="water-btn-icon" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

        <style jsx>{`
        /* Global Styles */
        .dive-contact-container {
          font-family: 'Montserrat', sans-serif;
          color: #333;
          line-height: 1.6;
          margin: 0;
          padding: 0;
          background-color: #f0f8ff;
        }

        /* Hero Section */
        .dive-contact-hero {
          position: relative;
          height: 400px;
          background-image: url('https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80');
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
          color: white;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .dive-contact-overlay {
          background-color: rgba(0, 46, 99, 0.7);
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 0 20px;
          position: relative;
        }

        .dive-contact-hero h1 {
          font-size: 3.5rem;
          margin-bottom: 15px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        }

        .dive-contact-hero p {
          font-size: 1.3rem;
          max-width: 700px;
          margin: 0 auto 20px;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
        }

        .dive-decorative-elements {
          position: absolute;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        .water-icon, .fish-icon, .anchor-icon {
          position: absolute;
          color: rgba(255, 255, 255, 0.3);
        }

        .water-icon {
          font-size: 5rem;
          bottom: 20px;
          right: 20px;
          animation: float 6s infinite ease-in-out;
        }

        .fish-icon {
          font-size: 2rem;
          animation: swim 8s infinite linear;
        }

        .fish-1 {
          top: 30%;
          left: 10%;
          animation-delay: 0.5s;
        }

        .fish-2 {
          top: 60%;
          left: 80%;
          animation-delay: 1s;
        }

        .anchor-icon {
          font-size: 3rem;
          bottom: 40px;
          left: 40px;
          transform: rotate(-30deg);
        }

        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }

        @keyframes swim {
          0% { transform: translateX(-100px) scaleX(1); }
          50% { transform: translateX(calc(100vw + 100px)) scaleX(1); }
          51% { transform: translateX(calc(100vw + 100px)) scaleX(-1); }
          100% { transform: translateX(-100px) scaleX(-1); }
        }

        /* Main Contact Section */
        .dive-contact-section {
          padding: 80px 0;
          background-color: #f0f8ff;
          position: relative;
          overflow: hidden;
        }

        .dive-contact-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 20px;
          background: linear-gradient(to right, #0077be, #00b4d8, #0077be);
        }

        .dive-contact-wrapper {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          position: relative;
          z-index: 1;
        }

        .dive-section-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .dive-section-header h2 {
          font-size: 2.8rem;
          color: #005f73;
          margin-bottom: 15px;
          font-weight: 700;
        }

        .dive-section-header p {
          font-size: 1.2rem;
          color: #0a9396;
          max-width: 700px;
          margin: 0 auto 15px;
          font-weight: 500;
        }

        .dive-header-underline {
          height: 4px;
          width: 100px;
          background: linear-gradient(to right, #0077be, #00b4d8);
          margin: 0 auto;
          border-radius: 2px;
        }

        /* Contact Content Layout */
        .dive-contact-content {
          display: flex;
          flex-wrap: wrap;
          gap: 40px;
          justify-content: space-between;
        }

        .dive-contact-info, .dive-contact-form-container {
          flex: 1;
          min-width: 300px;
        }

        /* Contact Info Styles */
        .dive-contact-info {
          background-color: white;
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0, 119, 190, 0.1);
          padding: 30px;
          height: fit-content;
          border: 1px solid #e0f7ff;
          background-image: radial-gradient(circle at 10% 20%, rgba(224, 247, 255, 0.3) 0%, transparent 20%);
        }

        .dive-contact-info h3 {
          font-size: 2rem;
          color: #005f73;
          margin-bottom: 30px;
          position: relative;
          padding-bottom: 15px;
        }

        .dive-contact-info h3:after {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          height: 3px;
          width: 60px;
          background: linear-gradient(to right, #0077be, #00b4d8);
          border-radius: 3px;
        }

        .dive-info-card {
          display: flex;
          margin-bottom: 25px;
          padding-bottom: 15px;
          border-bottom: 1px solid #e0f7ff;
          transition: transform 0.3s ease;
        }

        .dive-info-card:hover {
          transform: translateX(5px);
        }

        .dive-info-icon {
          color: #00b4d8;
          font-size: 1.8rem;
          margin-right: 15px;
          padding-top: 5px;
          min-width: 30px;
        }

        .dive-info-details h4 {
          font-size: 1.2rem;
          color: #005f73;
          margin-bottom: 8px;
        }

        .dive-info-details p {
          color: #0a9396;
          margin-bottom: 5px;
          font-size: 0.95rem;
        }

        .dive-social-media h4 {
          font-size: 1.2rem;
          color: #005f73;
          margin: 30px 0 15px;
        }

        .dive-social-icons {
          display: flex;
          gap: 15px;
        }

        .dive-social-icons a {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 45px;
          height: 45px;
          border-radius: 50%;
          background-color: #e0f7ff;
          color: #0077be;
          font-size: 1.3rem;
          transition: all 0.3s ease;
        }

        .dive-social-icons a:hover {
          background-color: #0077be;
          color: white;
          transform: translateY(-5px) scale(1.1);
        }

        /* Contact Form Styles */
        .dive-contact-form-container {
          background-color: white;
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0, 119, 190, 0.1);
          padding: 30px;
          border: 1px solid #e0f7ff;
          background-image: radial-gradient(circle at 90% 20%, rgba(224, 247, 255, 0.3) 0%, transparent 20%);
        }

        .dive-contact-form-container h3 {
          font-size: 2rem;
          color: #005f73;
          margin-bottom: 30px;
          position: relative;
          padding-bottom: 15px;
        }

        .dive-contact-form-container h3:after {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          height: 3px;
          width: 60px;
          background: linear-gradient(to right, #0077be, #00b4d8);
          border-radius: 3px;
        }

        .dive-form-group {
          margin-bottom: 25px;
        }

        .dive-form-group label {
          display: block;
          margin-bottom: 10px;
          font-size: 1rem;
          color: #005f73;
          font-weight: 500;
        }

        .dive-form-group input,
        .dive-form-group textarea {
          width: 100%;
          padding: 14px 18px;
          border: 1px solid #caf0f8;
          border-radius: 8px;
          font-size: 1rem;
          color: #333;
          transition: all 0.3s ease;
          background-color: #f8fdff;
        }

        .dive-form-group input:focus,
        .dive-form-group textarea:focus {
          border-color: #00b4d8;
          outline: none;
          box-shadow: 0 0 0 3px rgba(0, 180, 216, 0.2);
          background-color: white;
        }

        .dive-form-group textarea {
          min-height: 150px;
          resize: vertical;
        }

        .dive-submit-btn {
          background: linear-gradient(to right, #0077be, #00b4d8);
          color: white;
          border: none;
          padding: 15px 35px;
          font-size: 1.1rem;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          display: inline-flex;
          align-items: center;
          position: relative;
          overflow: hidden;
        }

        .dive-submit-btn:hover {
          background: linear-gradient(to right, #006494, #0096c7);
          transform: translateY(-3px);
          box-shadow: 0 5px 15px rgba(0, 119, 190, 0.3);
        }

        .dive-submit-btn:active {
          transform: translateY(1px);
        }

        .water-btn-icon {
          margin-left: 10px;
          transition: all 0.3s ease;
        }

        .dive-submit-btn:hover .water-btn-icon {
          transform: rotate(360deg);
        }

        /* Responsive Styles */
        @media screen and (max-width: 768px) {
          .dive-contact-hero h1 {
            font-size: 2.5rem;
          }
          
          .dive-contact-hero p {
            font-size: 1.1rem;
          }
          
          .dive-contact-content {
            flex-direction: column;
          }
          
          .dive-contact-info, .dive-contact-form-container {
            width: 100%;
          }
          
          .dive-section-header h2 {
            font-size: 2.2rem;
          }
        }

        @media screen and (max-width: 480px) {
          .dive-contact-hero {
            height: 350px;
          }
          
          .dive-contact-hero h1 {
            font-size: 2rem;
          }
          
          .dive-section-header h2 {
            font-size: 1.8rem;
          }
          
          .dive-contact-info h3, .dive-contact-form-container h3 {
            font-size: 1.5rem;
          }
          
          .dive-info-icon {
            font-size: 1.5rem;
          }
        }
      `}</style>

        </div>
  );
};

export default ContactUs;