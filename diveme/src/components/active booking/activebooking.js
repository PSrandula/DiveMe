import React, { useState, useEffect } from "react";

const EnhancedActiveBookingPage = () => {
  const [bookings, setBookings] = useState([
    {
      id: 12345,
      client: "D.R.Koralage",
      date: "10.06.2025",
      status: "Confirmed",
      package: "Turtle Reef Safari",
      participants: 2,
      amount: 440,
      phone: "+94771234567",
      email: "dr.koralage@email.com"
    },
    {
      id: 12346,
      client: "M.C.Lakshan",
      date: "10.06.2025",
      status: "Pending",
      package: "Coral Garden Discovery",
      participants: 1,
      amount: 180,
      phone: "+94777654321",
      email: "lakshan@email.com"
    },
    {
      id: 12347,
      client: "Yukthi Vithanage",
      date: "10.06.2025",
      status: "Cancelled",
      package: "Deep Sea Adventure",
      participants: 3,
      amount: 660,
      phone: "+94771112233",
      email: "yukthi@email.com"
    },
  ]);

  const [notifications, setNotifications] = useState([
    "New booking for P.Wijesinghe for 15.06.2025",
    "Customer feedback received from Kasun Nilaweera",
    "Booking #12345 has been confirmed",
  ]);

  const [selectedBooking, setSelectedBooking] = useState(null);
  const [filterStatus, setFilterStatus] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // Listen for new bookings from the booking system
  useEffect(() => {
    const handleNewBooking = (event) => {
      const newBooking = event.detail;
      const bookingId = Date.now();
      
      const formattedBooking = {
        id: bookingId,
        client: `${newBooking.personalDetails.firstName} ${newBooking.personalDetails.lastName}`,
        date: new Date(newBooking.selectedDate).toLocaleDateString('en-GB'),
        status: "Pending",
        package: newBooking.packageName,
        participants: newBooking.participants,
        amount: newBooking.totalAmount,
        phone: newBooking.personalDetails.phone,
        email: newBooking.personalDetails.email,
        experience: newBooking.personalDetails.experience,
        medicalConditions: newBooking.personalDetails.medicalConditions,
        specialRequests: newBooking.specialRequests
      };

      setBookings(prev => [formattedBooking, ...prev]);
      setNotifications(prev => [
        `New booking #${bookingId} from ${formattedBooking.client}`,
        ...prev.slice(0, 4)
      ]);
    };

    // Check for stored bookings on component mount
    const checkStoredBookings = () => {
      const storedBookings = JSON.parse(window.localStorage.getItem('completedBookings') || '[]');
      if (storedBookings.length > 0) {
        // Add stored bookings to current bookings
        const newBookings = storedBookings.map(booking => ({
          id: booking.id,
          client: `${booking.personalDetails.firstName} ${booking.personalDetails.lastName}`,
          date: new Date(booking.selectedDate).toLocaleDateString('en-GB'),
          status: "Pending",
          package: booking.packageName,
          participants: booking.participants,
          amount: booking.totalAmount,
          phone: booking.personalDetails.phone,
          email: booking.personalDetails.email,
          experience: booking.personalDetails.experience,
          medicalConditions: booking.personalDetails.medicalConditions,
          specialRequests: booking.specialRequests
        }));
        
        setBookings(prev => [...newBookings, ...prev]);
        setNotifications(prev => [
          ...storedBookings.map(booking => `New booking #${booking.id} from ${booking.personalDetails.firstName} ${booking.personalDetails.lastName}`),
          ...prev
        ]);
        
        // Clear stored bookings after processing
        window.localStorage.removeItem('completedBookings');
      }
    };

    // Check immediately and then listen for events
    checkStoredBookings();
    window.addEventListener('newBooking', handleNewBooking);
    
    // Also check periodically for new stored bookings
    const intervalId = setInterval(checkStoredBookings, 1000);
    
    // Cleanup
    return () => {
      window.removeEventListener('newBooking', handleNewBooking);
      clearInterval(intervalId);
    };
  }, []);

  // Status update handler
  const updateBookingStatus = (bookingId, newStatus) => {
    setBookings(prev => prev.map(booking => 
      booking.id === bookingId 
        ? { ...booking, status: newStatus }
        : booking
    ));
    
    const booking = bookings.find(b => b.id === bookingId);
    if (booking) {
      setNotifications(prev => [
        `Booking #${bookingId} status updated to ${newStatus}`,
        ...prev.slice(0, 4)
      ]);
    }
  };

  // Filter bookings based on status and search
  const filteredBookings = bookings.filter(booking => {
    const matchesStatus = filterStatus === "All" || booking.status === filterStatus;
    const matchesSearch = booking.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.id.toString().includes(searchTerm);
    return matchesStatus && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "Confirmed": return "#10b981";
      case "Pending": return "#f59e0b";
      case "Cancelled": return "#ef4444";
      default: return "#6b7280";
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case "Confirmed": return "#d1fae5";
      case "Pending": return "#fef3c7";
      case "Cancelled": return "#fee2e2";
      default: return "#f3f4f6";
    }
  };

  const getTotalStats = () => {
    const confirmed = bookings.filter(b => b.status === "Confirmed").length;
    const pending = bookings.filter(b => b.status === "Pending").length;
    const totalRevenue = bookings
      .filter(b => b.status === "Confirmed")
      .reduce((sum, b) => sum + b.amount, 0);
    
    return { confirmed, pending, totalRevenue, total: bookings.length };
  };

  const stats = getTotalStats();

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <div>
            <h1 style={styles.title}>Active Bookings Dashboard</h1>
            <p style={styles.subtitle}>Manage and track all dive bookings</p>
          </div>
          <div style={styles.statsOverview}>
            <div style={styles.statItem}>
              <span style={styles.statNumber}>{stats.total}</span>
              <span style={styles.statLabel}>Total</span>
            </div>
            <div style={styles.statItem}>
              <span style={styles.statNumber}>{stats.confirmed}</span>
              <span style={styles.statLabel}>Confirmed</span>
            </div>
            <div style={styles.statItem}>
              <span style={styles.statNumber}>{stats.pending}</span>
              <span style={styles.statLabel}>Pending</span>
            </div>
            <div style={styles.statItem}>
              <span style={styles.statNumber}>${stats.totalRevenue}</span>
              <span style={styles.statLabel}>Revenue</span>
            </div>
          </div>
        </div>
      </header>

      <div style={styles.mainContent}>
        {/* Filters and Search */}
        <div style={styles.controlsBar}>
          <div style={styles.searchBox}>
            <input
              type="text"
              placeholder="Search by name or booking ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={styles.searchInput}
            />
          </div>
          <div style={styles.filterButtons}>
            {["All", "Pending", "Confirmed", "Cancelled"].map(status => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                style={{
                  ...styles.filterButton,
                  ...(filterStatus === status ? styles.filterButtonActive : {})
                }}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        <div style={styles.contentLayout}>
          {/* Bookings List */}
          <section style={styles.bookingsSection}>
            <div style={styles.sectionHeader}>
              <h2 style={styles.sectionTitle}>Bookings ({filteredBookings.length})</h2>
            </div>
            
            <div style={styles.bookingsList}>
              {filteredBookings.map((booking) => (
                <div 
                  key={booking.id} 
                  style={styles.bookingCard}
                  onClick={() => setSelectedBooking(booking)}
                >
                  <div style={styles.bookingHeader}>
                    <div>
                      <h3 style={styles.bookingId}>#{booking.id}</h3>
                      <p style={styles.clientName}>{booking.client}</p>
                    </div>
                    <div style={styles.statusContainer}>
                      <span 
                        style={{
                          ...styles.statusBadge,
                          backgroundColor: getStatusBg(booking.status),
                          color: getStatusColor(booking.status)
                        }}
                      >
                        {booking.status}
                      </span>
                    </div>
                  </div>
                  
                  <div style={styles.bookingDetails}>
                    <div style={styles.detailRow}>
                      <span style={styles.detailLabel}>Package:</span>
                      <span style={styles.detailValue}>{booking.package}</span>
                    </div>
                    <div style={styles.detailRow}>
                      <span style={styles.detailLabel}>Date:</span>
                      <span style={styles.detailValue}>{booking.date}</span>
                    </div>
                    <div style={styles.detailRow}>
                      <span style={styles.detailLabel}>Participants:</span>
                      <span style={styles.detailValue}>{booking.participants}</span>
                    </div>
                    <div style={styles.detailRow}>
                      <span style={styles.detailLabel}>Amount:</span>
                      <span style={styles.amountValue}>${booking.amount}</span>
                    </div>
                  </div>

                  {booking.status === "Pending" && (
                    <div style={styles.actionButtons}>
                      <button 
                        style={styles.confirmButton}
                        onClick={(e) => {
                          e.stopPropagation();
                          updateBookingStatus(booking.id, "Confirmed");
                        }}
                      >
                        Confirm
                      </button>
                      <button 
                        style={styles.cancelButton}
                        onClick={(e) => {
                          e.stopPropagation();
                          updateBookingStatus(booking.id, "Cancelled");
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Sidebar */}
          <aside style={styles.sidebar}>
            {/* Performance Metrics */}
            <div style={styles.sidebarCard}>
              <h3 style={styles.sidebarTitle}>Performance Metrics</h3>
              <div style={styles.metricsContainer}>
                <div style={styles.metricItem}>
                  <div style={styles.metricIcon}>📊</div>
                  <div>
                    <div style={styles.metricValue}>{stats.confirmed}/{stats.total}</div>
                    <div style={styles.metricLabel}>Conversion Rate</div>
                  </div>
                </div>
                <div style={styles.metricItem}>
                  <div style={styles.metricIcon}>💰</div>
                  <div>
                    <div style={styles.metricValue}>${stats.totalRevenue}</div>
                    <div style={styles.metricLabel}>Total Revenue</div>
                  </div>
                </div>
                <div style={styles.metricItem}>
                  <div style={styles.metricIcon}>⏱️</div>
                  <div>
                    <div style={styles.metricValue}>{stats.pending}</div>
                    <div style={styles.metricLabel}>Pending Review</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Notifications */}
            <div style={styles.sidebarCard}>
              <h3 style={styles.sidebarTitle}>Recent Notifications</h3>
              <div style={styles.notificationsList}>
                {notifications.map((note, idx) => (
                  <div key={idx} style={styles.notificationItem}>
                    <div style={styles.notificationDot}></div>
                    <p style={styles.notificationText}>{note}</p>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Booking Detail Modal */}
      {selectedBooking && (
        <div style={styles.modalOverlay} onClick={() => setSelectedBooking(null)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2>Booking Details #{selectedBooking.id}</h2>
              <button 
                style={styles.closeButton}
                onClick={() => setSelectedBooking(null)}
              >
                ✕
              </button>
            </div>
            <div style={styles.modalContent}>
              <div style={styles.modalSection}>
                <h4>Customer Information</h4>
                <p><strong>Name:</strong> {selectedBooking.client}</p>
                <p><strong>Email:</strong> {selectedBooking.email}</p>
                <p><strong>Phone:</strong> {selectedBooking.phone}</p>
                {selectedBooking.experience && (
                  <p><strong>Experience:</strong> {selectedBooking.experience}</p>
                )}
              </div>
              
              <div style={styles.modalSection}>
                <h4>Booking Information</h4>
                <p><strong>Package:</strong> {selectedBooking.package}</p>
                <p><strong>Date:</strong> {selectedBooking.date}</p>
                <p><strong>Participants:</strong> {selectedBooking.participants}</p>
                <p><strong>Amount:</strong> ${selectedBooking.amount}</p>
                <p><strong>Status:</strong> 
                  <span style={{
                    ...styles.statusBadge,
                    backgroundColor: getStatusBg(selectedBooking.status),
                    color: getStatusColor(selectedBooking.status),
                    marginLeft: '8px'
                  }}>
                    {selectedBooking.status}
                  </span>
                </p>
              </div>

              {selectedBooking.medicalConditions && (
                <div style={styles.modalSection}>
                  <h4>Medical Information</h4>
                  <p>{selectedBooking.medicalConditions}</p>
                </div>
              )}

              {selectedBooking.specialRequests && (
                <div style={styles.modalSection}>
                  <h4>Special Requests</h4>
                  <p>{selectedBooking.specialRequests}</p>
                </div>
              )}

              {selectedBooking.status === "Pending" && (
                <div style={styles.modalActions}>
                  <button 
                    style={styles.confirmButton}
                    onClick={() => {
                      updateBookingStatus(selectedBooking.id, "Confirmed");
                      setSelectedBooking(null);
                    }}
                  >
                    Confirm Booking
                  </button>
                  <button 
                    style={styles.cancelButton}
                    onClick={() => {
                      updateBookingStatus(selectedBooking.id, "Cancelled");
                      setSelectedBooking(null);
                    }}
                  >
                    Cancel Booking
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
