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