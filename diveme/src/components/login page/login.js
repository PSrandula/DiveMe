import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import '../register page/register';

const Login = () => {
  // Form state management
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: 'tourist',
    remember: false
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  // Load saved data on component mount
  useEffect(() => {
    loadSavedData();
  }, []);

  // Load remembered email if available
  const loadSavedData = () => {
    const rememberedEmail = localStorage.getItem('diveme_remembered_email');
    if (rememberedEmail) {
      setFormData(prev => ({
        ...prev,
        email: rememberedEmail,
        remember: true
      }));
    }
  };

  // Form handlers
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleUserTypeChange = (userType) => {
    setFormData(prev => ({
      ...prev,
      userType
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    
    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Save data if remember me is checked
  const saveDataIfRemembered = () => {
    if (formData.remember) {
      localStorage.setItem('diveme_remembered_email', formData.email);
    } else {
      localStorage.removeItem('diveme_remembered_email');
    }
  };

  // Simulate login API call
  const simulateLogin = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        saveDataIfRemembered();
        console.log('Login successful:', {
          email: formData.email,
          userType: formData.userType,
          remember: formData.remember
        });
        resolve();
      }, 2000);
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    if (isLoading) return;
    
    // Validate form
    if (!validateForm()) {
      return;
    }
    
    // Start loading
    setIsLoading(true);
    
    try {
      await simulateLogin();
      
      // Show success message
      setTimeout(() => {
        alert(`Welcome to DiveME! You are logged in as a ${formData.userType}.`);
        // In a real app: navigate to dashboard
        // navigate('/dashboard');
      }, 1000);
      
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };
const navigate = useNavigate();

 const handleSignupClick = (e) => {
  e.preventDefault();
  navigate('/register'); 
};


  const handleKeyPress = (e, nextFieldId) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (nextFieldId) {
        document.getElementById(nextFieldId)?.focus();
      } else {
        handleFormSubmit(e);
      }
    }
  };

  return (
    <div className="login-container">
      <div className="main-content">
        {/* Left Side - Logo & Branding */}
        <div className="branding-section">
          <div className="branding-content">
            <div className="logo-section">
              <div className="logo-icon">
                <img src="./logo.jpg" alt="DiveME Logo" />
              </div>
              <div className="brand-text">
                <h1 className="brand-title">DiveME</h1>
                <p className="brand-subtitle">Discover the underwater world</p>
              </div>
            </div>
            
            <div className="features-preview">
              <div className="feature-item">
                <svg className="feature-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <span>Premium Diving Experiences</span>
              </div>
              <div className="feature-item">
                <svg className="feature-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
                <span>Expert Dive Guides</span>
              </div>
              <div className="feature-item">
                <svg className="feature-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <span>Stunning Dive Locations</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="form-section">
          <div className="login-card">
            <div className="card-header">
              <h2>Welcome Back</h2>
              <p>Sign in to your DiveME account</p>
            </div>

            <form onSubmit={handleFormSubmit} className="login-form">
              {/* User Type Selection */}
              <div className="form-group">
                <label className="form-label">I am a:</label>
                <div className="user-type-buttons">
                  <button
                    type="button"
                    className={`user-type-btn ${formData.userType === 'tourist' ? 'active' : ''}`}
                    onClick={() => handleUserTypeChange('tourist')}
                  >
                    <svg className="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    Tourist
                  </button>
                  <button
                    type="button"
                    className={`user-type-btn ${formData.userType === 'admin' ? 'active admin' : ''}`}
                    onClick={() => handleUserTypeChange('admin')}
                  >
                    <svg className="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 21h18"></path>
                      <path d="M5 21V7l8-4v18"></path>
                      <path d="M19 21V11l-6-4"></path>
                    </svg>
                    Diving Center
                  </button>
                </div>
              </div>

              {/* Email Input */}
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email Address</label>
                <div className="input-wrapper">
                  <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onKeyPress={(e) => handleKeyPress(e, 'password')}
                    className={errors.email ? 'error' : ''}
                    required
                  />
                </div>
                {errors.email && (
                  <div className="error-message show">{errors.email}</div>
                )}
              </div>

              {/* Password Input */}
              <div className="form-group">
                <label htmlFor="password" className="form-label">Password</label>
                <div className="input-wrapper">
                  <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <circle cx="12" cy="16" r="1"></circle>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                  
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    onKeyPress={(e) => handleKeyPress(e)}
                    className={errors.password ? 'error input' : 'input'}
                    required
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={togglePasswordVisibility}
                    aria-label="Toggle password visibility"
                  >
                    <svg className="eye-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      {showPassword ? (
                        <>
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                          <line x1="1" y1="1" x2="23" y2="23"></line>
                        </>
                      ) : (
                        <>
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </>
                      )}
                    </svg>
                  </button>
                </div>
                {errors.password && (
                  <div className="error-message show">{errors.password}</div>
                )}
              </div>

              {/* Remember & Forgot */}
              <div className="form-options">
                <div className="remember-me">
                  <input
                    type="checkbox"
                    id="remember"
                    name="remember"
                    checked={formData.remember}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="remember">Remember me</label>
                </div>
                <a href="#" className="forgot-password">Forgot password?</a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className={`submit-btn ${formData.userType === 'admin' ? 'admin' : ''} ${isLoading ? 'loading' : ''}`}
                disabled={isLoading}
              >
                {!isLoading && (
                  <svg className="btn-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                    <polyline points="10,17 15,12 10,7"></polyline>
                    <line x1="15" y1="12" x2="3" y2="12"></line>
                  </svg>
                )}
                <span className={`btn-text ${isLoading ? 'loading' : ''}`}>
                  {isLoading ? '' : `Sign In as ${formData.userType === 'admin' ? 'Diving Center' : 'Tourist'}`}
                </span>
                {isLoading && (
                  <div className="loading-spinner">
                    <div className="spinner"></div>
                  </div>
                )}
              </button>

              {/* Sign Up Link */}
              <div className="signup-link">
                <p>Don't have an account? <a href="/register" onClick={handleSignupClick}>Sign up now</a></p>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="footer">
        <p>&copy; 2025 DiveME. Dive into adventure.</p>
      </div>
    </div>
  );
};

export default Login;