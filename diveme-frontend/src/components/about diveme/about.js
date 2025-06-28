import React from "react";

const About = () => {
  return (
    <div style={styles.aboutPage}>
      {/* Hero Section */}
      <section style={styles.aboutHero}>
        <div style={styles.heroOverlay}>
          <h1 style={styles.heroTitle}>Discover the Depths with DiveMe</h1>
          <p style={styles.heroSubtitle}>Sri Lanka's Premier Dive Experience Platform</p>
        </div>
        <img
          src="https://plus.unsplash.com/premium_photo-1749297157282-1f13c843b227?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGRpdmluZyUyMGNvdmVyJTIwcGhvdG98ZW58MHx8MHx8fDA%3D"
          alt="Scuba diver exploring colorful coral reef"
          style={styles.heroImage}
        />
      </section>

      {/* Main Content */}
      <section style={styles.mainContent}>
        <div style={styles.contentContainer}>
          {/* Dive Location Images */}
          <div style={styles.imageSection}>
            <div style={styles.imageGrid}>
              <img
                src="https://media.istockphoto.com/id/498283106/photo/underwater-scuba-diver-explore-and-enjoy-coral-reef-sea-life.webp?a=1&b=1&s=612x612&w=0&k=20&c=GiIUA3XTR86AGOWccTPQ1XrMZxfKq6EBcr_PLJPQ10Y="
                alt="Diver swimming with turtles"
                style={styles.contentImage}
              />
              <img
                src="https://images.unsplash.com/photo-1682687982167-d7fb3ed8541d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZGl2aW5nfGVufDB8fDB8fHww"
                alt="Underwater cave diving"
                style={{...styles.contentImage, marginTop: '1rem'}}
              />
            </div>
          </div>

          {/* Information Cards */}
          <div style={styles.textSection}>
            {/* About Us Card */}
            <section id="about-us" style={styles.card}>
              <div style={styles.cardIcon}>
                <i className="fas fa-water" style={styles.icon}></i>
              </div>
              <h2 style={styles.cardTitle}>About DiveMe</h2>
              <p style={styles.tagline}>Your Gateway to Sri Lanka's Best Dive Experiences</p>
              <p style={styles.cardText}>
                DiveMe is your trusted platform for discovering, exploring, and booking
                unforgettable diving and snorkeling experiences across Sri Lanka. We connect you
                with certified dive centers, ensuring safety, quality, and fun at every depth.
              </p>
            </section>

            {/* Team Card */}
            <section id="who-we-are" style={styles.card}>
              <div style={styles.cardIcon}>
                <i className="fas fa-users" style={styles.icon}></i>
              </div>
              <h2 style={styles.cardTitle}>Our Team</h2>
              <p style={styles.cardText}>
                We are a passionate team of ocean lovers, developers, and designers united by a
                mission to make diving accessible and sustainable for everyone. Our platform is
                built with divers, for divers.
              </p>
              <div style={styles.teamStats}>
                <div style={styles.statItem}>
                  <span style={styles.statNumber}>50+</span>
                  <span style={styles.statLabel}>Dive Sites</span>
                </div>
                <div style={styles.statItem}>
                  <span style={styles.statNumber}>100%</span>
                  <span style={styles.statLabel}>Certified Partners</span>
                </div>
              </div>
            </section>

            {/* Values Card */}
            <section id="our-values" style={styles.card}>
              <div style={styles.cardIcon}>
                <i className="fas fa-heart" style={styles.icon}></i>
              </div>
              <h2 style={styles.cardTitle}>Our Commitment</h2>
              <ul style={styles.cardList}>
                <li style={styles.listItem}><strong>Ocean Conservation:</strong> Supporting eco-friendly dive practices.</li>
                <li style={styles.listItem}><strong>Community:</strong> Empowering local dive shops and instructors.</li>
                <li style={styles.listItem}><strong>Transparency:</strong> Building trust through clear, accurate info.</li>
                <li style={styles.listItem}><strong>Adventure:</strong> Encouraging exploration and marine discovery.</li>
              </ul>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
};

// Styles object
const styles = {
  aboutPage: {
    fontFamily: "'Poppins', sans-serif",
    color: "#2d3748",
    backgroundColor: "#f7fafc",
    overflowX: "hidden",
  },
  aboutHero: {
    position: "relative", 
    height: "70vh",
    minHeight: "500px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "3rem",
    overflow: "hidden" 
  },
  heroImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "90%",
    objectFit: "cover",
    filter: "brightness(0.7)",
    zIndex: 0,
    borderRadius:25
  },
  heroOverlay: {
    textAlign: "center",
    color: "white",
    padding: "2rem",
    maxWidth: "800px",
    zIndex: 1,
    textShadow: "0 2px 10px rgba(0,0,0,0.5)",
  },
  heroTitle: {
    fontSize: "3.5rem",
    fontWeight: 700,
    marginBottom: "1.5rem",
    lineHeight: 1.2,
  },
  heroSubtitle: {
    fontSize: "1.8rem",
    fontWeight: 400,
    opacity: 0.9,
  },
  mainContent: {
    padding: "0 2rem",
    marginBottom: "4rem",
  },

  contentContainer: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "flex",
    flexWrap: "wrap",
    gap: "3rem",
  },
  imageSection: {
    flex: 1,
    minWidth: "300px",
    position: "relative",
  },
  imageGrid: {
    display: "flex",
    flexDirection: "column",
  },
  contentImage: {
    width: "100%",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    objectFit: "cover",
    height: "300px",
  },
  imageCaption: {
    position: "absolute",
    bottom: "30px",
    left: "20px",
    background: "rgba(0,0,0,0.7)",
    color: "white",
    padding: "0.7rem 1.5rem",
    borderRadius: "30px",
    fontSize: "1rem",
    display: "flex",
    alignItems: "center",
    gap: "0.8rem",
    backdropFilter: "blur(5px)",
  },
  captionIcon: {
    fontSize: "1rem",
  },
  textSection: {
    flex: 1,
    minWidth: "300px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "2rem",
  },
  card: {
    background: "white",
    borderRadius: "16px",
    padding: "2.5rem",
    boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
    transition: "all 0.3s ease",
    position: "relative",
    overflow: "hidden",
    borderTop: "5px solid #38b2ac",
    animation: "fadeIn 0.6s ease forwards",
  },
  cardIcon: {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #38b2ac, #319795)",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.8rem",
    marginBottom: "1.8rem",
    boxShadow: "0 5px 15px rgba(56,178,172,0.3)",
  },
  icon: {
    fontSize: "1.4rem",
  },
  cardTitle: {
    fontSize: "1.7rem",
    fontWeight: 700,
    marginBottom: "1.2rem",
    color: "#2d3748",
  },
  tagline: {
    color: "#38b2ac",
    fontWeight: 600,
    marginBottom: "1.2rem",
    fontSize: "1.2rem",
  },
  cardText: {
    marginBottom: "1.5rem",
    lineHeight: 1.7,
    color: "#4a5568",
    fontSize: "1.05rem",
  },
  cardList: {
    listStyle: "none",
    paddingLeft: 0,
  },
  listItem: {
    marginBottom: "1rem",
    paddingLeft: "2rem",
    position: "relative",
    lineHeight: 1.6,
    color: "#4a5568",
    fontSize: "1.05rem",
  },
  teamStats: {
    display: "flex",
    gap: "2rem",
    marginTop: "2rem",
  },
  statItem: {
    textAlign: "center",
  },
  statNumber: {
    display: "block",
    fontSize: "2rem",
    fontWeight: 700,
    color: "#38b2ac",
    marginBottom: "0.3rem",
  },
  statLabel: {
    fontSize: "1rem",
    color: "#718096",
  },
  // Keyframes for animation
  "@keyframes fadeIn": {
    from: {
      opacity: 0,
      transform: "translateY(30px)",
    },
    to: {
      opacity: 1,
      transform: "translateY(0)",
    },
  },
};

// Add global styles
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
  @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: 'Poppins', sans-serif;
  }
  
  li::before {
    content: "•";
    color: #38b2ac;
    font-size: 1.8rem;
    position: absolute;
    left: 0;
    top: -5px;
  }
  
  @media (max-width: 768px) {
    .hero-title {
      font-size: 2.5rem !important;
    }
    
    .hero-subtitle {
      font-size: 1.4rem !important;
    }
    
    .content-container {
      flex-direction: column;
    }
    
    .image-section {
      order: 2;
      margin-top: 2rem;
    }
  }
  
  @media (max-width: 480px) {
    .hero-title {
      font-size: 2rem !important;
    }
    
    .hero-subtitle {
      font-size: 1.2rem !important;
    }
    
    .card {
      padding: 1.8rem !important;
    }
  }
`;

// Inject global styles
const styleElement = document.createElement("style");
styleElement.innerHTML = globalStyles;
document.head.appendChild(styleElement);

export default About;