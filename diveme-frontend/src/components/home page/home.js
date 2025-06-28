import React, { useState } from "react";
import { Search, Users, Camera, MapPin, ArrowRight, User, Star } from "lucide-react";


const services = [
  {
    title: "Diving Models",
    description:
      "Explore our specialized diving models designed for unique underwater adventures.",
    imgSrc:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2N1YmElMjBkaXZpbmd8ZW58MHx8MHx8fDA%3D",
    alt: "Two scuba divers underwater showcasing new diving techniques",
    icon: Users,
  },
  {
    title: "Equipment Rentals",
    description:
      "Rent top-notch diving gear for your underwater excursions.",
    imgSrc:
      "https://plus.unsplash.com/premium_photo-1686397308769-2ca4e9a9d7ad?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZGl2aW5nJTIwRXF1aXBtZW50JTIwUmVudGFsc3xlbnwwfHwwfHx8MA%3D%3D",
    alt: "Diving equipment ready for rent including oxygen tanks and suits",
    icon: Camera,
  },
  {
    title: "Guided Tours",
    description:
      "Join our expert guides on unforgettable diving tours to exotic locations.",
    imgSrc:
      "https://media.istockphoto.com/id/171578501/photo/funny-pictures.webp?a=1&b=1&s=612x612&w=0&k=20&c=Miezi811eIXcPvrKGva1lhfI18gsToeuLMSJPlZiDrs=",
    alt: "Boat approaching a coastal underwater cave for guided diving tours",
    icon: MapPin,
  },
];

const divingSpots = [
  {
    title: "Mirissa Coral Reefs",
    description: "Discover vibrant coral gardens and tropical fish in the crystal-clear waters of Mirissa. Perfect for beginners and experienced divers alike.",
    imgSrc:
      "https://media.istockphoto.com/id/1131905077/photo/aerial-weligama-sri-lanka.jpg?s=612x612&w=0&k=20&c=DMj8Ldz0CokebdSy2UozXRt1T2_Aah5x6Ydh1KxYJ5g=",
    alt: "Colorful coral reefs and tropical fish underwater at Mirissa",
    depth: "5-15m",
    visibility: "15-25m",
    reviews: [
      {
        name: "Sarah Johnson",
        rating: 5,
        comment: "Amazing coral formations! Saw so many colorful fish. Perfect spot for beginners like me."
      },
      {
        name: "Ravi Perera",
        rating: 4,
        comment: "Beautiful underwater scenery. The guide was very knowledgeable and helpful."
      },
      {
        name: "Emma Wilson",
        rating: 5,
        comment: "Absolutely breathtaking! The visibility was excellent and we even spotted some sea turtles."
      }
    ]
  },
  {
    title: "Arugam Bay",
    description:
      "Dive into the eastern coast’s beauty at Arugam Bay, famous for its vibrant coral reefs, manta rays, and occasional whale sightings during the season.",
    imgSrc:
      "https://media.istockphoto.com/id/586936410/photo/the-hawksbill-sea-turtle.jpg?s=612x612&w=0&k=20&c=vqNmcRKH2AdPhBtILEWnenfuSXc_Cc3zMNHP6LZQohk=",
    alt: "Clear ocean waters at Arugam Bay with coral reef formations",
    depth: "6-22m",
    visibility: "15-28m",
    reviews: [
      {
        name: "Michael Chen",
        rating: 5,
        comment: "Incredible dive site! Saw reef sharks and the coral diversity is outstanding."
      },
      {
        name: "Priya Sharma",
        rating: 4,
        comment: "Great for experienced divers. The marine life here is truly spectacular."
      },
      {
        name: "David Lee",
        rating: 5,
        comment: "Best diving experience in Sri Lanka! The underwater sanctuary is well preserved."
      }
    ]
  },
  {
    title: "Hikkaduwa Reef",
    description: "Experience one of Sri Lanka's most famous diving destinations with incredible biodiversity and stunning underwater landscapes.",
    imgSrc:
      "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/4ff1bf3e-aab2-472b-b55c-7448afd91f25.png",
    alt: "Underwater view of Hikkaduwa coral reef teeming with marine life",
    depth: "3-18m",
    visibility: "10-20m",
    reviews: [
      {
        name: "Jessica Brown",
        rating: 4,
        comment: "Famous for a reason! Great variety of marine life, though it can get crowded."
      },
      {
        name: "Sunil Fernando",
        rating: 5,
        comment: "Perfect for all skill levels. The shallow areas are great for new divers."
      },
      {
        name: "Alex Thompson",
        rating: 4,
        comment: "Beautiful reef system. The night diving here is absolutely magical!"
      }
    ]
  },
];

export default function DiveMeHomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedSpot, setSelectedSpot] = useState(null);

  const handleSearch = () => {
    if (searchText.trim()) {
      console.log("Searching for:", searchText);
      // Add search functionality here
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const showReviews = (spot) => {
    setSelectedSpot(spot);
  };

  const closeReviews = () => {
    setSelectedSpot(null);
  };
  return (
    <>
      <main>
        <section className="hero" role="region" aria-labelledby="hero-title">
          <div className="hero-content">
            <h1 id="hero-title">
              Explore the <strong>Depths</strong> with DiveMe
            </h1>
            <p>
              Find the best diving centers around Sri Lanka and embark on an
              underwater adventure.
            </p>
            <div className="search-container">
              <input
                type="search"
                aria-label="Search diving centers"
                placeholder="Search diving centers..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyPress={handleKeyPress}
                spellCheck="false"
              />
              <button 
                className="explore-btn"
                onClick={handleSearch}
                aria-label="Explore diving centers"
              >
                <Search size={18} />
                Explore
              </button>
            </div>
          </div>
        </section>

        <section id="services" aria-labelledby="services-title" role="region">
          <h2 className="section-title" id="services-title">
            Our Services
          </h2>
          <div className="container grid-container">
            {services.map(({ title, description, imgSrc, alt, icon: Icon }) => (
              <article className="service-card" key={title} tabIndex={0} aria-label={title}>
                <img src={imgSrc} alt={alt} loading="lazy" />
                <div className="service-card-content">
                  <div className="service-icon">
                    <Icon size={24} />
                  </div>
                  <h3 className="service-card-title">{title}</h3>
                  <p className="service-card-desc">{description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          id="diving-spots"
          aria-labelledby="diving-spots-title"
          role="region"
        >
          <h2 className="section-title" id="diving-spots-title">
            Popular Diving Spots
          </h2>
          <div className="container grid-container">
            {divingSpots.map(({ title, description, imgSrc, alt, depth, visibility, reviews }) => (
              <article
                className="spot-card"
                key={title}
                tabIndex={0}
                aria-label={`Diving spot: ${title}`}
              >
                <img src={imgSrc} alt={alt} loading="lazy" />
                <div className="spot-card-content">
                  <h3 className="spot-card-title">{title}</h3>
                  <p className="spot-card-desc">{description}</p>
                  <div className="spot-info">
                    <span>Depth: {depth}</span>
                    <span>Visibility: {visibility}</span>
                  </div>
                  <button 
                    className="learn-more-btn"
                    onClick={() => showReviews({ title, reviews })}
                    aria-label={`Learn more about ${title}`}
                  >
                    View Reviews
                    <ArrowRight size={16} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Review Modal */}
        {selectedSpot && (
          <div className="modal-overlay" onClick={closeReviews}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3 className="modal-title">{selectedSpot.title} - Reviews</h3>
                <button className="close-btn" onClick={closeReviews} aria-label="Close reviews">
                  ×
                </button>
              </div>
              <div className="modal-body">
                {selectedSpot.reviews.map((review, index) => (
                  <div key={index} className="review-item">
                    <div className="review-header">
                      <div className="reviewer-avatar">
                        <User size={20} />
                      </div>
                      <div className="reviewer-info">
                        <p className="reviewer-name">{review.name}</p>
                        <div className="review-rating">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              size={16}
                              className={star <= review.rating ? "star" : "star empty"}
                              fill={star <= review.rating ? "#ffc107" : "none"}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="review-comment">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
      
       <style>{`
        /* Reset */
        * {
          box-sizing: border-box;
        }
        body {
          margin:0;
          font-family: 'Poppins', sans-serif;
          background: #f7fafd;
          color: #111;
          overflow-x: hidden;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        /* Container */
        .container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 16px;
          width: 100%;
        }

        /* Hero Section */
        .hero {
          background: url('https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/d4ff6da2-e03b-4c43-83e5-79d2a16a9fac.png') center/cover no-repeat;
          color: white;
          padding: 80px 16px 120px 16px;
          text-align: center;
          position: relative;
        }
        .hero::after {
          content: "";
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.35);
          z-index: 0;
        }
        .hero-content {
          position: relative;
          z-index: 1;
          max-width: 720px;
          margin: 0 auto;
        }
        .hero h1 {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 12px;
          line-height: 1.1;
        }
        .hero p {
          font-size: 1.125rem;
          margin-bottom: 24px;
          font-weight: 500;
          text-shadow: 0 1px 4px rgba(0,0,0,0.6);
        }

        /* Search Bar Container */
        .search-container {
          position: relative;
          max-width: 480px;
          margin: 0 auto;
          display: flex;
          gap: 8px;
        }

        .hero input[type="search"] {
          flex: 1;
          padding: 14px 16px;
          border-radius: 8px;
          border: none;
          font-size: 1rem;
          outline-offset: 2px;
          border: 2px solid transparent;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .hero input[type="search"]:focus {
          border-color: #00bcd4;
          outline: none;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.15);
        }

        .explore-btn {
          background: linear-gradient(135deg,rgb(88, 197, 211),rgb(2, 129, 143));
          color: white;
          border: none;
          padding: 12px 20px;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 4px 12px rgba(0, 188, 212, 0.3);
          white-space: nowrap;
        }
        .explore-btn:hover {
          background: linear-gradient(135deg, #0097a7, #00838f);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(25, 209, 234, 0.4);
        }
          @keyframes fadeColor {
          0% {
            color: #0077b6; /* deep ocean blue */
          }
          50% {
            color: #00b4d8; /* tropical light blue */
          }
          100% {
            color: #90e0ef; /* light water ripple blue */
          }
        }

        h2.section-title {
          font-size: 2.5rem;
          margin-bottom: 24px;
          font-weight: 700;
          text-align: center;
          font-family: 'Montserrat', sans-serif;
          animation: fadeColor 4s infinite ease-in-out;
        }


        /* Grid Layout for Services & Diving Spots */
        .grid-container {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
          padding: 0 16px 48px 16px;
        }

        /* Service Cards */
        .service-card {
          background: linear-gradient(135deg,rgb(169, 205, 231),rgb(99, 182, 230));
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 8px 24px rgba(0, 109, 151, 0.1);
          transition: all 0.4s ease;
          display: flex;
          flex-direction: column;
          position: relative;
          cursor: pointer;
        }
        .service-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 109, 151, 0.2);
        }
        .service-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #00bcd4, #9c27b0);
        }
        .service-card img {
          max-width: 100%;
          height: auto;
          object-fit: cover;
          aspect-ratio: 16/9;
          transition: transform 0.4s ease;
        }
        .service-card:hover img {
          transform: scale(1.05);
        }
        .service-card-content {
          padding: 20px 24px;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }
        .service-icon {
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, #00bcd4, #0097a7);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
          color: white;
          box-shadow: 0 4px 12px rgba(0, 188, 212, 0.3);
        }
        .service-card-title {
          margin: 0 0 12px 0;
          font-size: 1.25rem;
          font-weight: 700;
          color: #002f4a;
        }
        .service-card-desc {
          margin: 0;
          font-size: 1rem;
          line-height: 1.5;
          color: #2c2c2c;
        }

        /* Diving Spot Cards */
        .spot-card {
          background: #ffffff;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 8px 24px rgba(0, 109, 151, 0.08);
          transition: all 0.4s ease;
          display: flex;
          flex-direction: column;
          cursor: pointer;
        }
        .spot-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 32px rgba(0, 109, 151, 0.15);
        }
        .spot-card img {
          max-width: 100%;
          height: auto;
          object-fit: cover;
          aspect-ratio: 16/9;
          transition: transform 0.4s ease;
        }
        .spot-card:hover img {
          transform: scale(1.03);
        }
        .spot-card-content {
          padding: 24px;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }
        .spot-card-title {
          margin: 0 0 12px 0;
          font-size: 1.25rem;
          font-weight: 700;
          color: #002f4a;
        }
        .spot-card-desc {
          margin: 0 0 16px 0;
          font-size: 0.95rem;
          line-height: 1.6;
          color: #4a4a4a;
          flex-grow: 1;
        }
        .spot-info {
          display: flex;
          gap: 16px;
          margin-bottom: 20px;
          font-size: 0.85rem;
          color: #666;
        }
        .spot-info span {
          background: #f0f9ff;
          padding: 4px 8px;
          border-radius: 6px;
          font-weight: 500;
        }
        .learn-more-btn {
          background: linear-gradient(135deg, #00bcd4, #0097a7);
          color: white;
          border: none;
          padding: 12px 16px;
          border-radius: 8px;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          align-self: flex-start;
        }
        .learn-more-btn:hover {
          background: linear-gradient(135deg, #0097a7, #00838f);
          transform: translateX(4px);
        }

        /* Review Modal */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.6);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
          backdrop-filter: blur(4px);
        }
        .modal-content {
          background: white;
          border-radius: 16px;
          max-width: 600px;
          width: 100%;
          max-height: 80vh;
          overflow-y: auto;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
          animation: modalSlideIn 0.3s ease;
        }
        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .modal-header {
          padding: 24px 24px 16px 24px;
          border-bottom: 1px solid #e0e0e0;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .modal-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #002f4a;
          margin: 0;
        }
        .close-btn {
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: #666;
          padding: 4px;
          border-radius: 4px;
          transition: background-color 0.2s;
        }
        .close-btn:hover {
          background-color: #f0f0f0;
        }
        .modal-body {
          padding: 24px;
        }
        .review-item {
          background: #f8f9fa;
          border-radius: 12px;
          padding: 16px;
          margin-bottom: 16px;
          border-left: 4px solid #00bcd4;
        }
        .review-item:last-child {
          margin-bottom: 0;
        }
        .review-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 8px;
        }
        .reviewer-avatar {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #00bcd4, #0097a7);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }
        .reviewer-info {
          flex: 1;
        }
        .reviewer-name {
          font-size: 1rem;
          font-weight: 600;
          color: #333;
          margin: 0 0 4px 0;
        }
        .review-rating {
          display: flex;
          gap: 2px;
        }
        .star {
          color: #ffc107;
        }
        .star.empty {
          color: #e0e0e0;
        }
        .review-comment {
          color: #555;
          line-height: 1.5;
          margin: 0;
          font-size: 0.95rem;
        }

        /* Desktop and Larger Screens */
        @media screen and (min-width: 768px) {
          .grid-container {
            grid-template-columns: repeat(3, 1fr);
            padding: 0 0 64px 0;
            max-width: 1200px;
            margin: 0 auto;
          }
          .hero h1 {
            font-size: 3.5rem;
          }
          .hero p {
            font-size: 1.25rem;
          }
          .hero {
            padding: 100px 16px 140px 16px;
          }
          .search-container {
            max-width: 520px;
          }
        }

        /* Large Desktop */
        @media screen and (min-width: 1440px) {
          .container {
            max-width: 1440px;
          }
          .grid-container {
            max-width: 1400px;
          }
          .hero h1 {
            font-size: 4rem; 
          }
        }

        /* Mobile Search Layout */
        @media screen and (max-width: 480px) {
          .search-container {
            flex-direction: column;
            gap: 12px;
          }
          .explore-btn {
            align-self: center;
            min-width: 140px;
          }
        }

        /* Desktop and Larger Screens */
        @media screen and (min-width: 768px) {
          .grid-container {
            grid-template-columns: repeat(3, 1fr);
            padding: 0 0 64px 0;
            max-width: 1200px;
            margin: 0 auto;
          }
          .hero h1 {
            font-size: 3.5rem;
          }
          .hero p {
            font-size: 1.25rem;
          }
          .hero {
            padding: 100px 16px 140px 16px;
          }
          .search-container {
            max-width: 520px;
          }
        }

        /* Large Desktop */
        @media screen and (min-width: 1440px) {
          .container {
            max-width: 1440px;
          }
          .grid-container {
            max-width: 1400px;
          }
          .hero h1 {
            font-size: 4rem; 
          }
        }

        /* Mobile Search Layout */
        @media screen and (max-width: 480px) {
          .search-container {
            flex-direction: column;
            gap: 12px;
          }
          .explore-btn {
            align-self: center;
            min-width: 140px;
          }
        }
      `}</style>
    </>
  );
}