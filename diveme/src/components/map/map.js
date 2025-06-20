import React, { useEffect, useState, useRef } from 'react';
import { MapPin, Navigation, Waves, Fish, Camera, Star, Clock, Users, Phone, ExternalLink } from 'lucide-react';

// Mock diving locations data for Sri Lanka
const divingLocations = [
  {
    id: 1,
    name: 'Mirissa Coral Garden',
    position: { lat: 5.949, lng: 80.455 },
    image: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400&h=300&fit=crop',
    alt: 'Beautiful underwater coral reef at Mirissa dive site',
    rating: 4.8,
    depth: '8-25m',
    visibility: '15-30m',
    experience: 'Beginner to Advanced',
    highlights: ['Coral Gardens', 'Tropical Fish', 'Sea Turtles'],
    description: 'Famous for its vibrant coral gardens and diverse marine life including sea turtles and colorful reef fish.',
    phone: '+94 77 123 4567',
    learnMoreUrl: 'https://example.com/mirissa-diving'
  },
  {
    id: 2,
    name: 'Thalaramba Reef',
    position: { lat: 5.921, lng: 80.416 },
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop',
    alt: 'Colorful coral reef at Thalaramba dive site',
    rating: 4.6,
    depth: '12-30m',
    visibility: '20-35m',
    experience: 'Intermediate to Advanced',
    highlights: ['Hard Corals', 'Reef Sharks', 'Moray Eels'],
    description: 'Deep water reef perfect for experienced divers with excellent visibility and large pelagic encounters.',
    phone: '+94 77 234 5678',
    learnMoreUrl: 'https://example.com/thalaramba-diving'
  },
  {
    id: 3,
    name: 'Weligama Bay Wreck',
    position: { lat: 5.973, lng: 80.442 },
    image: 'https://images.unsplash.com/photo-1582967788606-a171c1080cb0?w=400&h=300&fit=crop',
    alt: 'Scenic view of coral underwater at Weligama dive site',
    rating: 4.9,
    depth: '15-35m',
    visibility: '25-40m',
    experience: 'Advanced',
    highlights: ['Shipwreck', 'Barracuda Schools', 'Whale Watching'],
    description: 'Historic shipwreck site with incredible marine biodiversity and seasonal whale watching opportunities.',
    phone: '+94 77 345 6789',
    learnMoreUrl: 'https://example.com/weligama-diving'
  },
  {
    id: 4,
    name: 'Unawatuna Coral Sanctuary',
    position: { lat: 6.010, lng: 80.250 },
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop',
    alt: 'Protected coral sanctuary at Unawatuna',
    rating: 4.7,
    depth: '5-20m',
    visibility: '10-25m',
    experience: 'Beginner to Intermediate',
    highlights: ['Protected Sanctuary', 'Juvenile Fish', 'Night Diving'],
    description: 'Protected marine sanctuary perfect for beginners with shallow reefs and abundant juvenile marine life.',
    phone: '+94 77 456 7890',
    learnMoreUrl: 'https://example.com/unawatuna-diving'
  },
  {
    id: 5,
    name: 'Hikkaduwa Marine Park',
    position: { lat: 6.137, lng: 80.101 },
    image: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400&h=300&fit=crop',
    alt: 'Marine park diving at Hikkaduwa',
    rating: 4.5,
    depth: '3-18m',
    visibility: '8-20m',
    experience: 'All Levels',
    highlights: ['Marine Park', 'Glass Bottom Boats', 'Snorkeling'],
    description: 'Famous marine national park with easy access diving and snorkeling for all skill levels.',
    phone: '+94 77 567 8901',
    learnMoreUrl: 'https://example.com/hikkaduwa-diving'
  }
];

// Improved distance calculation using Haversine formula
function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

// Enhanced map component with better click handling
function SimpleMap({ userLocation, divingLocations, selectedSpotId, onSpotSelect }) {
  const canvasRef = useRef(null);
  const [mapBounds, setMapBounds] = useState(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !userLocation) return;
    
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    
    // Set canvas size with proper pixel ratio
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    
    // Create realistic map bounds with proper padding
    const allLats = [userLocation.lat, ...divingLocations.map(loc => loc.position.lat)];
    const allLngs = [userLocation.lng, ...divingLocations.map(loc => loc.position.lng)];
    
    // Calculate bounds with increased padding for better visibility
    const padding = 0.08;
    const minLat = Math.min(...allLats) - padding;
    const maxLat = Math.max(...allLats) + padding;
    const minLng = Math.min(...allLngs) - padding;
    const maxLng = Math.max(...allLngs) + padding;
    
    // Store bounds for click handling
    setMapBounds({ minLat, maxLat, minLng, maxLng, width: rect.width, height: rect.height });
    
    // Convert lat/lng to canvas coordinates
    const latToY = (lat) => rect.height - ((lat - minLat) / (maxLat - minLat)) * rect.height;
    const lngToX = (lng) => ((lng - minLng) / (maxLng - minLng)) * rect.width;
    
    // Draw ocean background with enhanced gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, rect.height);
    gradient.addColorStop(0, '#87CEEB');
    gradient.addColorStop(0.5, '#4682B4');
    gradient.addColorStop(1, '#1e3a8a');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, rect.width, rect.height);
    
    // Draw coastline approximation for Sri Lanka southern coast
    ctx.strokeStyle = '#8B4513';
    ctx.lineWidth = 4;
    ctx.beginPath();
    const coastPoints = [
      { lat: maxLat - 0.015, lng: minLng },
      { lat: maxLat - 0.025, lng: minLng + (maxLng - minLng) * 0.2 },
      { lat: maxLat - 0.02, lng: minLng + (maxLng - minLng) * 0.5 },
      { lat: maxLat - 0.018, lng: minLng + (maxLng - minLng) * 0.8 },
      { lat: maxLat - 0.015, lng: maxLng }
    ];
    
    coastPoints.forEach((point, index) => {
      const x = lngToX(point.lng);
      const y = latToY(point.lat);
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();
    
    // Fill land area
    ctx.fillStyle = '#22c55e';
    ctx.fill();
    
    // Draw user location
    const userX = lngToX(userLocation.lng);
    const userY = latToY(userLocation.lat);
    
    // Enhanced distance circles
    const distanceCircles = [5, 10, 15, 25];
    distanceCircles.forEach((distKm, index) => {
      const kmToDegrees = distKm / 111.32; // More accurate conversion
      const radiusLat = kmToDegrees;
      const radiusLng = kmToDegrees / Math.cos(userLocation.lat * Math.PI / 180);
      
      const radiusX = (radiusLng / (maxLng - minLng)) * rect.width;
      const radiusY = (radiusLat / (maxLat - minLat)) * rect.height;
      const avgRadius = (radiusX + radiusY) / 2;
      
      ctx.strokeStyle = `rgba(59, 130, 246, ${0.4 - index * 0.08})`;
      ctx.lineWidth = 2;
      ctx.setLineDash([10, 5]);
      ctx.beginPath();
      ctx.arc(userX, userY, avgRadius, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.setLineDash([]);
      
      // Distance labels with better positioning
      ctx.fillStyle = `rgba(59, 130, 246, 0.9)`;
      ctx.font = 'bold 11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillStyle = '#ffffff';
      ctx.fillText(`${distKm}km`, userX + avgRadius * 0.7, userY - avgRadius * 0.7);
    });
    
    // Enhanced user location marker
    const pulseRadius = 15 + Math.sin(Date.now() / 400) * 5;
    
    // Animated pulse effect
    ctx.fillStyle = 'rgba(16, 185, 129, 0.4)';
    ctx.beginPath();
    ctx.arc(userX, userY, pulseRadius, 0, 2 * Math.PI);
    ctx.fill();
    
    // Main user marker
    ctx.fillStyle = '#10b981';
    ctx.beginPath();
    ctx.arc(userX, userY, 12, 0, 2 * Math.PI);
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3;
    ctx.stroke();
    
    // User location label
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 14px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('📍', userX, userY + 5);
    
    // Your location text
    ctx.fillStyle = '#1f2937';
    ctx.font = 'bold 12px sans-serif';
    ctx.fillText('Your Location', userX, userY + 30);
    
    // Draw diving locations with improved styling
    divingLocations.forEach(location => {
      const x = lngToX(location.position.lng);
      const y = latToY(location.position.lat);
      const isSelected = location.id === selectedSpotId;
      
      // Calculate distance for display
      const distance = getDistance(
        userLocation.lat, userLocation.lng,
        location.position.lat, location.position.lng
      );
      
      // Enhanced marker sizing
      const baseSize = 14;
      const markerSize = isSelected ? baseSize + 6 : baseSize;
      
      // Draw connection line for selected spot
      if (isSelected) {
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 4;
        ctx.setLineDash([12, 6]);
        ctx.beginPath();
        ctx.moveTo(userX, userY);
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.setLineDash([]);
        
        // Enhanced distance label
        const midX = (userX + x) / 2;
        const midY = (userY + y) / 2;
        
        // Background for distance label
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.roundRect(midX - 35, midY - 12, 70, 24, 12);
        ctx.fill();
        
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(`${distance.toFixed(1)} km`, midX, midY + 4);
      }
      
      // Enhanced diving location marker
      ctx.fillStyle = isSelected ? '#ef4444' : '#0ea5e9';
      ctx.beginPath();
      ctx.arc(x, y, markerSize, 0, 2 * Math.PI);
      ctx.fill();
      
      // Outer ring for better visibility
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 3;
      ctx.stroke();
      
      // Inner ring
      ctx.strokeStyle = isSelected ? '#dc2626' : '#0284c7';
      ctx.lineWidth = 1;
      ctx.stroke();
      
      // Diving icon
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 16px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('🤿', x, y + 6);
      
      // Location name with better styling
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(x - 60, y - markerSize - 35, 120, 20);
      ctx.strokeStyle = '#1f2937';
      ctx.lineWidth = 1;
      ctx.strokeRect(x - 60, y - markerSize - 35, 120, 20);
      
      ctx.fillStyle = '#1f2937';
      ctx.font = 'bold 11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(location.name, x, y - markerSize - 22);
      
      // Distance info
      ctx.fillStyle = '#6b7280';
      ctx.font = '10px sans-serif';
      ctx.fillText(`${distance.toFixed(1)} km away`, x, y - markerSize - 8);
    });
    
    // Enhanced compass
    const compassX = rect.width - 50;
    const compassY = 50;
    
    // Compass background
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.beginPath();
    ctx.arc(compassX, compassY, 30, 0, 2 * Math.PI);
    ctx.fill();
    
    ctx.strokeStyle = '#374151';
    ctx.lineWidth = 3;
    ctx.stroke();
    
    // North arrow
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.moveTo(compassX, compassY - 20);
    ctx.lineTo(compassX - 5, compassY - 10);
    ctx.lineTo(compassX + 5, compassY - 10);
    ctx.closePath();
    ctx.fill();
    
    ctx.fillStyle = '#374151';
    ctx.font = 'bold 12px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('N', compassX, compassY + 25);
    
    // Enhanced legend
    ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
    ctx.fillRect(15, 15, 220, 100);
    ctx.strokeStyle = '#d1d5db';
    ctx.lineWidth = 2;
    ctx.strokeRect(15, 15, 220, 100);
    
    ctx.fillStyle = '#1f2937';
    ctx.font = 'bold 14px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('Map Legend', 25, 35);
    
    ctx.font = '12px sans-serif';
    ctx.fillText('📍 Your Current Location', 25, 55);
    ctx.fillText('🤿 Diving Sites', 25, 75);
    ctx.fillText('--- Distance to Selected Site', 25, 95);
    
    // Map scale
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.font = 'bold 11px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('Distance circles: 5km, 10km, 15km, 25km', 15, rect.height - 15);
    
  }, [userLocation, divingLocations, selectedSpotId]);
  
  const handleMapClick = (e) => {
    if (!userLocation || !mapBounds) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    
    // Convert click coordinates to lat/lng
    const { minLat, maxLat, minLng, maxLng, width, height } = mapBounds;
    
    // Check if click is near any diving location (improved detection)
    let clickedLocation = null;
    let minDistance = Infinity;
    
    divingLocations.forEach(location => {
      const locX = ((location.position.lng - minLng) / (maxLng - minLng)) * width;
      const locY = height - ((location.position.lat - minLat) / (maxLat - minLat)) * height;
      
      const distance = Math.sqrt((clickX - locX) ** 2 + (clickY - locY) ** 2);
      
      // Increased click radius for better usability
      if (distance < 35 && distance < minDistance) {
        minDistance = distance;
        clickedLocation = location;
      }
    });
    
    if (clickedLocation) {
      onSpotSelect(clickedLocation);
    }
  };
  
  return (
    <canvas 
      ref={canvasRef}
      onClick={handleMapClick}
      style={{ 
        width: '100%', 
        height: '100%', 
        borderRadius: '20px',
        cursor: 'pointer',
        boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
        border: '2px solid #e5e7eb'
      }}
    />
  );
}

export default function MapViewPage() {
  const [userLocation, setUserLocation] = useState(null);
  const [selectedSpotId, setSelectedSpotId] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [locationStatus, setLocationStatus] = useState('loading');

  // Get user location on mount
  useEffect(() => {
    setLocationStatus('loading');
    
    if (!navigator.geolocation) {
      setUserLocation({ lat: 5.950, lng: 80.400 });
      setLocationStatus('fallback');
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setLocationStatus('success');
      },
      (error) => {
        console.log('Location error:', error);
        setUserLocation({ lat: 5.950, lng: 80.400 });
        setLocationStatus('fallback');
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  }, []);

  // Calculate nearest dive site with improved accuracy
  const nearestSpot = userLocation && divingLocations.reduce((nearest, spot) => {
    const dist = getDistance(
      userLocation.lat,
      userLocation.lng,
      spot.position.lat,
      spot.position.lng
    );
    if (!nearest || dist < nearest.distance) {
      return { spot, distance: dist };
    }
    return nearest;
  }, null);

  // Auto-select nearest spot
  useEffect(() => {
    if (nearestSpot && !selectedSpotId) {
      setSelectedSpotId(nearestSpot.spot.id);
    }
  }, [nearestSpot, selectedSpotId]);

  const selectedSpot = divingLocations.find(spot => spot.id === selectedSpotId);
  const distanceToSelected = selectedSpot && userLocation ? 
    getDistance(userLocation.lat, userLocation.lng, selectedSpot.position.lat, selectedSpot.position.lng) : 0;

  const handleSpotClick = (spot) => {
    setSelectedSpotId(spot.id);
    setShowDetails(true);
  };

  if (!userLocation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Getting your location...</p>
          <p className="text-gray-500 text-sm mt-2">
            {locationStatus === 'loading' ? 'Please allow location access' : 'Using default location'}
          </p>
        </div>
      </div>
    );
  }



  return (
    <div className="app">


      <main className="main-container">
        <div className="map-section">
          <div className="map-header">
            <h1>Sri Lankan Diving Spots</h1>
            <div className="location-info">
              <Navigation className="icon" />
              <span>Your location detected</span>
            </div>
          </div>
          
          <div className="map-container">
            {userLocation ? (
              <SimpleMap 
                userLocation={userLocation}
                divingLocations={divingLocations}
                selectedSpotId={selectedSpotId}
                onSpotSelect={handleSpotClick}
              />
            ) : (
              <div className="loading">
                <Waves className="loading-icon" />
                <p>Finding your location...</p>
              </div>
            )}
          </div>

          {selectedSpot && (
            <div className="quick-info">
              <div className="quick-info-content">
                <h3>{selectedSpot.name}</h3>
                <div className="quick-stats">
                  <span className="distance">{distanceToSelected.toFixed(1)}km away</span>
                  <span className="rating">
                    <Star className="star-icon" />
                    {selectedSpot.rating}
                  </span>
                </div>
              </div>
              <button 
                className="details-btn"
                onClick={() => setShowDetails(true)}
              >
                View Details
              </button>
            </div>
          )}
        </div>

        <aside className="sidebar">
          <div className="sidebar-header">
            <h2>Dive Sites Near You</h2>
            <div className="nearest-badge">
              <MapPin className="icon" />
              <span>{nearestSpot ? `${nearestSpot.distance.toFixed(1)}km to nearest` : 'Loading...'}</span>
            </div>
          </div>

          <div className="dive-spots-list">
            {divingLocations.map((spot) => {
              const isNearest = nearestSpot && spot.id === nearestSpot.spot.id;
              const isSelected = spot.id === selectedSpotId;
              const distance = userLocation ? 
                getDistance(userLocation.lat, userLocation.lng, spot.position.lat, spot.position.lng) : 0;
              
              return (
                <div
                  key={spot.id}
                  className={`dive-spot-card ${isSelected ? 'selected' : ''} ${isNearest ? 'nearest' : ''}`}
                  onClick={() => handleSpotClick(spot)}
                >
                  <div className="spot-image">
                    <img src={spot.image} alt={spot.alt} />
                    {isNearest && <div className="nearest-indicator">Nearest</div>}
                  </div>
                  
                  <div className="spot-info">
                    <h3>{spot.name}</h3>
                    <div className="spot-meta">
                      <span className="rating">
                        <Star className="star-icon" />
                        {spot.rating}
                      </span>
                      <span className="distance">{distance.toFixed(1)}km</span>
                    </div>
                    <div className="spot-details">
                      <span className="depth">Depth: {spot.depth}</span>
                      <span className="experience">{spot.experience}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </aside>
      </main>

      {/* Detailed Modal */}
      {showDetails && selectedSpot && (
        <div className="modal-overlay" onClick={() => setShowDetails(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setShowDetails(false)}>×</button>
            
            <div className="modal-header">
              <img src={selectedSpot.image} alt={selectedSpot.alt} className="modal-image" />
              <div className="modal-info">
                <h2>{selectedSpot.name}</h2>
                <div className="modal-meta">
                  <span className="rating">
                    <Star className="star-icon" />
                    {selectedSpot.rating} Rating
                  </span>
                  <span className="distance">
                    <MapPin className="icon" />
                    {distanceToSelected.toFixed(1)}km away
                  </span>
                </div>
              </div>
            </div>

            <div className="modal-body">
              <p className="description">{selectedSpot.description}</p>
              
              <div className="details-grid">
                <div className="detail-item">
                  <Fish className="icon" />
                  <div>
                    <strong>Depth Range</strong>
                    <span>{selectedSpot.depth}</span>
                  </div>
                </div>
                
                <div className="detail-item">
                  <Camera className="icon" />
                  <div>
                    <strong>Visibility</strong>
                    <span>{selectedSpot.visibility}</span>
                  </div>
                </div>
                
                <div className="detail-item">
                  <Users className="icon" />
                  <div>
                    <strong>Experience Level</strong>
                    <span>{selectedSpot.experience}</span>
                  </div>
                </div>
              </div>

              <div className="highlights">
                <h3>Highlights</h3>
                <div className="highlight-tags">
                  {selectedSpot.highlights.map((highlight, index) => (
                    <span key={index} className="highlight-tag">{highlight}</span>
                  ))}
                </div>
              </div>

              <div className="modal-actions">
                <button 
                  className="learn-more-btn"
                  onClick={() => window.open(selectedSpot.learnMoreUrl, '_blank')}
                >
                  Learn More
                </button>
                <button 
                  className="contact-btn"
                  onClick={() => window.open(`tel:${selectedSpot.phone}`)}
                >
                  📞 {selectedSpot.phone}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}