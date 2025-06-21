import React, { useState } from 'react';

const DiveCenters = () => {
  const [selectedCenter, setSelectedCenter] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedImage, setSelectedImage] = useState(null);
  const [hoveredPackage, setHoveredPackage] = useState(null);

  const diveCenters = [
    {
  id: 1,
  name: 'Mirissa Dive Center',
  location: 'Mirissa, Down South, Sri Lanka',
  rating: 4.9,
  totalReviews: 127,
  description: 'Discover the vibrant underwater world of southern Sri Lanka. Mirissa Dive Center offers exceptional diving experiences along the stunning coral reefs teeming with tropical marine life and turtles.',
  mainImage: 'https://media.istockphoto.com/id/2164074186/photo/aerial-view-of-coconut-grove-on-the-cliff-above-the-ocean.webp?a=1&b=1&s=612x612&w=0&k=20&c=QNeAH9WnohN-itELckWIyUqwjalVi9YoGUQ1QCaEHUU=',
  gallery: [
    'https://images.unsplash.com/photo-1579989197355-c2c5ff50a3f3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8TWlyaXNzYXxlbnwwfHwwfHx8MA%3D%3D',
    'https://images.unsplash.com/photo-1613693699413-7dde0260f437?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fE1pcmlzc2F8ZW58MHx8MHx8fDA%3D',
    'https://images.unsplash.com/photo-1544750040-4ea9b8a27d38?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fE1pcmlzc2F8ZW58MHx8MHx8fDA%3D',
    'https://images.unsplash.com/photo-1650867715136-0774db12a0fb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fE1pcmlzc2F8ZW58MHx8MHx8fDA%3D'
  ],
  features: ['PADI Certified', 'Local Dive Masters', 'Turtle Spotting', 'Equipment Rental', 'Coral Reef Diving', 'Snorkeling Trips'],
  specialties: ['Reef Diving', 'Turtle Encounters', 'Night Diving', 'Snorkeling Adventures'],
  packages: [
  {
    id: 1,
    name: 'Turtle Reef Safari',
    price: '$220',
    duration: '1 day',
    dives: '2 dives',
    description: 'Swim alongside sea turtles and explore vibrant coral gardens in Mirissa.',
    includes: ['All equipment', 'Boat ride', 'Instructor guidance', 'Snacks & water'],
    highlight: true,
    bookingUrl: '/booking'
  },
  {
    id: 2,
    name: 'Sunset Snorkel Adventure',
    price: '$150',
    duration: 'Half day',
    dives: '1 guided snorkel',
    description: 'Relax and explore reef life during a magical sunset snorkeling session.',
    includes: ['Snorkel gear', 'Life jacket', 'Guided tour', 'Refreshments'],
    bookingUrl: '/booking'
  },
  {
    id: 3,
    name: 'Morning Reef Dive Tour',
    price: '$180',
    duration: 'Half day',
    dives: '2 dives',
    description: 'Join our expert guides for a scenic morning dive around coral-rich sites near Mirissa.',
    includes: ['Dive gear', 'Boat ride', 'Dive master', 'Water & towels'],
    bookingUrl: '/booking'
  }
],
  reviews: [
    {
      id: 1,
      author: 'Emma Thompson',
      rating: 5,
      date: '2024-03-15',
      title: 'Magical Turtle Encounter',
      content: 'I was amazed to swim next to three sea turtles during our reef dive. The guides were so friendly and patient. Highly recommend for nature lovers!',
      helpful: 23
    },
    {
      id: 2,
      author: 'Marcus Chen',
      rating: 5,
      date: '2024-03-08',
      title: 'Great for Beginners',
      content: 'Mirissa was my first diving experience. The team was super helpful, and the underwater visibility was stunning. I saw dozens of colorful fish!',
      helpful: 18
    },
    {
      id: 3,
      author: 'Sophie Anderson',
      rating: 4,
      date: '2024-02-28',
      title: 'Loved the Coral Reefs',
      content: 'Such a beautiful place to dive. The coral formations were incredible and the guides explained everything so well.',
      helpful: 15
    },
    {
      id: 4,
      author: 'David Rodriguez',
      rating: 5,
      date: '2024-02-20',
      title: 'Sunset Snorkel is a Must!',
      content: 'The sunset snorkel adventure was peaceful and beautiful. The guide showed us hidden spots around the reef and we saw a school of angelfish. Perfect end to the day!',
      helpful: 31
    }
  ]
},
    {
  id: 2,
  name: 'Arugam Bay Dive Point',
  location: 'Arugam Bay, East Coast, Sri Lanka',
  rating: 4.8,
  totalReviews: 89,
  description: 'Dive into the clear turquoise waters of Arugam Bay and explore vibrant coral gardens, hidden shipwrecks, and diverse marine life. Ideal for both beginners and seasoned divers, with certified instructors and eco-friendly practices.',
  mainImage: 'https://media.istockphoto.com/id/1352227900/photo/tropical-beach-in-sri-lanka-with-boats-from-above.webp?a=1&b=1&s=612x612&w=0&k=20&c=a_x9N8RQ2dZUS4ukxqsVb3FFVMmIMY546KAn4RmkezA=',
  gallery: [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlY-GqKL36B1gDWHneHO3xJtxJe7UPrxWEsQ&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3gga50JA_ki6fCCLNufBAhCTONPmKE5M5Kg&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTf5tIsMcXZkAuVq_RU_GVegt16G3F3rbHZvg&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbS6T4iQxM4drFwMpOP8rMUDphl-A3vP7OwQ&s'
  ],
  features: ['Eco-Certified Instructors', 'Snorkeling & Freediving', 'Beginner Friendly', 'Boat & Shore Dives', 'Reef Conservation', 'Flexible Timings'],
  specialties: ['Turtle Spotting', 'Shallow Reef Exploration', 'Shipwreck Snorkeling', 'Night Dives'],
  packages: [
    {
      id: 1,
      name: 'Lagoon Explorer',
      price: '$160',
      duration: 'Half Day',
      dives: '2 dives',
      description: 'Perfect for beginners and nature lovers. Explore calm, shallow lagoons filled with colorful marine life.',
      includes: ['Dive gear', 'Instructor', 'Photos & video', 'Snacks & water'],
      highlight: true,
      bookingUrl: '/booking'
    },
    {
      id: 2,
      name: 'Wreck Adventure Dive',
      price: '$240',
      duration: '1 day',
      dives: '3 dives',
      description: 'Dive deep into history at a nearby shipwreck site teeming with marine life.',
      includes: ['Advanced dive guide', 'All equipment', 'Boat transport', 'Refreshments'],
      bookingUrl: '/booking'
    },
    {
      id: 3,
      name: 'Sunrise Shore Dive',
      price: '$120',
      duration: '2–3 hours',
      dives: '1 shore dive',
      description: 'Kickstart your day with a peaceful early morning dive just steps away from the shore.',
      includes: ['Shore entry dive', 'Local guide', 'Equipment rental', 'Tea & snacks'],
      bookingUrl: '/booking'
    }
  ],
  reviews: [
    {
      id: 1,
      author: 'Tharushi Perera',
      rating: 5,
      date: '2024-05-18',
      title: 'Magical Dive at Sunrise 🌅',
      content: 'It was my first dive and I couldn’t have asked for a better start! Peaceful, colorful fish, and great guides!',
      helpful: 21
    },
    {
      id: 2,
      author: 'Daniel Müller',
      rating: 5,
      date: '2024-05-11',
      title: 'Wreck Dive was Wild',
      content: 'The shipwreck site was unreal. Our instructor was super professional and the marine life was amazing.',
      helpful: 19
    },
    {
      id: 3,
      author: 'Maya Singh',
      rating: 4,
      date: '2024-04-29',
      title: 'Perfect for First Timers',
      content: 'They were very patient and calm with me as a beginner. I loved the underwater photo session too!',
      helpful: 17
    }
  ]
},
    {
  id: 3,
  name: 'Hikkaduwa Dive Center',
  location: 'Hikkaduwa, Southern Coast, Sri Lanka',
  rating: 4.7,
  totalReviews: 156,
  description: 'Discover the colorful coral reefs and shallow shipwrecks of Hikkaduwa with our certified local instructors. Whether you’re a beginner or an experienced diver, our team ensures a fun and safe experience in Sri Lanka’s iconic dive destination.',
  mainImage: 'https://media.istockphoto.com/id/1707625815/photo/sunset-on-a-sandy-beach-with-palm-trees-and-people-in-hikkaduwa.webp?a=1&b=1&s=612x612&w=0&k=20&c=2Q1WX1nw4pb8Ltr2AQLfRUMe9M7VdMyOkQUdgYcOAtc=',
  gallery: [
    'https://images.unsplash.com/photo-1582967788606-a171c1080cb0?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1465924655546-6c184df810a9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8SGlra2FkdXdhfGVufDB8fDB8fHww',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVYQX1_PcXeUScxPc8rZoX6SA_ptitRrCsoA&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0KnRLv0VXuv_KeFmr6DT6yiodglK8h3AHBA&s'
  ],
  features: ['Beginner-Friendly', 'Wreck Diving', 'Snorkeling Options', 'PADI Certified', 'Daily Boat Dives', 'Friendly Local Guides'],
  specialties: ['Coral Reef Diving', 'Shallow Shipwrecks', 'Night Diving', 'Sea Turtle Encounters'],
  packages: [
    {
      id: 1,
      name: 'Reef Discovery Dive',
      price: '$150',
      duration: 'Half Day',
      dives: '2 dives',
      description: 'Explore shallow coral reefs and spot a variety of tropical fish and sea turtles.',
      includes: ['Instructor-guided dive', 'Equipment rental', 'Photos & video', 'Refreshments'],
      highlight: true,
      bookingUrl: '/booking'
    },
    {
      id: 2,
      name: 'Wreck Safari Dive',
      price: '$190',
      duration: '1 day',
      dives: '3 dives',
      description: 'Dive around historic shallow wrecks teeming with marine life.',
      includes: ['Wreck dive gear', 'Expert guide', 'Boat transport', 'Snacks & water'],
      bookingUrl: '/booking'
    },
    {
      id: 3,
      name: 'Night Reef Adventure',
      price: '$130',
      duration: '2 hours',
      dives: '1 dive',
      description: 'See reef life come alive after sunset in this magical night dive experience.',
      includes: ['Torch & night equipment', 'Dive buddy system', 'Certified night guide', 'Tea post-dive'],
      bookingUrl: '/booking'
    }
  ],
  reviews: [
    {
      id: 1,
      author: 'Sajith Fernando',
      rating: 5,
      date: '2024-04-20',
      title: 'Colorful Reefs and Turtles 🐢',
      content: 'I didn’t expect to see so many turtles in one dive! The coral was beautiful and the guides were super friendly.',
      helpful: 31
    },
    {
      id: 2,
      author: 'Nina Roth',
      rating: 5,
      date: '2024-04-12',
      title: 'Perfect for First-Time Divers',
      content: 'They made me feel so safe even though I had never dived before. Loved the reef, fish, and the GoPro video they gave me!',
      helpful: 27
    },
    {
      id: 3,
      author: 'Mohamed Asif',
      rating: 4,
      date: '2024-03-28',
      title: 'Night Dive Was Unique',
      content: 'Really cool to see the reef at night – bioluminescent plankton and all! It was slightly chilly but well worth it.',
      helpful: 22
    },
    {
      id: 4,
      author: 'Amaya Weerasinghe',
      rating: 5,
      date: '2024-03-10',
      title: 'Well-organized and Fun!',
      content: 'Professional staff, clean gear, and amazing visibility underwater. Highly recommended if you’re in Hikka!',
      helpful: 25
    }
  ]
},
 {
  id: 4,
  name: 'Unawatuna Dive Center',
  location: 'Unawatuna, Southern Coast, Sri Lanka',
  rating: 4.7,
  totalReviews: 156,
  description: 'Dive into the calm waters of Unawatuna, perfect for beginners and marine life lovers. Our certified instructors will guide you through vibrant coral gardens, turtle-filled reefs, and even a few fascinating shipwrecks — all just a short ride from the beach.',
  mainImage: 'https://media.istockphoto.com/id/593331926/photo/idyllic-sandy-beach-with-palm-trees-dalawella-unawatuna-sri-lanka.webp?a=1&b=1&s=612x612&w=0&k=20&c=0rZn0RLcDFY-GxKSYqbZfY0uSf6BeB0EOWqyDMaOaiA=',
  gallery: [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGj3B2ZXg1T8DVazWjab2Vm4JB-A8e5D3slA&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUbtphW4abHtscYUbTD1MC99J4-HLCPFTYxA&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTrtlfcnqJgiHN5EyCkX0u01P9qbwuIHDA_w&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5zTemvQ7_tv-qF4rT729vpQaizVIE-FmtFg&s'
  ],
  features: ['Calm Waters', 'Ideal for Beginners', 'Turtle Sightings', 'PADI Certified', 'Short Boat Trips', 'Friendly Local Staff'],
  specialties: ['Shallow Reef Diving', 'Sea Turtle Encounters', 'Intro to Diving', 'Snorkeling Adventures'],
  packages: [
    {
      id: 1,
      name: 'Turtle Reef Dive',
      price: '$120',
      duration: 'Half Day',
      dives: '2 dives',
      description: 'Visit turtle hotspots and vibrant coral reefs with experienced local guides.',
      includes: ['All dive equipment', 'Certified guide', 'Underwater photos', 'Beach pickup'],
      highlight: true,
      bookingUrl: '/booking/unawatuna/turtle-reef-dive'
    },
    {
      id: 2,
      name: 'Beginner Scuba Experience',
      price: '$140',
      duration: '3 hours',
      dives: '1 dive',
      description: 'Try diving with a quick safety briefing and shallow reef experience.',
      includes: ['Intro training', 'Shallow guided dive', 'Photos & snacks', 'All equipment'],
      bookingUrl: '/booking/unawatuna/beginner-scuba-experience'
    },
    {
      id: 3,
      name: 'Snorkeling Safari',
      price: '$60',
      duration: '2 hours',
      dives: 'N/A',
      description: 'Enjoy a guided snorkeling trip to see tropical fish, corals, and maybe a turtle or two.',
      includes: ['Mask & fins', 'Life jacket', 'Guide & safety briefing', 'Fresh juice'],
      bookingUrl: '/booking/unawatuna/snorkeling-safari'
    }
  ],
  reviews: [
    {
      id: 1,
      author: 'Kavisha Perera',
      rating: 5,
      date: '2024-04-14',
      title: 'Best Place for Beginners!',
      content: 'I was a complete beginner and the instructors made me feel very safe. We saw two turtles and beautiful fish! Will be back again.',
      helpful: 30
    },
    {
      id: 2,
      author: 'Oliver Mason',
      rating: 5,
      date: '2024-03-29',
      title: 'Turtle Paradise 🐢',
      content: 'Saw so many turtles up close. Calm water, great visibility. Perfect for anyone new to diving.',
      helpful: 25
    },
    {
      id: 3,
      author: 'Dilini Jayawardena',
      rating: 4,
      date: '2024-03-20',
      title: 'Peaceful & Scenic',
      content: 'Snorkeling trip was very relaxing. The coral gardens were colorful and staff super friendly. Would love better fins though.',
      helpful: 21
    },
    {
      id: 4,
      author: 'Leon Müller',
      rating: 5,
      date: '2024-03-05',
      title: 'Great Training & Experience',
      content: 'Took the beginner scuba experience and it was incredible. Very professional and they gave us great GoPro footage afterward.',
      helpful: 27
    }
  ]
},
 {
  id: 5,
  name: 'Thalaramba Dive Base',
  location: 'Thalaramba, Mirissa, Southern Coast, Sri Lanka',
  rating: 4.7,
  totalReviews: 156,
  description: 'Nestled between coconut palms and golden beaches, Thalaramba offers a tranquil diving escape with rich marine biodiversity. Ideal for beginner to intermediate divers, enjoy close encounters with sea turtles, reef fish, and coral gardens just minutes from shore.',
  mainImage: 'https://media.istockphoto.com/id/1638828966/photo/beach-near-the-city-of-mirissa-sri-lanka.jpg?s=612x612&w=0&k=20&c=xpGTkIO9_GA72_-dLBlHL3-LCD5ww-uBNsqTyNZCZVw=',
  gallery: [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdvcfA2ol4l8qFN1bNr5dDDr00Yl3ZhS0iMg&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQz8Waw6HHqxFxd030rXRuo2rHdLGl9pL_Ucg&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBihIXMi6A3ELyAdYEdpdjF3tdOIuXkqQ8VA&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaQEimjTVDP3icMmnfXRGBPkLrJQgUPRu87g&s'
  ],
  features: ['Calm Reefs', 'Family-Friendly', 'Beach Access', 'PADI Certified', 'Local Instructors', 'Sunset Dives'],
  specialties: ['Shallow Reef Diving', 'Turtle Watching', 'Snorkeling Excursions', 'Scuba Refresher Courses'],
  packages: [
    {
      id: 1,
      name: 'Turtle Garden Dive',
      price: '$110',
      duration: 'Half Day',
      dives: '2 dives',
      description: 'Glide over soft coral beds and watch turtles feeding at Thalaramba’s most peaceful reef.',
      includes: ['All dive gear', 'PADI instructor', 'Turtle photo package', 'Coconut water break'],
      highlight: true,
      bookingUrl: '/booking/thalaramba/turtle-garden-dive'
    },
    {
      id: 2,
      name: 'Intro Dive for Beginners',
      price: '$135',
      duration: '3 hours',
      dives: '1 dive',
      description: 'Never dived before? This relaxed session helps you breathe underwater with confidence.',
      includes: ['Safety briefing', 'Shallow dive session', 'Photo & snack', 'Instructor support'],
      bookingUrl: '/booking/thalaramba/intro-dive-beginners'
    },
    {
      id: 3,
      name: 'Thalaramba Snorkel Cruise',
      price: '$65',
      duration: '2 hours',
      dives: 'N/A',
      description: 'A scenic snorkeling tour over coral reefs — perfect for families or non-divers.',
      includes: ['Mask & fins', 'Life jacket', 'Local guide', 'Tropical fruit refreshment'],
      bookingUrl: '/booking/thalaramba/snorkel-cruise'
    }
  ],
  reviews: [
    {
      id: 1,
      author: 'Harsha Wickramasinghe',
      rating: 5,
      date: '2024-04-22',
      title: 'Perfect for a Chill Dive 🌴',
      content: 'I loved the slow pace and the beautiful underwater views. Saw 3 turtles just chilling by the reef. Highly recommend for beginners.',
      helpful: 29
    },
    {
      id: 2,
      author: 'Elena Garcia',
      rating: 5,
      date: '2024-04-10',
      title: 'Relaxed & Beautiful',
      content: 'The dive was so relaxing — I didn’t feel rushed at all. The coral was in good shape and our guide pointed out lots of cool marine life.',
      helpful: 23
    },
    {
      id: 3,
      author: 'Ravindu Senanayake',
      rating: 4,
      date: '2024-03-30',
      title: 'First Dive Ever',
      content: 'The team was very friendly and guided us step by step. It was my first dive and I felt very comfortable.',
      helpful: 18
    },
    {
      id: 4,
      author: 'Marie Nguyen',
      rating: 5,
      date: '2024-03-15',
      title: 'Snorkeling Bliss',
      content: 'I don’t dive but the snorkel trip was AMAZING. Crystal-clear water and a great mix of colorful fish.',
      helpful: 21
    }
  ]
},
 {
  id: 6,
  name: 'Weligama Bay Dive Center',
  location: 'Weligama Bay, Southern Coast, Sri Lanka',
  rating: 4.7,
  totalReviews: 156,
  description: 'Weligama Bay is the perfect starting point for new divers. With calm, shallow waters and long sandy reefs, our dive center offers a relaxing and safe way to experience Sri Lanka’s vibrant marine world. See reef fish, turtles, and colorful coral just a short swim from shore.',
  mainImage: 'https://media.istockphoto.com/id/1919185998/photo/aerial-view-of-famous-landmark-taprobane-island-in-weligama-sri-lanka.jpg?s=612x612&w=0&k=20&c=U4nCGjWV8S6Se4StOlwClOhAlPCqkZme4NprGD_-O94=',
  gallery: [
    'https://media.istockphoto.com/id/942908508/photo/traditional-stilt-fishermen-in-sri-lanka-aerial-view-drone-photo.jpg?s=612x612&w=0&k=20&c=1kdpktVDLRlS5azhV3QV1Oivh7cM1lDWc-nWxvDiX8k=',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLxxAQTTrbBoFTA7VvyM51lzjZHVa0wsrpOQ&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_y9Gvga_TU4bv5BnswECZgWaMHyPeXtbziQ&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVoQfTLTL5YRzG0BcRD1bscCgnsVR0pk8xoA&s'
  ],
  features: ['Gentle Bay Entry', 'Perfect for Beginners', 'Snorkel Friendly', 'PADI Certified', 'Beachfront Access', 'Local Dive Masters'],
  specialties: ['Shallow Bay Diving', 'Turtle Watching', 'Snorkeling for All Ages', 'Scuba Discovery Programs'],
  packages: [
    {
      id: 1,
      name: 'Weligama Turtle Tour',
      price: '$115',
      duration: 'Half Day',
      dives: '2 dives',
      description: 'Spot sea turtles and reef fish in Weligama’s calm shallow reefs with expert instructors.',
      includes: ['Dive gear rental', 'Certified guide', 'Free underwater photo', 'Tea & snacks'],
      highlight: true,
      bookingUrl: '/booking/weligama/turtle-tour'
    },
    {
      id: 2,
      name: 'Discover Scuba Dive',
      price: '$130',
      duration: '3 hours',
      dives: '1 dive',
      description: 'Experience diving for the first time in a safe, bay-protected environment.',
      includes: ['PADI intro session', 'Shallow reef dive', 'All equipment', 'Certificate of participation'],
      bookingUrl: '/booking/weligama/discover-scuba'
    },
    {
      id: 3,
      name: 'Weligama Snorkel Safari',
      price: '$55',
      duration: '2 hours',
      dives: 'N/A',
      description: 'Join our guided snorkel trip and explore vibrant reefs just offshore.',
      includes: ['Snorkel mask & fins', 'Life vest', 'Experienced guide', 'Fresh fruit'],
      bookingUrl: '/booking/weligama/snorkel-safari'
    }
  ],
  reviews: [
    {
      id: 1,
      author: 'Isuru Madushanka',
      rating: 5,
      date: '2024-04-25',
      title: 'Super Easy for Beginners!',
      content: 'Weligama is ideal for first-timers. My girlfriend and I did the intro dive and felt totally safe. Saw turtles and lots of reef fish!',
      helpful: 28
    },
    {
      id: 2,
      author: 'Chloe Bernard',
      rating: 5,
      date: '2024-04-17',
      title: 'Chill & Scenic',
      content: 'Calm waters, great staff, and beautiful coral patches. Bonus: The beach is amazing too!',
      helpful: 22
    },
    {
      id: 3,
      author: 'Thilina Bandara',
      rating: 4,
      date: '2024-03-30',
      title: 'Great Family Spot',
      content: 'We came as a family of 4 — 2 adults and 2 kids. Did snorkeling and beginner dive. Kids loved the turtles!',
      helpful: 20
    },
    {
      id: 4,
      author: 'Lina Schulz',
      rating: 5,
      date: '2024-03-18',
      title: 'Peaceful and Professional',
      content: 'The dive center is well-organized, and the instructors were very patient. Great for building confidence underwater.',
      helpful: 26
    }
  ]
}

  ];

  // In DiveCenters.js
const handleBooking = (pkg) => {
  // Store the package details in localStorage or pass as URL params
  const bookingData = {
    packageId: pkg.id,
    packageName: pkg.name,
    packagePrice: parseFloat(pkg.price.replace('$', '')), // Convert "$220" to 220
    centerName: currentCenter.name
  };
  
  // Using localStorage (simple approach)
  localStorage.setItem('diveBooking', JSON.stringify(bookingData));
  
  // Navigate to booking page
  window.location.href = '/booking';
};

  const currentCenter = diveCenters[selectedCenter];

  // // Updated handleBooking function for internal routing
  // const handleBooking = (pkg) => {
  //   // For React Router, you would typically use:
  //   // navigate(pkg.bookingUrl);
    
  //   // For simple routing without React Router, you can use:
  //   window.location.href = pkg.bookingUrl;
    
  //   // Or if you want to handle it with state management in the same component:
  //   // You can add a booking state and show a booking form/page
  //   console.log('Booking package:', pkg.name, 'URL:', pkg.bookingUrl);
  // };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        style={{
          fontSize: '1rem',
          color: i < Math.floor(rating) ? '#FFD700' : '#E0E0E0'
        }}
      >
        ★
      </span>
    ));
  };

  return (
    <div style={styles.container}>
      {/* Center Selector */}
      <div style={styles.centerSelector}>
        {diveCenters.map((center, index) => (
          <button
            key={center.id}
            onClick={() => {
              setSelectedCenter(index);
              setActiveTab('overview'); // Reset to overview when switching centers
            }}
            style={{
              ...styles.centerOption,
              ...(selectedCenter === index ? styles.centerOptionActive : styles.centerOptionInactive)
            }}
          >
            {center.name}
          </button>
        ))}
      </div>

      {/* Main Content Card */}
      <div style={styles.mainCard}>
        {/* Hero Section */}
        <div
          style={{
            ...styles.heroSection,
            backgroundImage: `url(${currentCenter.mainImage})`
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
              <span style={styles.reviewCount}>({currentCenter.totalReviews} reviews)</span>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div style={styles.contentSection}>
          {/* Tab Navigation */}
          <div style={styles.tabNavigation}>
            {['overview', 'packages', 'reviews'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  ...styles.tab,
                  ...(activeTab === tab ? styles.tabActive : styles.tabInactive)
                }}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div style={styles.tabContent}>
            {activeTab === 'overview' && (
              <div>
                <p style={styles.description}>{currentCenter.description}</p>
                
                {/* Gallery */}
                <div style={styles.gallery}>
                  {currentCenter.gallery.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Dive center ${index + 1}`}
                      style={styles.galleryImage}
                      onClick={() => setSelectedImage(image)}
                    />
                  ))}
                </div>
                
                {/* Features */}
                <h3>Facilities & Features</h3>
                <div style={styles.featuresGrid}>
                  {currentCenter.features.map((feature, index) => (
                    <div key={index} style={styles.featureCard}>
                      <div style={styles.featureTitle}>{feature}</div>
                    </div>
                  ))}
                </div>
                
                {/* Specialties */}
                <h3>Specialties</h3>
                <div style={styles.specialtiesList}>
                  {currentCenter.specialties.map((specialty, index) => (
                    <span key={index} style={styles.specialtyTag}>
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'packages' && (
              <div style={styles.packagesGrid}>
                {currentCenter.packages.map((pkg) => (
                  <div
                    key={pkg.id}
                    style={{
                      ...styles.packageCard,
                      ...(hoveredPackage === pkg.id ? styles.packageCardHover : {}),
                      ...(pkg.highlight ? { borderColor: '#667eea' } : {})
                    }}
                    onMouseEnter={() => setHoveredPackage(pkg.id)}
                    onMouseLeave={() => setHoveredPackage(null)}
                  >
                    {pkg.highlight && <div style={styles.highlightBadge}>Popular</div>}
                    <div style={styles.packageHeader}>
                      <h3 style={styles.packageName}>{pkg.name}</h3>
                      <div style={styles.packagePrice}>{pkg.price}</div>
                      <div style={styles.packageMeta}>
                        <span>{pkg.duration}</span>
                        <span>•</span>
                        <span>{pkg.dives}</span>
                      </div>
                    </div>
                    <p style={styles.packageDescription}>{pkg.description}</p>
                    <ul style={styles.includesList}>
                      {pkg.includes.map((item, index) => (
                        <li key={index} style={styles.includesItem}>
                          <span style={styles.checkIcon}>✓</span> {item}
                        </li>
                      ))}
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
            )}

            {activeTab === 'reviews' && (
              <div style={styles.reviewsGrid}>
                {currentCenter.reviews.map((review) => (
                  <div key={review.id} style={styles.reviewCard}>
                    <div style={styles.reviewHeader}>
                      <div>
                        <div style={styles.reviewAuthor}>{review.author}</div>
                        <div style={styles.reviewDate}>{new Date(review.date).toLocaleDateString()}</div>
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
            )}
          </div>
        </div>
      </div>

      {/* Image Modal */}
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
}

export default DiveCenters;