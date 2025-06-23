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
                  <p>Monday - Friday: 8:00 AM - 8:00 PM</p>
                  <p>Saturday: 9:00 AM - 2:00 PM</p>
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
        </div>
  );
};

export default ContactUs;