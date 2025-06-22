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