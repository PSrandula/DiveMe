import React, { useState, useEffect } from "react";
import axios from "axios";

const EnhancedActiveBookingPage = () => {
  const [bookings, setBookings] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [filterStatus, setFilterStatus] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const loadBookings = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("diveme_user"));
        if (!user || !user._id) {
          console.error("User not found in localStorage");
          return;
        }
        const userId = user._id;
        const res = await axios.get(
          `http://localhost:5000/api/bookings/user/${userId}`
        );
        const formatted = res.data.map((b) => ({
          id: b._id,
          client: `${b.personalDetails.firstName} ${b.personalDetails.lastName}`,
          date: new Date(b.selectedDate).toLocaleDateString("en-GB"),
          status: b.status || "Pending",
          package: b.packageName,
          participants: b.participants,
          amount: b.totalAmount,
          phone: b.personalDetails.phone,
          email: b.personalDetails.email,
          experience: b.personalDetails.experience,
          medicalConditions: b.personalDetails.medicalConditions,
          specialRequests: b.specialRequests,
        }));
        setBookings(formatted);
      } catch (err) {
        console.error("Failed to fetch bookings", err);
      }
    };

    const handleNewBooking = (event) => {
      const newBooking = event.detail;
      const bookingId = newBooking.id || Date.now();

      const formattedBooking = {
        id: bookingId,
        client: `${newBooking.personalDetails.firstName} ${newBooking.personalDetails.lastName}`,
        date: new Date(newBooking.selectedDate).toLocaleDateString("en-GB"),
        status: "Pending",
        package: newBooking.packageName,
        participants: newBooking.participants,
        amount: newBooking.totalAmount,
        phone: newBooking.personalDetails.phone,
        email: newBooking.personalDetails.email,
        experience: newBooking.personalDetails.experience,
        medicalConditions: newBooking.personalDetails.medicalConditions,
        specialRequests: newBooking.specialRequests,
      };

      setBookings((prev) => [formattedBooking, ...prev]);
      setNotifications((prev) => [
        `New booking #${bookingId} from ${formattedBooking.client}`,
        ...prev.slice(0, 4),
      ]);
    };

    const checkStored = () => {
      const stored = JSON.parse(
        localStorage.getItem("completedBookings") || "[]"
      );
      if (stored.length > 0) {
        const newOnes = stored.map((booking) => ({
          id: booking.id,
          client: `${booking.personalDetails.firstName} ${booking.personalDetails.lastName}`,
          date: new Date(booking.selectedDate).toLocaleDateString("en-GB"),
          status: "Pending",
          package: booking.packageName,
          participants: booking.participants,
          amount: booking.totalAmount,
          phone: booking.personalDetails.phone,
          email: booking.personalDetails.email,
          experience: booking.personalDetails.experience,
          medicalConditions: booking.personalDetails.medicalConditions,
          specialRequests: booking.specialRequests,
        }));

        setBookings((prev) => [...newOnes, ...prev]);
        setNotifications((prev) => [
          ...stored.map(
            (b) =>
              `New booking #${b.id} from ${b.personalDetails.firstName} ${b.personalDetails.lastName}`
          ),
          ...prev,
        ]);

        localStorage.removeItem("completedBookings");
      }
    };

    loadBookings();
    checkStored();
    window.addEventListener("newBooking", handleNewBooking);
    const interval = setInterval(checkStored, 1000);

    return () => {
      window.removeEventListener("newBooking", handleNewBooking);
      clearInterval(interval);
    };
  }, []);

  const updateBookingStatus = async (bookingId, newStatus) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: newStatus } : b))
    );

    const booking = bookings.find((b) => b.id === bookingId);
    if (booking) {
      setNotifications((prev) => [
        `Booking #${bookingId} status updated to ${newStatus}`,
        ...prev.slice(0, 4),
      ]);
      try {
        await axios.put(
          `http://localhost:5000/api/bookings/${bookingId}/status`,
          { status: newStatus }
        );
      } catch (err) {
        console.error("Failed to update status on backend", err);
      }
    }
  };
  // Filter bookings based on status and search
  const filteredBookings = bookings.filter((booking) => {
    const matchesStatus =
      filterStatus === "All" || booking.status === filterStatus;
    const matchesSearch =
      booking.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.id.toString().includes(searchTerm);
    return matchesStatus && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "Confirmed":
        return "#10b981";
      case "Pending":
        return "#f59e0b";
      case "Cancelled":
        return "#ef4444";
      default:
        return "#6b7280";
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case "Confirmed":
        return "#d1fae5";
      case "Pending":
        return "#fef3c7";
      case "Cancelled":
        return "#fee2e2";
      default:
        return "#f3f4f6";
    }
  };

  const getTotalStats = () => {
    const confirmed = bookings.filter((b) => b.status === "Confirmed").length;
    const pending = bookings.filter((b) => b.status === "Pending").length;
    const totalRevenue = bookings
      .filter((b) => b.status === "Confirmed")
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
            {["All", "Pending", "Confirmed", "Cancelled"].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                style={{
                  ...styles.filterButton,
                  ...(filterStatus === status ? styles.filterButtonActive : {}),
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
              <h2 style={styles.sectionTitle}>
                Bookings ({filteredBookings.length})
              </h2>
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
                          color: getStatusColor(booking.status),
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
                      <span style={styles.detailValue}>
                        {booking.participants}
                      </span>
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
                    <div style={styles.metricValue}>
                      {stats.confirmed}/{stats.total}
                    </div>
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
        <div
          style={styles.modalOverlay}
          onClick={() => setSelectedBooking(null)}
        >
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
                <p>
                  <strong>Name:</strong> {selectedBooking.client}
                </p>
                <p>
                  <strong>Email:</strong> {selectedBooking.email}
                </p>
                <p>
                  <strong>Phone:</strong> {selectedBooking.phone}
                </p>
                {selectedBooking.experience && (
                  <p>
                    <strong>Experience:</strong> {selectedBooking.experience}
                  </p>
                )}
              </div>

              <div style={styles.modalSection}>
                <h4>Booking Information</h4>
                <p>
                  <strong>Package:</strong> {selectedBooking.package}
                </p>
                <p>
                  <strong>Date:</strong> {selectedBooking.date}
                </p>
                <p>
                  <strong>Participants:</strong> {selectedBooking.participants}
                </p>
                <p>
                  <strong>Amount:</strong> ${selectedBooking.amount}
                </p>
                <p>
                  <strong>Status:</strong>
                  <span
                    style={{
                      ...styles.statusBadge,
                      backgroundColor: getStatusBg(selectedBooking.status),
                      color: getStatusColor(selectedBooking.status),
                      marginLeft: "8px",
                    }}
                  >
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

const styles = {
  container: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    backgroundColor: "#f8fafc",
    minHeight: "100vh",
    color: "#1e293b",
    paddingTop: "5rem",
  },
  header: {
    background: "linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)",
    color: "white",
    padding: "2rem",
  },
  headerContent: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "2rem",
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: "700",
    margin: "0 0 0.5rem 0",
  },
  subtitle: {
    fontSize: "1.1rem",
    opacity: 0.9,
    margin: 0,
  },
  statsOverview: {
    display: "flex",
    gap: "2rem",
  },
  statItem: {
    textAlign: "center",
  },
  statNumber: {
    display: "block",
    fontSize: "2rem",
    fontWeight: "700",
  },
  statLabel: {
    fontSize: "0.9rem",
    opacity: 0.8,
  },
  mainContent: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "2rem",
  },
  controlsBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "2rem",
    gap: "1rem",
    flexWrap: "wrap",
  },
  searchBox: {
    flex: 1,
    maxWidth: "400px",
  },
  searchInput: {
    width: "100%",
    padding: "0.75rem 1rem",
    border: "2px solid #e2e8f0",
    borderRadius: "10px",
    fontSize: "1rem",
    boxSizing: "border-box",
  },
  filterButtons: {
    display: "flex",
    gap: "0.5rem",
  },
  filterButton: {
    padding: "0.5rem 1rem",
    border: "2px solid #e2e8f0",
    borderRadius: "8px",
    backgroundColor: "white",
    cursor: "pointer",
    fontWeight: "500",
    transition: "all 0.2s",
  },
  filterButtonActive: {
    backgroundColor: "#3b82f6",
    color: "white",
    borderColor: "#3b82f6",
  },
  contentLayout: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: "2rem",
  },
  bookingsSection: {
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "1.5rem",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
  },
  sectionHeader: {
    marginBottom: "1.5rem",
  },
  sectionTitle: {
    fontSize: "1.5rem",
    fontWeight: "600",
    margin: 0,
  },
  bookingsList: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  bookingCard: {
    border: "2px solid #e2e8f0",
    borderRadius: "12px",
    padding: "1.5rem",
    cursor: "pointer",
    transition: "all 0.2s",
    backgroundColor: "white",
  },
  bookingHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "1rem",
  },
  bookingId: {
    fontSize: "1.2rem",
    fontWeight: "700",
    margin: "0 0 0.25rem 0",
    color: "#3b82f6",
  },
  clientName: {
    fontSize: "1rem",
    fontWeight: "500",
    margin: 0,
    color: "#4b5563",
  },
  statusContainer: {
    display: "flex",
    alignItems: "center",
  },
  statusBadge: {
    padding: "0.25rem 0.75rem",
    borderRadius: "20px",
    fontSize: "0.8rem",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
  bookingDetails: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "0.5rem",
    marginBottom: "1rem",
  },
  detailRow: {
    display: "flex",
    justifyContent: "space-between",
  },
  detailLabel: {
    fontSize: "0.9rem",
    color: "#6b7280",
    fontWeight: "500",
  },
  detailValue: {
    fontSize: "0.9rem",
    fontWeight: "600",
  },
  amountValue: {
    fontSize: "0.9rem",
    fontWeight: "700",
    color: "#059669",
  },
  actionButtons: {
    display: "flex",
    gap: "0.5rem",
    marginTop: "1rem",
  },
  confirmButton: {
    padding: "0.5rem 1rem",
    backgroundColor: "#10b981",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "0.9rem",
    transition: "background-color 0.2s",
  },
  cancelButton: {
    padding: "0.5rem 1rem",
    backgroundColor: "#ef4444",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "0.9rem",
    transition: "background-color 0.2s",
  },
  sidebar: {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
  },
  sidebarCard: {
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "1.5rem",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
  },
  sidebarTitle: {
    fontSize: "1.2rem",
    fontWeight: "600",
    margin: "0 0 1rem 0",
  },
  metricsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  metricItem: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },
  metricIcon: {
    fontSize: "1.5rem",
  },
  metricValue: {
    fontSize: "1.1rem",
    fontWeight: "700",
    color: "#1e293b",
  },
  metricLabel: {
    fontSize: "0.8rem",
    color: "#6b7280",
  },
  notificationsList: {
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
  },
  notificationItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: "0.75rem",
  },
  notificationDot: {
    width: "8px",
    height: "8px",
    backgroundColor: "#3b82f6",
    borderRadius: "50%",
    marginTop: "0.25rem",
    flexShrink: 0,
  },
  notificationText: {
    fontSize: "0.9rem",
    margin: 0,
    lineHeight: "1.4",
    color: "#4b5563",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  modal: {
    backgroundColor: "white",
    borderRadius: "12px",
    width: "90%",
    maxWidth: "600px",
    maxHeight: "80vh",
    overflow: "hidden",
    boxShadow: "0 25px 50px rgba(0, 0, 0, 0.25)",
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1.5rem",
    borderBottom: "1px solid #e2e8f0",
    backgroundColor: "#f8fafc",
  },
  closeButton: {
    background: "none",
    border: "none",
    fontSize: "1.5rem",
    cursor: "pointer",
    color: "#6b7280",
    padding: "0.5rem",
  },
  modalContent: {
    padding: "1.5rem",
    overflowY: "auto",
    maxHeight: "calc(80vh - 120px)",
  },
  modalSection: {
    marginBottom: "1.5rem",
  },
  modalActions: {
    display: "flex",
    gap: "1rem",
    marginTop: "2rem",
    paddingTop: "1rem",
    borderTop: "1px solid #e2e8f0",
  },
};

export default EnhancedActiveBookingPage;
