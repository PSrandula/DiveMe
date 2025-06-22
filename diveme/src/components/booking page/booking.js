import React, { useState, useEffect } from 'react';

const IntegratedBookingPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    packageId: 0,
    packageName: '',
    packagePrice: 0,
    centerName: '',
    selectedDate: '',
    participants: 1,
    personalDetails: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      medicalConditions: '',
      experience: ''
    },
    specialRequests: '',
    totalAmount: 0
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [bookingReference, setBookingReference] = useState('');

  // Load package data when component mounts
  useEffect(() => {
    const savedBooking = JSON.parse(localStorage.getItem('diveBooking')) || {};
    setBookingData(prev => ({
      ...prev,
      packageId: savedBooking.packageId || 0,
      packageName: savedBooking.packageName || 'Turtle Reef Safari',
      packagePrice: savedBooking.packagePrice || 220,
      centerName: savedBooking.centerName || 'Mirissa Dive Center',
      totalAmount: (savedBooking.packagePrice || 220) * prev.participants
    }));
  }, []);

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setBookingData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        },
        totalAmount: parent === 'participants' ? 
          bookingData.packagePrice * value : 
          prev.totalAmount
      }));
    } else {
      setBookingData(prev => ({
        ...prev,
        [field]: value,
        totalAmount: field === 'participants' ? 
          bookingData.packagePrice * value : 
          prev.totalAmount
      }));
    }
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!bookingData.selectedDate) newErrors.selectedDate = 'Please select a date';
      if (bookingData.participants < 1) newErrors.participants = 'At least 1 participant required';
    }
    
    if (step === 2) {
      if (!bookingData.personalDetails.firstName) newErrors['personalDetails.firstName'] = 'First name is required';
      if (!bookingData.personalDetails.lastName) newErrors['personalDetails.lastName'] = 'Last name is required';
      if (!bookingData.personalDetails.email) newErrors['personalDetails.email'] = 'Email is required';
      if (!bookingData.personalDetails.phone) newErrors['personalDetails.phone'] = 'Phone number is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async () => {
    if (!validateStep(2)) return;
    
    setIsSubmitting(true);
    
    // Generate booking reference
    const reference = `DB${Date.now().toString().slice(-6)}`;
    setBookingReference(reference);
    
    // Simulate API call
    setTimeout(() => {
      // Create booking object with ID
      const completedBooking = {
        ...bookingData,
        id: Date.now(),
        reference: reference,
        submittedAt: new Date().toISOString()
      };
      
      // Store the booking for the dashboard to pick up
      const existingBookings = JSON.parse(localStorage.getItem('completedBookings') || '[]');
      existingBookings.push(completedBooking);
      localStorage.setItem('completedBookings', JSON.stringify(existingBookings));
      
      // Also dispatch custom event for real-time updates
      const event = new CustomEvent('newBooking', {
        detail: completedBooking
      });
      window.dispatchEvent(event);
      
      setIsSubmitting(false);
      setBookingComplete(true);
      
      // Clear the stored booking data after successful submission
      localStorage.removeItem('diveBooking');
      
      // Show success message
      console.log('Booking completed:', completedBooking);
      
    }, 2000);
  };

  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  if (bookingComplete) {
    return (
      <div style={styles.container}>
        <div style={styles.successContainer}>
          <div style={styles.successIcon}>✅</div>
          <h1 style={styles.successTitle}>Booking Confirmed!</h1>
          <div style={styles.successCard}>
            <h3>Booking Details</h3>
            <div style={styles.bookingDetail}>
              <strong>Package:</strong> {bookingData.packageName}
            </div>
            <div style={styles.bookingDetail}>
              <strong>Dive Center:</strong> {bookingData.centerName}
            </div>
            <div style={styles.bookingDetail}>
              <strong>Date:</strong> {new Date(bookingData.selectedDate).toLocaleDateString()}
            </div>
            <div style={styles.bookingDetail}>
              <strong>Participants:</strong> {bookingData.participants}
            </div>
            <div style={styles.bookingDetail}>
              <strong>Total Amount:</strong> ${bookingData.totalAmount}
            </div>
            <div style={styles.bookingDetail}>
              <strong>Booking Reference:</strong> #{bookingReference}
            </div>
          </div>
          <div style={styles.successAlert}>
            <strong>Great news!</strong> Your booking has been automatically added to the provider dashboard and they will be notified immediately.
          </div>
          <p style={styles.successMessage}>
            A confirmation email has been sent to {bookingData.personalDetails.email}. 
            Our team will contact you within 24 hours to confirm the details.
          </p>
          <div style={styles.buttonGroup}>
            <button 
              style={styles.homeButton}
              onClick={() => window.location.href = '/home'}
            >
              Back to Home
            </button>
            <button 
              style={styles.dashboardButton}
              onClick={() => window.location.href = '/activebooking'}
            >
              View in Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

    return (
    <div style={styles.container}>
      <div style={styles.bookingCard}>
        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.title}>Complete Your Booking</h1>
          <div style={styles.progressBar}>
            <div style={styles.progressStep}>
              <div style={{
                ...styles.stepNumber,
                ...(currentStep >= 1 ? styles.stepActive : styles.stepInactive)
              }}>1</div>
              <span style={styles.stepLabel}>Select Date</span>
            </div>
            <div style={styles.progressLine}></div>
            <div style={styles.progressStep}>
              <div style={{
                ...styles.stepNumber,
                ...(currentStep >= 2 ? styles.stepActive : styles.stepInactive)
              }}>2</div>
              <span style={styles.stepLabel}>Personal Details</span>
            </div>
            <div style={styles.progressLine}></div>
            <div style={styles.progressStep}>
              <div style={{
                ...styles.stepNumber,
                ...(currentStep >= 3 ? styles.stepActive : styles.stepInactive)
              }}>3</div>
              <span style={styles.stepLabel}>Confirmation</span>
            </div>
          </div>
        </div>

        {/* Package Summary */}
        <div style={styles.packageSummary}>
          <div style={styles.summaryGrid}>
            <div>
              <h4>{bookingData.packageName}</h4>
              <p>{bookingData.centerName}</p>
            </div>
            <div style={styles.packagePrice}>
              <span style={styles.price}>${bookingData.packagePrice}</span>
              <span style={styles.priceDetail}>per person</span>
            </div>
          </div>
        </div>

        {/* Step Content */}
        <div style={styles.stepContent}>
          {currentStep === 1 && (
            <div>
              <h3>Select Your Dive Date & Participants</h3>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>Preferred Date *</label>
                <input
                  type="date"
                  min={getMinDate()}
                  value={bookingData.selectedDate}
                  onChange={(e) => handleInputChange('selectedDate', e.target.value)}
                  style={{
                    ...styles.input,
                    ...(errors.selectedDate ? styles.inputError : {})
                  }}
                />
                {errors.selectedDate && <span style={styles.errorText}>{errors.selectedDate}</span>}
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Number of Participants *</label>
                <select
                  value={bookingData.participants}
                  onChange={(e) => handleInputChange('participants', parseInt(e.target.value))}
                  style={{
                    ...styles.input,
                    ...(errors.participants ? styles.inputError : {})
                  }}
                >
                  {[1,2,3,4,5,6,7,8].map(num => (
                    <option key={num} value={num}>{num} {num === 1 ? 'Person' : 'People'}</option>
                  ))}
                </select>
                {errors.participants && <span style={styles.errorText}>{errors.participants}</span>}
              </div>

              <div style={styles.priceBreakdown}>
                <div style={styles.breakdownRow}>
                  <span>{bookingData.packageName} ({bookingData.participants} × ${bookingData.packagePrice}):</span>
                  <span>${bookingData.totalAmount}</span>
                </div>
                <div style={styles.totalRow}>
                  <span>Total Amount:</span>
                  <span>${bookingData.totalAmount}</span>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <h3>Personal & Emergency Details</h3>
              
              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>First Name *</label>
                  <input
                    type="text"
                    value={bookingData.personalDetails.firstName}
                    onChange={(e) => handleInputChange('personalDetails.firstName', e.target.value)}
                    style={{
                      ...styles.input,
                      ...(errors['personalDetails.firstName'] ? styles.inputError : {})
                    }}
                  />
                  {errors['personalDetails.firstName'] && <span style={styles.errorText}>{errors['personalDetails.firstName']}</span>}
                </div>
                
                <div style={styles.formGroup}>
                  <label style={styles.label}>Last Name *</label>
                  <input
                    type="text"
                    value={bookingData.personalDetails.lastName}
                    onChange={(e) => handleInputChange('personalDetails.lastName', e.target.value)}
                    style={{
                      ...styles.input,
                      ...(errors['personalDetails.lastName'] ? styles.inputError : {})
                    }}
                  />
                  {errors['personalDetails.lastName'] && <span style={styles.errorText}>{errors['personalDetails.lastName']}</span>}
                </div>
              </div>

              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Email Address *</label>
                  <input
                    type="email"
                    value={bookingData.personalDetails.email}
                    onChange={(e) => handleInputChange('personalDetails.email', e.target.value)}
                    style={{
                      ...styles.input,
                      ...(errors['personalDetails.email'] ? styles.inputError : {})
                    }}
                  />
                  {errors['personalDetails.email'] && <span style={styles.errorText}>{errors['personalDetails.email']}</span>}
                </div>
                
                <div style={styles.formGroup}>
                  <label style={styles.label}>Phone Number *</label>
                  <input
                    type="tel"
                    value={bookingData.personalDetails.phone}
                    onChange={(e) => handleInputChange('personalDetails.phone', e.target.value)}
                    style={{
                      ...styles.input,
                      ...(errors['personalDetails.phone'] ? styles.inputError : {})
                    }}
                  />
                  {errors['personalDetails.phone'] && <span style={styles.errorText}>{errors['personalDetails.phone']}</span>}
                </div>
              </div>

              <h4 style={styles.sectionTitle}>Diving Experience</h4>
              <div style={styles.formRow}>                  
                <div style={styles.formGroup}>
                  <label style={styles.label}>Diving Experience</label>
                  <select
                    value={bookingData.personalDetails.experience}
                    onChange={(e) => handleInputChange('personalDetails.experience', e.target.value)}
                    style={styles.input}
                  >
                    <option value="">Select Experience</option>
                    <option value="none">First Time</option>
                    <option value="beginner">1-10 Dives</option>
                    <option value="intermediate">11-50 Dives</option>
                    <option value="experienced">50+ Dives</option>
                  </select>
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Medical Conditions</label>
                <textarea
                  value={bookingData.personalDetails.medicalConditions}
                  onChange={(e) => handleInputChange('personalDetails.medicalConditions', e.target.value)}
                  style={styles.textarea}
                  placeholder="Any medical conditions we should be aware of..."
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Special Requests</label>
                <textarea
                  value={bookingData.specialRequests}
                  onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                  style={styles.textarea}
                  placeholder="Any special requests or additional information..."
                />
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div style={styles.buttonGroup}>
          {currentStep > 1 && (
            <button
              style={styles.backButton}
              onClick={handlePrevious}
            >
              Previous
            </button>
          )}
          
          {currentStep < 2 ? (
            <button
              style={styles.nextButton}
              onClick={handleNext}
            >
              Next Step
            </button>
          ) : (
            <button
              style={{
                ...styles.nextButton,
                ...(isSubmitting ? styles.buttonDisabled : {})
              }}
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Processing...' : 'Complete Booking'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, sans-serif",
    backgroundColor: '#f8fafc',
    minHeight: '100vh',
    padding: '6rem 2rem 1rem'
  },
  bookingCard: {
    maxWidth: '800px',
    margin: '0 auto',
    backgroundColor: 'white',
    borderRadius: '20px',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden'
  },
  header: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    padding: '2rem',
    textAlign: 'center'
  },
  title: {
    fontSize: '2rem',
    fontWeight: '700',
    marginBottom: '2rem'
  },
  progressBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem'
  },
  progressStep: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.5rem'
  },
  stepNumber: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '600',
    fontSize: '1.1rem'
  },
  stepActive: {
    backgroundColor: 'white',
    color: '#667eea'
  },
  stepInactive: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    color: 'white'
  },
  stepLabel: {
    fontSize: '0.9rem',
    textAlign: 'center'
  },
  progressLine: {
    width: '60px',
    height: '2px',
    backgroundColor: 'rgba(255,255,255,0.3)'
  },
  packageSummary: {
    padding: '1.5rem 2rem',
    backgroundColor: '#f8fafc',
    borderBottom: '1px solid #e2e8f0'
  },
  summaryGrid: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  packagePrice: {
    textAlign: 'right'
  },
  price: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#667eea',
    display: 'block'
  },
  priceDetail: {
    fontSize: '0.9rem',
    color: '#64748b'
  },
  stepContent: {
    padding: '2rem'
  },
  formGroup: {
    marginBottom: '1.5rem'
  },
  formRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
    '@media (max-width: 768px)': {
      gridTemplateColumns: '1fr'
    }
  },
  label: {
    display: 'block',
    fontSize: '0.9rem',
    fontWeight: '600',
    color: '#2d3748',
    marginBottom: '0.5rem'
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    border: '2px solid #e2e8f0',
    borderRadius: '10px',
    fontSize: '1rem',
    transition: 'border-color 0.3s ease',
    boxSizing: 'border-box'
  },
  inputError: {
    borderColor: '#f56565'
  },
  textarea: {
    width: '100%',
    padding: '0.75rem',
    border: '2px solid #e2e8f0',
    borderRadius: '10px',
    fontSize: '1rem',
    minHeight: '80px',
    resize: 'vertical',
    fontFamily: 'inherit',
    transition: 'border-color 0.3s ease',
    boxSizing: 'border-box'
  },
  errorText: {
    color: '#f56565',
    fontSize: '0.8rem',
    marginTop: '0.25rem',
    display: 'block'
  },
  sectionTitle: {
    fontSize: '1.2rem',
    fontWeight: '600',
    color: '#2d3748',
    marginTop: '2rem',
    marginBottom: '1rem',
    borderBottom: '2px solid #e2e8f0',
    paddingBottom: '0.5rem'
  },
  priceBreakdown: {
    backgroundColor: '#f8fafc',
    padding: '1rem',
    borderRadius: '10px',
    marginTop: '1rem'
  },
  breakdownRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '0.5rem',
    color: '#64748b'
  },
  totalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '1.1rem',
    fontWeight: '700',
    color: '#2d3748',
    borderTop: '1px solid #e2e8f0',
    paddingTop: '0.5rem'
  },
  buttonGroup: {
    display: 'flex',
    gap: '1rem',
    padding: '2rem',
    borderTop: '1px solid #e2e8f0',
    justifyContent: 'space-between'
  },
  backButton: {
    padding: '0.75rem 2rem',
    backgroundColor: '#f8fafc',
    color: '#64748b',
    border: '2px solid #e2e8f0',
    borderRadius: '10px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  nextButton: {
    padding: '0.75rem 2rem',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginLeft: 'auto'
  },
  buttonDisabled: {
    opacity: 0.6,
    cursor: 'not-allowed'
  },
  successContainer: {
    maxWidth: '600px',
    margin: '0 auto',
    textAlign: 'center',
    backgroundColor: 'white',
    borderRadius: '20px',
    padding: '3rem',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)'
  },
  successIcon: {
    fontSize: '4rem',
    marginBottom: '1rem'
  },
  successTitle: {
    fontSize: '2.5rem',
    fontWeight: '700',
    color: '#48bb78',
    marginBottom: '2rem'
  },
  successCard: {
    backgroundColor: '#f8fafc',
    padding: '2rem',
    borderRadius: '15px',
    marginBottom: '2rem',
    textAlign: 'left'
  },
  bookingDetail: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0.5rem 0',
    borderBottom: '1px solid #e2e8f0'
  },
  successAlert: {
    backgroundColor: '#d1fae5',
    color: '#065f46',
    padding: '1rem',
    borderRadius: '10px',
    marginBottom: '2rem',
    fontSize: '0.95rem',
    border: '1px solid #a7f3d0'
  },
  successMessage: {
    fontSize: '1.1rem',
    color: '#4a5568',
    lineHeight: '1.6',
    marginBottom: '2rem'
  },
  homeButton: {
    padding: '1rem 2rem',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontWeight: '600',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  dashboardButton: {
    padding: '1rem 2rem',
    backgroundColor: '#10b981',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontWeight: '600',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  }
};
  

export default IntegratedBookingPage;