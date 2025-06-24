import React, { useState, useEffect } from "react";

const TermsAndConditions = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [scrolled, setScrolled] = useState(false);

   useEffect(() => {
    // Create a style element specifically for this component
    const styleElement = document.createElement('style');
    styleElement.innerHTML = `
      /* Base container styles */
      .terms-container {
        max-width: 1024px;
        margin: 112px auto;
        background: #ffffff;
        border-radius: 16px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
        overflow: hidden;
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
          Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        position: relative;
      }

      /* Header styles */
      .terms-header {
        background: linear-gradient(135deg, #3b82f6, #6366f1);
        padding: 48px 24px;
        color: white;
        text-align: center;
        position: relative;
        overflow: hidden;
      }

      .terms-header::before {
        content: '';
        position: absolute;
        top: -50px;
        right: -50px;
        width: 200px;
        height: 200px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 50%;
      }

      .terms-header::after {
        content: '';
        position: absolute;
        bottom: -80px;
        left: -80px;
        width: 300px;
        height: 300px;
        background: rgba(255, 255, 255, 0.05);
        border-radius: 50%;
      }

      .terms-header h1 {
        font-size: 42px;
        font-weight: 800;
        margin: 0;
        position: relative;
        z-index: 1;
        letter-spacing: -0.5px;
      }

      .terms-header p {
        color: rgba(255, 255, 255, 0.9);
        margin-top: 12px;
        font-size: 18px;
        position: relative;
        z-index: 1;
      }

      /* Introduction section */
      .terms-intro {
        padding: 32px;
        border-bottom: 1px solid #f0f0f0;
        background-color: #f8fafc;
      }

      .terms-intro p {
        color: #4b5563;
        font-size: 18px;
        line-height: 1.7;
        margin: 0;
        max-width: 800px;
        margin: 0 auto;
      }

      /* Navigation section */
      .terms-nav {
        background-color: #ffffff;
        padding: 32px;
        border-bottom: 1px solid #f0f0f0;
      }

      .terms-nav h2 {
        font-size: 22px;
        font-weight: 700;
        color: #1f2937;
        margin-top: 0;
        margin-bottom: 24px;
        text-align: center;
      }

      .terms-nav-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 16px;
        max-width: 800px;
        margin: 0 auto;
      }

      .terms-nav-link {
        display: flex;
        align-items: center;
        color: #3b82f6;
        text-decoration: none;
        transition: all 0.3s ease;
        padding: 12px 16px;
        border-radius: 8px;
        background-color: #f8fafc;
        font-weight: 500;
      }

      .terms-nav-link:hover {
        color: #2563eb;
        background-color: #f1f5f9;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(59, 130, 246, 0.1);
      }

      .terms-nav-link::before {
        content: '•';
        margin-right: 12px;
        color: #93c5fd;
        font-weight: bold;
      }

      /* Content sections */
      .terms-content {
        padding: 16px;
      }

      .terms-section {
        margin-bottom: 16px;
        border-radius: 12px;
        overflow: hidden;
        transition: all 0.3s ease;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        border: 1px solid #e5e7eb;
      }

      .terms-section:hover {
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
      }

      .terms-section-button {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 24px;
        background-color: #ffffff;
        border: none;
        cursor: pointer;
        text-align: left;
        transition: all 0.3s ease;
      }

      .terms-section-button:hover {
        background-color: #f9fafb;
      }

      .terms-section-button h2 {
        font-size: 20px;
        font-weight: 600;
        color: #1f2937;
        margin: 0;
        flex: 1;
      }

      .terms-section-icon {
        width: 24px;
        height: 24px;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        color: #6b7280;
      }

      .terms-section-icon.active {
        transform: rotate(180deg);
        color: #3b82f6;
      }

      .terms-section-content {
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .terms-section-content.active {
        max-height: 2000px;
      }

      .terms-section-body {
        padding: 0 24px 24px;
        background-color: white;
      }

      .terms-section-body p {
        color: #4b5563;
        line-height: 1.8;
        margin: 0 0 16px 0;
        font-size: 16px;
      }

      .terms-subsection {
        margin-top: 24px;
        padding-left: 16px;
        border-left: 3px solid #e5e7eb;
      }

      .terms-subsection h3 {
        font-size: 18px;
        font-weight: 600;
        color: #1f2937;
        margin-top: 0;
        margin-bottom: 12px;
      }

      /* Footer styles */
      .terms-footer {
        padding: 32px;
        background-color: #f8fafc;
        border-top: 1px solid #e5e7eb;
        text-align: center;
      }

      .back-to-top {
        display: inline-flex;
        align-items: center;
        background: linear-gradient(135deg, #3b82f6, #6366f1);
        color: white;
        font-weight: 600;
        padding: 12px 24px;
        border-radius: 8px;
        border: none;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
      }

      .back-to-top:hover {
        background: linear-gradient(135deg, #2563eb, #4f46e5);
        transform: translateY(-2px);
        box-shadow: 0 6px 16px rgba(59, 130, 246, 0.3);
      }

      .back-to-top svg {
        width: 18px;
        height: 18px;
        margin-right: 8px;
      }

      .terms-footer p {
        margin-top: 24px;
        color: #6b7280;
        line-height: 1.6;
      }

      /* Floating back to top button */
      .floating-back-to-top {
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: linear-gradient(135deg, #3b82f6, #6366f1);
        color: white;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        opacity: 0;
        visibility: hidden;
        transform: translateY(20px);
        z-index: 100;
      }

      .floating-back-to-top.visible {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
      }

      .floating-back-to-top:hover {
        background: linear-gradient(135deg, #2563eb, #4f46e5);
        transform: translateY(-3px) scale(1.05);
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
      }

      /* Responsive adjustments */
      @media (max-width: 768px) {
        .terms-container {
          margin: 80px 16px;
          border-radius: 12px;
        }
        
        .terms-header {
          padding: 32px 16px;
        }
        
        .terms-header h1 {
          font-size: 32px;
        }
        
        .terms-intro, .terms-nav, .terms-content {
          padding: 24px 16px;
        }
        
        .terms-nav-grid {
          grid-template-columns: 1fr;
        }
        
        .terms-section-button {
          padding: 16px;
        }
        
        .terms-section-button h2 {
          font-size: 18px;
        }
      }
    `;
    
    // Add the style element to the document head
    document.head.appendChild(styleElement);
    
    // Add scroll event listener
    const handleScroll = () => {
      setScrolled(window.scrollY > 300);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Clean up function
    return () => {
      document.head.removeChild(styleElement);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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