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
    </>
  );
}