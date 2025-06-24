import React, { useState, useEffect } from "react";

const TermsAndConditions = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  // Array of sections for easy mapping
  const sections = [
    {
      id: "introduction",
      title: "1. Introduction",
      content: "Welcome to our diving adventure platform. By accessing or using our site and services, you agree to comply with the following terms and conditions. If you do not agree, please refrain from using our services."
    },
    {
      id: "conditions",
      title: "2. Conditions of Use",
      subsections: [
        {
          id: "account",
          title: "A. Your Account",
          content: "To book dives or participate in activities, you must register for an account. You are responsible for maintaining the confidentiality of your login details and for all activity under your account. We reserve the right to suspend or terminate accounts if misuse is detected."
        },
        {
          id: "eligibility",
          title: "B. Eligibility for Activities",
          content: "Participants must meet medical and certification requirements for certain diving activities. Proof of dive certification may be requested before booking advanced packages. Certain dives may require medical clearance from a physician."
        }
      ]
    },
    {
      id: "responsibilities",
      title: "3. Diver Responsibilities",
      content: "Users are responsible for ensuring all personal information is accurate and up-to-date. Divers must follow safety guidelines, respect marine life, and comply with the instructions of certified guides and instructors at all times. Proper dive planning and buddy system protocols must be followed."
    },
    {
      id: "liability",
      title: "4. Limitation of Liability",
      subsections: [
        {
          id: "general-liability",
          title: "A. General Liability",
          content: "While we strive to provide a safe and enjoyable experience, we are not liable for injuries, accidents, or damages arising from underwater activities, equipment use, or travel to/from dive sites. All activities are undertaken at the user's own risk."
        },
        {
          id: "equipment-liability",
          title: "B. Equipment Responsibility",
          content: "Rented equipment must be used properly and returned in good condition. Users are responsible for any damage to equipment due to negligence or improper use. Always perform pre-dive equipment checks."
        }
      ]
    },
    {
      id: "changes",
      title: "5. Changes to Terms",
      content: "These terms may be updated periodically. Continued use of the platform following any updates constitutes acceptance of the revised terms. We will notify users of significant changes via email or platform notifications."
    },
    {
      id: "contact",
      title: "6. Contact Information",
      content: "For questions about these terms or our services, please contact our customer support team at support@diveadventures.com or call 0788720668 during business hours (8am-8pm EST, Monday-sunday)."
    }
  ];

  // Toggle section visibility
  const toggleSection = (sectionId) => {
    if (activeSection === sectionId) {
      setActiveSection(null);
    } else {
      setActiveSection(sectionId);
    }
  };

  // Scroll to section
  const scrollToSection = (sectionId) => {
    toggleSection(sectionId);
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
  };

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <div className="terms-container">
        {/* Header with gradient background */}
        <div className="terms-header">
          <h1>Terms and Conditions</h1>
          <p>Last updated: June 2025</p>
        </div>
        
        {/* Introduction text */}
        <div className="terms-intro">
          <p>
            <strong>Please read these Terms and Conditions carefully before using our services.</strong> 
            This legally binding agreement outlines your rights and responsibilities when using our diving adventure platform. 
            By accessing or using our website and services, you agree to be bound by these terms.
          </p>
        </div>
        
        {/* Table of contents */}
        <div className="terms-nav">
          <h2>Quick Navigation</h2>
          <div className="terms-nav-grid">
            {sections.map((section) => (
              <a 
                key={section.id}
                href={`#${section.id}`}
                className="terms-nav-link"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(section.id);
                }}
              >
                {section.title}
              </a>
            ))}
          </div>
        </div>
        
        {/* Accordion sections */}
        <div className="terms-content">
          {sections.map((section) => (
            <div 
              key={section.id} 
              id={section.id}
              className="terms-section"
            >
              <button
                className="terms-section-button"
                onClick={() => toggleSection(section.id)}
                aria-expanded={activeSection === section.id}
                aria-controls={`${section.id}-content`}
              >
                <h2>{section.title}</h2>
                <svg
                  className={`terms-section-icon ${activeSection === section.id ? 'active' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              
              <div 
                id={`${section.id}-content`}
                className={`terms-section-content ${activeSection === section.id ? 'active' : ''}`}
                aria-hidden={activeSection !== section.id}
              >
                <div className="terms-section-body">
                  {section.content && <p>{section.content}</p>}
                  
                  {section.subsections && section.subsections.map((subsection) => (
                    <div key={subsection.id} className="terms-subsection">
                      <h3>{subsection.title}</h3>
                      <p>{subsection.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Footer */}
        <div className="terms-footer">
          <button 
            onClick={scrollToTop}
            className="back-to-top"
            aria-label="Back to top"
          >
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            Back to Top
          </button>
          <p>
            If you have any questions about these terms, please contact our support team at support@diveme.com<br />
            © 2025 Dive Adventures. All rights reserved.
          </p>
        </div>
      </div>

      {/* Floating back to top button */}
      <button 
        className={`floating-back-to-top ${scrolled ? 'visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </>
  );
};

export default TermsAndConditions;