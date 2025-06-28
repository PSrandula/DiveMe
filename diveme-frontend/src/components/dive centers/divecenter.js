import React, { useState, useEffect } from "react";

const DiveCenters = () => {
  const [diveCenters, setDiveCenters] = useState([]);
  const [selectedCenterIndex, setSelectedCenterIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedImage, setSelectedImage] = useState(null);
  const [hoveredPackage, setHoveredPackage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = "http://localhost:5000/api/dive-centers/all";

  useEffect(() => {
    const fetchDiveCenters = async () => {
      try {
        const response = await fetch(API_BASE_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setDiveCenters(data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch dive centers:", err);
        setError("Failed to load dive centers. Please try again later.");
        setLoading(false);
      }
    };

    fetchDiveCenters();
  }, []);

  const currentCenter = diveCenters[selectedCenterIndex];

  const handleBooking = (pkg) => {
    const bookingData = {
      packageId: pkg._id,
      packageName: pkg.name,
      packagePrice: parseFloat(pkg.price.replace("$", "")),
      centerName: currentCenter?.name,
    };

    localStorage.setItem("diveBooking", JSON.stringify(bookingData));
    window.location.href = "/booking";
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        style={{
          fontSize: "1rem",
          color: i < Math.floor(rating) ? "#FFD700" : "#E0E0E0",
        }}
      >
        ★
      </span>
    ));
  };

  if (loading) {
    return <div style={styles.loadingMessage}>Loading dive centers...</div>;
  }

  if (error) {
    return <div style={styles.errorMessage}>{error}</div>;
  }

  if (diveCenters.length === 0) {
    return <div style={styles.noDataMessage}>No dive centers found.</div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.centerSelector}>
        {diveCenters.map((center, index) => (
          <button
            key={center._id}
            onClick={() => {
              setSelectedCenterIndex(index);
              setActiveTab("overview");
            }}
            style={{
              ...styles.centerOption,
              ...(selectedCenterIndex === index
                ? styles.centerOptionActive
                : styles.centerOptionInactive),
            }}
          >
            {center.name}
          </button>
        ))}
      </div>

      {currentCenter ? (
        <div style={styles.mainCard}>
          <div
            style={{
              ...styles.heroSection,
              backgroundImage: `url(${
                currentCenter.mainImage ||
                "https://via.placeholder.com/1200x400?text=Dive+Center+Image"
              })`,
            }}
          >
            <div style={styles.heroOverlay}></div>
            <div style={styles.heroContent}>
              <h1 style={styles.centerName}>{currentCenter.name}</h1>
              <p style={styles.centerLocation}>📍 {currentCenter.location}</p>
              <div style={styles.ratingSection}>
                <div style={styles.rating}>
                  {renderStars(currentCenter.rating)}
                  <span style={styles.ratingText}>{currentCenter.rating}</span>
                </div>
                <span style={styles.reviewCount}>
                  ({currentCenter.totalReviews} reviews)
                </span>
              </div>
            </div>
          </div>

          <div style={styles.contentSection}>
            <div style={styles.tabNavigation}>
              {["overview", "packages", "reviews"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    ...styles.tab,
                    ...(activeTab === tab
                      ? styles.tabActive
                      : styles.tabInactive),
                  }}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            <div style={styles.tabContent}>
              {activeTab === "overview" && (
                <div>
                  <p style={styles.description}>{currentCenter.description}</p>

                  <h3>Gallery</h3>
                  {currentCenter.gallery && currentCenter.gallery.length > 0 ? (
                    <div style={styles.gallery}>
                      {currentCenter.gallery.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`Dive center ${currentCenter.name} - ${
                            index + 1
                          }`}
                          style={styles.galleryImage}
                          onClick={() => setSelectedImage(image)}
                        />
                      ))}
                    </div>
                  ) : (
                    <p style={styles.noDataSubMessage}>
                      No gallery images available.
                    </p>
                  )}

                  <h3>Facilities & Features</h3>
                  {currentCenter.features &&
                  currentCenter.features.length > 0 ? (
                    <div style={styles.featuresGrid}>
                      {currentCenter.features.map((feature, index) => (
                        <div key={index} style={styles.featureCard}>
                          <div style={styles.featureTitle}>{feature}</div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p style={styles.noDataSubMessage}>
                      No facilities or features listed.
                    </p>
                  )}

                  <h3>Specialties</h3>
                  {currentCenter.specialties &&
                  currentCenter.specialties.length > 0 ? (
                    <div style={styles.specialtiesList}>
                      {currentCenter.specialties.map((specialty, index) => (
                        <span key={index} style={styles.specialtyTag}>
                          {specialty}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p style={styles.noDataSubMessage}>
                      No specialties listed.
                    </p>
                  )}
                </div>
              )}

              {activeTab === "packages" &&
                (currentCenter.packages &&
                Array.isArray(currentCenter.packages) &&
                currentCenter.packages.length > 0 ? (
                  <div style={styles.packagesGrid}>
                    {currentCenter.packages.map((pkg) => (
                      <div
                        key={pkg._id}
                        style={{
                          ...styles.packageCard,
                          ...(hoveredPackage === pkg._id
                            ? styles.packageCardHover
                            : {}),
                          ...(pkg.highlight ? { borderColor: "#667eea" } : {}),
                        }}
                        onMouseEnter={() => setHoveredPackage(pkg._id)}
                        onMouseLeave={() => setHoveredPackage(null)}
                      >
                        {pkg.highlight && (
                          <div style={styles.highlightBadge}>Popular</div>
                        )}
                        <div style={styles.packageHeader}>
                          <h3 style={styles.packageName}>{pkg.name}</h3>
                          <div style={styles.packagePrice}>{pkg.price}</div>
                          <div style={styles.packageMeta}>
                            <span>{pkg.duration}</span>
                            <span>•</span>
                            <span>{pkg.dives}</span>
                          </div>
                        </div>
                        <p style={styles.packageDescription}>
                          {pkg.description}
                        </p>
                        <ul style={styles.includesList}>
                          {pkg.includes &&
                          Array.isArray(pkg.includes) &&
                          pkg.includes.length > 0 ? (
                            pkg.includes.map((item, index) => (
                              <li key={index} style={styles.includesItem}>
                                <span style={styles.checkIcon}>✓</span> {item}
                              </li>
                            ))
                          ) : (
                            <li>No inclusions listed.</li>
                          )}
                        </ul>
                        <button
                          style={styles.bookButton}
                          onClick={() => handleBooking(pkg)}
                        >
                          Book Now
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={styles.noDataSubMessage}>
                    No packages available for this dive center.
                  </div>
                ))}

              {activeTab === "reviews" &&
                (currentCenter.reviews && currentCenter.reviews.length > 0 ? (
                  <div style={styles.reviewsGrid}>
                    {currentCenter.reviews.map((review) => (
                      <div key={review.id} style={styles.reviewCard}>
                        <div style={styles.reviewHeader}>
                          <div>
                            <div style={styles.reviewAuthor}>
                              {review.author}
                            </div>
                            <div style={styles.reviewDate}>
                              {new Date(review.date).toLocaleDateString()}
                            </div>
                          </div>
                          <div>{renderStars(review.rating)}</div>
                        </div>
                        <h4 style={styles.reviewTitle}>{review.title}</h4>
                        <p style={styles.reviewContent}>{review.content}</p>
                        <div style={styles.reviewFooter}>
                          <span>Verified Booking</span>
                          <span style={styles.helpful}>
                            <span>Helpful?</span>
                            <span>{review.helpful}</span>
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={styles.noDataSubMessage}>
                    No reviews available for this dive center.
                  </div>
                ))}
            </div>
          </div>
        </div>
      ) : (
        <div style={styles.noDataMessage}>Please select a dive center.</div>
      )}

      {selectedImage && (
        <div style={styles.imageModal} onClick={() => setSelectedImage(null)}>
          <img
            src={selectedImage}
            alt="Full size"
            style={styles.fullImage}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, sans-serif",
    backgroundColor: "#f8fafc",
    minHeight: "100vh",
    padding: "2rem 1rem",
    paddingTop: "5rem",
  },
  centerSelector: {
    display: "flex",
    gap: "1rem",
    marginBottom: "2rem",
    overflowX: "auto",
    padding: "0.5rem 0",
    justifyContent: "center",
  },
  centerOption: {
    padding: "0.75rem 1.5rem",
    borderRadius: "25px",
    border: "none",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "0.9rem",
    transition: "all 0.3s ease",
    whiteSpace: "nowrap",
    minWidth: "fit-content",
  },
  centerOptionActive: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
  },
  centerOptionInactive: {
    backgroundColor: "white",
    color: "#4a5568",
    border: "1px solid #e2e8f0",
    "&:hover": {
      backgroundColor: "#f0f4f8",
    },
  },
  mainCard: {
    backgroundColor: "white",
    borderRadius: "20px",
    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  heroSection: {
    position: "relative",
    height: "400px",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    alignItems: "flex-end",
    padding: "2rem",
  },
  heroOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)",
  },
  heroContent: {
    position: "relative",
    zIndex: 1,
    color: "white",
    textAlign: "left",
  },
  centerName: {
    fontSize: "2.5rem",
    marginBottom: "0.5rem",
    fontWeight: "bold",
    textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
  },
  centerLocation: {
    fontSize: "1.2rem",
    marginBottom: "0.8rem",
    textShadow: "1px 1px 3px rgba(0,0,0,0.5)",
  },
  ratingSection: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  rating: {
    display: "flex",
    alignItems: "center",
  },
  ratingText: {
    fontSize: "1.1rem",
    fontWeight: "bold",
    marginLeft: "0.2rem",
  },
  reviewCount: {
    fontSize: "0.9rem",
    opacity: 0.8,
  },
  contentSection: {
    padding: "2rem",
  },
  tabNavigation: {
    display: "flex",
    gap: "1rem",
    marginBottom: "2rem",
    borderBottom: "1px solid #e2e8f0",
  },
  tab: {
    padding: "0.75rem 1.25rem",
    border: "none",
    backgroundColor: "transparent",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "600",
    color: "#4a5568",
    borderBottom: "3px solid transparent",
    transition: "all 0.3s ease",
    "&:hover": {
      color: "#667eea",
    },
  },
  tabActive: {
    color: "#667eea",
    borderColor: "#667eea",
  },
  tabInactive: {
    // styles already defined in .tab
  },
  tabContent: {
    paddingTop: "1rem",
  },
  description: {
    fontSize: "1rem",
    lineHeight: "1.6",
    color: "#4a5568",
    marginBottom: "2rem",
  },
  gallery: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
    gap: "1rem",
    marginBottom: "2rem",
  },
  galleryImage: {
    width: "100%",
    height: "120px",
    objectFit: "cover",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "transform 0.2s ease",
    "&:hover": {
      transform: "scale(1.03)",
    },
  },
  featuresGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "1rem",
    marginBottom: "2rem",
  },
  featureCard: {
    backgroundColor: "#f0f4f8",
    borderRadius: "10px",
    padding: "1rem",
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
  },
  featureTitle: {
    fontWeight: "600",
    color: "#2d3748",
  },
  specialtiesList: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.75rem",
    marginBottom: "2rem",
  },
  specialtyTag: {
    backgroundColor: "#e6fffa",
    color: "#319795",
    padding: "0.5rem 1rem",
    borderRadius: "20px",
    fontSize: "0.9rem",
    fontWeight: "500",
  },
  packagesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "2rem",
  },
  packageCard: {
    backgroundColor: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "15px",
    padding: "1.5rem",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
    transition: "all 0.3s ease",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    "&:hover": {
      boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
      transform: "translateY(-5px)",
    },
  },
  packageCardHover: {
    // No specific styles needed here, as the hover is handled by '&:hover'
  },
  highlightBadge: {
    position: "absolute",
    top: "15px",
    right: "15px",
    backgroundColor: "#764ba2",
    color: "white",
    padding: "0.3rem 0.8rem",
    borderRadius: "15px",
    fontSize: "0.8rem",
    fontWeight: "bold",
  },
  packageHeader: {
    marginBottom: "1rem",
  },
  packageName: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#2d3748",
    marginBottom: "0.5rem",
  },
  packagePrice: {
    fontSize: "1.8rem",
    fontWeight: "extrabold",
    color: "#667eea",
    marginBottom: "0.5rem",
  },
  packageMeta: {
    fontSize: "0.9rem",
    color: "#718096",
    display: "flex",
    gap: "0.5rem",
  },
  packageDescription: {
    fontSize: "0.95rem",
    color: "#4a5568",
    lineHeight: "1.5",
    marginBottom: "1rem",
    flexGrow: 1,
  },
  includesList: {
    listStyle: "none",
    padding: 0,
    marginBottom: "1.5rem",
  },
  includesItem: {
    display: "flex",
    alignItems: "center",
    marginBottom: "0.5rem",
    color: "#2d3748",
    fontSize: "0.9rem",
  },
  checkIcon: {
    color: "#38a169",
    marginRight: "0.5rem",
    fontWeight: "bold",
  },
  bookButton: {
    backgroundColor: "#667eea",
    color: "white",
    padding: "0.8rem 1.5rem",
    borderRadius: "10px",
    border: "none",
    fontSize: "1rem",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background-color 0.3s ease, transform 0.2s ease",
    width: "100%",
    "&:hover": {
      backgroundColor: "#764ba2",
      transform: "translateY(-2px)",
    },
  },
  reviewsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "2rem",
  },
  reviewCard: {
    backgroundColor: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "15px",
    padding: "1.5rem",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
    display: "flex",
    flexDirection: "column",
  },
  reviewHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "1rem",
  },
  reviewAuthor: {
    fontWeight: "bold",
    color: "#2d3748",
    fontSize: "1.1rem",
  },
  reviewDate: {
    fontSize: "0.85rem",
    color: "#718096",
  },
  reviewTitle: {
    fontSize: "1.2rem",
    fontWeight: "600",
    color: "#2d3748",
    marginBottom: "0.75rem",
  },
  reviewContent: {
    fontSize: "0.95rem",
    color: "#4a5568",
    lineHeight: "1.6",
    marginBottom: "1rem",
    flexGrow: 1,
  },
  reviewFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "0.85rem",
    color: "#718096",
    marginTop: "1rem",
    borderTop: "1px solid #e2e8f0",
    paddingTop: "0.75rem",
  },
  helpful: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    backgroundColor: "#f0f4f8",
    padding: "0.3rem 0.8rem",
    borderRadius: "15px",
  },
  imageModal: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  fullImage: {
    maxWidth: "90%",
    maxHeight: "90%",
    objectFit: "contain",
    borderRadius: "10px",
    boxShadow: "0 0 20px rgba(0, 0, 0, 0.5)",
  },
  loadingMessage: {
    textAlign: "center",
    fontSize: "1.2rem",
    color: "#4a5568",
    marginTop: "50px",
  },
  errorMessage: {
    textAlign: "center",
    fontSize: "1.2rem",
    color: "#e53e3e",
    marginTop: "50px",
    fontWeight: "bold",
  },
  noDataMessage: {
    textAlign: "center",
    fontSize: "1.2rem",
    color: "#718096",
    marginTop: "50px",
  },
  noDataSubMessage: {
    textAlign: "center",
    fontSize: "1rem",
    color: "#718096",
    marginTop: "1rem",
    padding: "1rem",
    backgroundColor: "#f0f4f8",
    borderRadius: "8px",
  },
};
export default DiveCenters;
