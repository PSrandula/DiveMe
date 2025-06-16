import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import './register.css';

const Register = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    userType: 'tourist',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    businessName: '',
    businessAddress: '',
    termsAccepted: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleUserTypeChange = (userType) => {
    setFormData(prev => ({ ...prev, userType }));
    
    if (userType === 'tourist') {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.businessName;
        delete newErrors.businessLicense;
        delete newErrors.businessAddress;
        return newErrors;
      });
    }
  };

  const getPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const getPasswordStrengthText = (strength) => {
    const levels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
    const colors = ['#ef4444', '#f97316', '#eab308', '#3b82f6', '#10b981'];
    return { 
      text: levels[strength] || 'Very Weak', 
      color: colors[strength] || '#ef4444' 
    };
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.termsAccepted) {
      newErrors.termsAccepted = 'You must accept the terms and conditions';
    }

    if (formData.userType === 'admin') {
      if (!formData.businessName) newErrors.businessName = 'Business name is required';
      if (!formData.businessAddress) newErrors.businessAddress = 'Business address is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const simulateRegistration = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Registration successful:', formData);
        resolve();
      }, 2000);
    });
  };

  const handleFormSubmit = async (e) => {
  e.preventDefault();

  if (isLoading) return;
  if (!validateForm()) return;

  setIsLoading(true);

  try {
    await simulateRegistration();

    setTimeout(() => {
      alert(`Welcome to DiveME! Your ${formData.userType} account has been created successfully.`);
      navigate('/');
    }, 1000);

  } catch (error) {
    console.error('Registration failed:', error);
  } finally {
    setIsLoading(false);
  }
};


  const handleLoginClick = (e) => {
    e.preventDefault();
    navigate('/');
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

  const passwordStrength = getPasswordStrength(formData.password);
  const strengthInfo = getPasswordStrengthText(passwordStrength);

  return (
    <div className="register-container1">
      <div className="main-content1">
        {/* Left Side - Logo & Branding */}
        <div className="branding-section1">
          <div className="branding-content1">
            <div className="logo-section1">
              <div className="logo-icon1">
                <img src="./logo.jpg" alt="DiveME Logo" />
              </div>
              <div className="brand-text1">
                <h1 className="brand-title1">DiveME</h1>
                <p className="brand-subtitle1">Discover the underwater world</p>
              </div>
            </div>
            
            <div className="features-preview1">
              <div className="feature-item1">
                <svg className="feature-icon1" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <span>Premium Diving Experiences</span>
              </div>
              <div className="feature-item1">
                <svg className="feature-icon1" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
                <span>Expert Dive Guides</span>
              </div>
              <div className="feature-item1">
                <svg className="feature-icon1" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <span>Stunning Dive Locations</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Registration Form */}
        <div className="form-section1">
          <div className="register-card1">
            <div className="card-header1">
              <h2>Join DiveME</h2>
              <p>Create your account and start exploring</p>
            </div>

            <form onSubmit={handleFormSubmit} className="register-form1">
              {/* User Type Selection */}
              <div className="form-group1">
                <label className="form-label1">I am a:</label>
                <div className="user-type-buttons1">
                  <button
                    type="button"
                    className={`user-type-btn1 ${formData.userType === 'tourist' ? 'active' : ''}`}
                    onClick={() => handleUserTypeChange('tourist')}
                  >
                    <svg className="icon1" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    Tourist
                  </button>
                  <button
                    type="button"
                    className={`user-type-btn1 ${formData.userType === 'admin' ? 'active admin' : ''}`}
                    onClick={() => handleUserTypeChange('admin')}
                  >
                    <svg className="icon1" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 21h18"></path>
                      <path d="M5 21V7l8-4v18"></path>
                      <path d="M19 21V11l-6-4"></path>
                    </svg>
                    Diving Center
                  </button>
                </div>
              </div>

              {/* Name Fields */}
              <div className="form-row1">
                <div className="form-group1">
                  <label htmlFor="firstName" className="form-label1">First Name</label>
                  <div className="input-wrapper1">
                    <svg className="input-icon1" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    <input
                      type="text"
                      id="firstName1"
                      name="firstName"
                      placeholder="Enter your first name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      onKeyPress={(e) => handleKeyPress(e, 'lastName')}
                      className={errors.firstName1 ? 'error' : ''}
                      required
                    />
                  </div>
                  {errors.firstName && <div className="error-message show1">{errors.firstName}</div>}
                </div>

                <div className="form-group1">
                  <label htmlFor="lastName" className="form-label1">Last Name</label>
                  <div className="input-wrapper1">
                    <svg className="input-icon1" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    <input
                      type="text"
                      id="lastName1"
                      name="lastName"
                      placeholder="Enter your last name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      onKeyPress={(e) => handleKeyPress(e, 'email')}
                      className={errors.lastName1 ? 'error' : ''}
                      required
                    />
                  </div>
                  {errors.lastName && <div className="error-message show1">{errors.lastName}</div>}
                </div>
              </div>

              {/* Admin Business Fields */}
              {formData.userType === 'admin' && (
                <>
                  <div className="form-group1">
                    <label htmlFor="businessName" className="form-label1">Business Name</label>
                    <div className="input-wrapper1">
                      <svg className="input-icon1" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 21h18"></path>
                        <path d="M5 21V7l8-4v18"></path>
                        <path d="M19 21V11l-6-4"></path>
                      </svg>
                      <input
                        type="text"
                        id="businessName1"
                        name="businessName"
                        placeholder="Enter your business name"
                        value={formData.businessName}
                        onChange={handleInputChange}
                        className={errors.businessName1 ? 'error' : ''}
                        required
                      />
                    </div>
                    {errors.businessName && <div className="error-message show1">{errors.businessName}</div>}
                  </div>

                  <div className="form-group1">
                    <label htmlFor="businessAddress" className="form-label1">Business Address</label>
                    <div className="input-wrapper1">
                      <svg className="input-icon1" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                        <circle cx="12" cy="10" r="3"/>
                      </svg>
                      <input
                        type="text"
                        id="businessAddress1"
                        name="businessAddress"
                        placeholder="Enter your business address"
                        value={formData.businessAddress}
                        onChange={handleInputChange}
                        className={errors.businessAddress1 ? 'error' : ''}
                        required
                      />
                    </div>
                    {errors.businessAddress && <div className="error-message show1">{errors.businessAddress}</div>}
                  </div>
                </>
              )}

              {/* Email */}
              <div className="form-group1">
                <label htmlFor="email" className="form-label1">Email Address</label>
                <div className="input-wrapper1">
                  <svg className="input-icon1" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                  <input
                    type="email"
                    id="email1"
                    name="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={handleInputChange}
                    onKeyPress={(e) => handleKeyPress(e, 'phone')}
                    className={errors.email1 ? 'error' : ''}
                    required
                  />
                </div>
                {errors.email && <div className="error-message show1">{errors.email}</div>}
              </div>

              {/* Password */}
              <div className="form-group1">
                <label htmlFor="password" className="form-label1">Password</label>
                <div className="input-wrapper1">
                  <svg className="input-icon1" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <circle cx="12" cy="16" r="1"></circle>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={handleInputChange}
                    onKeyPress={(e) => handleKeyPress(e, 'confirmPassword')}
                    className={errors.password1 ? 'error' : ''}
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle1"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <svg className="eye-icon1" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
                {formData.password && (
                  <div className="password-strength1">
                    <div className="strength-bar1">
                      <div 
                        className="strength-fill1"
                        style={{ 
                          width: `${(passwordStrength / 5) * 100}%`,
                          backgroundColor: strengthInfo.color
                        }}
                      ></div>
                    </div>
                    <span className="strength-text1" style={{ color: strengthInfo.color }}>
                      {strengthInfo.text}
                    </span>
                  </div>
                )}
                {errors.password && <div className="error-message show1">{errors.password}</div>}
              </div>

              {/* Confirm Password */}
              <div className="form-group1">
                <label htmlFor="confirmPassword" className="form-label1">Confirm Password</label>
                <div className="input-wrapper1">
                  <svg className="input-icon1" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <circle cx="12" cy="16" r="1"></circle>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword1"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={errors.confirmPassword1 ? 'error' : ''}
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle1"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    <svg className="eye-icon1" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      {showConfirmPassword ? (
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
                {errors.confirmPassword && <div className="error-message show1">{errors.confirmPassword}</div>}
              </div>

              {/* Terms Agreement */}
              <div className="form-group1">
                <div className="checkbox-wrapper1">
                  <input
                    type="checkbox"
                    id="termsAccepted"
                    name="termsAccepted"
                    checked={formData.termsAccepted}
                    onChange={handleInputChange}
                    className="checkbox-input1"
                  />
                  <label htmlFor="termsAccepted" className="checkbox-label1">
                    I agree to the <a href="#" className="link1">Terms of Service</a> and <a href="#" className="link">Privacy Policy</a>
                  </label>
                </div>
                {errors.termsAccepted && <div className="error-message show1">{errors.termsAccepted}</div>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className={`submit-btn1 ${formData.userType === 'admin' ? 'admin' : ''} ${isLoading ? 'loading' : ''}`}
                disabled={isLoading}
              >
                {!isLoading && (
                  <svg className="btn-icon1" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                )}
                <span className={`btn-text1 ${isLoading ? 'loading' : ''}`}>
                  {isLoading ? '' : `Create ${formData.userType === 'admin' ? 'Diving Center' : 'Tourist'} Account`}
                </span>
                {isLoading && (
                  <div className="loading-spinner1">
                    <div className="spinner1"></div>
                  </div>
                )}
              </button>

              {/* Login Link */}
              <div className="login-link1">
                <p>Already have an account? <a href="/" onClick={handleLoginClick}>Sign in here</a></p>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="footer1">
        <p>&copy; 2025 DiveME. Dive into adventure.</p>
      </div>
    </div>
  );
};

const styles = `
/* Reset and Base Styles */
// * {
//   margin: 0;
//   padding: 0;
//   box-sizing: border-box;
// }

// body {
//   font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
//   line-height: 1.6;
//   color: #333;
//   background: linear-gradient(135deg, #b3e5fc 0%, #0288d1 50%, #01579b 100%);
//   min-height: 100vh;
// }

/* Main Container */
.register-container1 {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #b3e5fc 0%, #0288d1 50%, #01579b 100%);
}

.main-content1 {
  flex: 1;
  display: flex;
  min-height: calc(100vh - 60px);
}

/* Left Side - Branding Section */
.branding-section1 {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: linear-gradient(135deg, #b3e5fc 0%, #0288d1 50%, #01579b 100%);
  position: relative;
  overflow: hidden;
}

.branding-section1::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.1"/><circle cx="50" cy="10" r="0.5" fill="white" opacity="0.1"/><circle cx="20" cy="80" r="0.5" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
  pointer-events: none;
}

.branding-content1 {
  position: relative;
  z-index: 1;
  text-align: center;
  color: white;
  max-width: 500px;
}

.logo-section1{
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
   margin-bottom: 60px;
  animation: fadeInUp 1s ease-out;
}

.logo-icon1{
  margin: 0 auto 30px;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  animation: logoFloat 4s ease-in-out infinite;
  background: white;
  padding: 10px;
}

.logo-icon1 img {
 width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.brand-text1 {
  color: white;
}

.brand-title1 {
  font-size: 4rem;
  font-weight: 800;
  margin: 0 0 15px 0;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  letter-spacing: -2px;
  background: linear-gradient(45deg, #ffffff, #e3f2fd);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.brand-subtitle1 {
  font-size: 1.4rem;
  font-weight: 300;
  margin: 0;
  opacity: 0.9;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  letter-spacing: 0.5px;
}

.features-preview1 {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 2rem;
}

.feature-item1 {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.feature-item1:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
}

.feature-icon1 {
  color: #fff;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

.feature-item span1 {
  font-size: 1.1rem;
  font-weight: 500;
}

/* Right Side - Form Section */
.form-section1 {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background:linear-gradient(135deg, #b3e5fc 0%, #0288d1 50%, #01579b 100%);
}

.register-card1 {
  background: white;
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 450px;
  max-height: 90vh;
  overflow-y: auto;
}

.card-header1 {
  text-align: center;
  margin-bottom: 2rem;
}

.card-header1 h2 {
  font-size: 2rem;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 0.5rem;
}

.card-header1 p {
  color: #718096;
  font-size: 1rem;
}

/* Form Styles */
.register-form1 {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group1 {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-row1 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-label1 {
  font-weight: 600;
  color: #2d3748;
  font-size: 0.9rem;
}

/* User Type Selection */
.user-type-buttons1 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  margin-top: 0.5rem;
}

.user-type-btn1 {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  background: white;
  color: #dadddc;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.user-type-btn1:hover {
  border-color: #1f3dc4;
  background: #f7fafc;
  transform: translateY(-1px);
}

.user-type-btn1.active {
  border-color: #4a5db1;
  background: #667eea;
  color: white;
  box-shadow: 0 4px 12px rgba(39, 44, 65, 0.3);
}

.user-type-btn1.active.admin {
  border-color: #2b6cb0;
  background: #2b6cb0;
  box-shadow: 0 4px 12px rgba(7, 105, 209, 0.3);
}

.user-type-btn1 .icon {
  width: 18px;
  height: 18px;
}

/* Input Styles */
.input-wrapper1 {
  position: relative;
  display: flex;
  align-items: center;
}

.input-wrapper input1 {
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 1rem;
  background: white;
  transition: all 0.3s ease;
  color: #2d3748;
}

.input-wrapper1 input1:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.input-wrapper input1.error {
  border-color: #e53e3e;
  box-shadow: 0 0 0 3px rgba(229, 62, 62, 0.1);
}

.input-wrapper input1::placeholder {
  color: #a0aec0;
}

.input-icon1 {
  position: absolute;
  left: 1rem;
  color: #a0aec0;
  z-index: 1;
  pointer-events: none;
}

.input-wrapper input1:focus + .input-icon,
.input-wrapper input:not(:placeholder-shown) + .input-icon {
  color: #667eea;
}

/* Password Toggle */
.password-toggle1 {
  position: absolute;
  right: 1rem;
  background: none;
  border: none;
  cursor: pointer;
  color: #a0aec0;
  padding: 0.25rem;
  border-radius: 4px;
  transition: all 0.2s ease;
  z-index: 2;
}

.password-toggle1:hover {
  color: #667eea;
  background: rgba(102, 126, 234, 0.1);
}

.eye-icon1 {
  width: 18px;
  height: 18px;
}

/* Password Strength Indicator */
.password-strength1 {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 0.5rem;
}

.strength-bar1 {
  flex: 1;
  height: 4px;
  background: #e2e8f0;
  border-radius: 2px;
  overflow: hidden;
}

.strength-fill1 {
  height: 100%;
  transition: all 0.3s ease;
  border-radius: 2px;
}

.strength-text1 {
  font-size: 0.8rem;
  font-weight: 600;
  min-width: 80px;
  text-align: right;
}

/* Checkbox Styles */
.checkbox-wrapper1 {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-top: 0.5rem;
}

.checkbox-input1 {
  width: 18px;
  height: 18px;
  margin: 0;
  cursor: pointer;
  accent-color: #667eea;
}

.checkbox-label1 {
  font-size: 0.9rem;
  color: #4a5568;
  cursor: pointer;
  line-height: 1.4;
}

.checkbox-label .link1 {
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
}

.checkbox-label .link1:hover {
  text-decoration: underline;
}

/* Error Messages */
.error-message1 {
  color: #e53e3e;
  font-size: 0.85rem;
  font-weight: 500;
  opacity: 0;
  transform: translateY(-5px);
  transition: all 0.3s ease;
  margin-top: 0.25rem;
}

.error-message.show1 {
  opacity: 1;
  transform: translateY(0);
}

/* Submit Button */
.submit-btn1 {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  width: 100%;
  padding: 1rem 1.5rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  margin-top: 0.5rem;
}

.submit-btn1:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}

.submit-btn.admin1 {
  background: linear-gradient(135deg, #2b6cb0, #2c5282);
}

.submit-btn.admin1:hover:not(:disabled) {
  box-shadow: 0 8px 25px rgba(43, 108, 176, 0.4);
}

.submit-btn1:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.btn-icon1 {
  transition: all 0.3s ease;
}

.btn-text1 {
  transition: all 0.3s ease;
}

.btn-text.loading1 {
  opacity: 0;
}

/* Loading Spinner */
.loading-spinner1 {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
}

.spinner1 {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Login Link */
.login-link1 {
  text-align: center;
  margin-top: 1rem;
}

.login-link1 p {
  color: #718096;
  font-size: 0.9rem;
}

.login-link1 a {
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
}

.login-link1 a:hover {
  text-decoration: underline;
}

/* Footer */
.footer1 {
  background: rgba(0, 0, 0, 0.1);
  color: white;
  text-align: center;
  padding: 1rem;
  font-size: 0.9rem;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .main-content {
    flex-direction: column;
  }
  
  .branding-section {
    min-height: 40vh;
  }
  
  .logo-section {
    flex-direction: row;
    gap: 1rem;
  }
  
  .brand-title {
    font-size: 2.5rem;
  }
  
  .features-preview {
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
  }
  
  .feature-item {
    flex: 1;
    min-width: 200px;
  }
}

@media (max-width: 768px) {
  .branding-section {
    padding: 1.5rem;
    min-height: 35vh;
  }
  
  .form-section {
    padding: 1rem;
  }
  
  .register-card {
    padding: 1.5rem;
    margin: 0;
    border-radius: 16px;
  }
  
  .form-row {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .user-type-buttons {
    grid-template-columns: 1fr;
  }
  
  .brand-title {
    font-size: 2rem;
  }
  
  .features-preview {
    flex-direction: column;
    gap: 1rem;
  }
  
  .feature-item {
    padding: 0.75rem;
  }
  
  .logo-section {
    margin-bottom: 2rem;
  }
}

@media (max-width: 480px) {
  .register-card {
    padding: 1rem;
    max-height: none;
  }
  
  .card-header h2 {
    font-size: 1.5rem;
  }
  
  .input-wrapper input {
    padding: 0.875rem 0.875rem 0.875rem 2.75rem;
  }
  
  .user-type-btn {
    padding: 0.875rem;
    font-size: 0.85rem;
  }
  
  .submit-btn {
    padding: 0.875rem 1rem;
  }
  
  .brand-title {
    font-size: 1.75rem;
  }
  
  .logo-icon {
    width: 60px;
    height: 60px;
  }
  
  .logo-icon img {
    width: 45px;
    height: 45px;
  }
}

/* Smooth Scrolling for Form */
.register-card {
  scrollbar-width: thin;
  scrollbar-color: rgba(102, 126, 234, 0.3) transparent;
}

.register-card::-webkit-scrollbar {
  width: 6px;
}

.register-card::-webkit-scrollbar-track {
  background: transparent;
}

.register-card::-webkit-scrollbar-thumb {
  background: rgba(102, 126, 234, 0.3);
  border-radius: 3px;
}

.register-card::-webkit-scrollbar-thumb:hover {
  background: rgba(102, 126, 234, 0.5);
}

/* Focus States for Accessibility */
.user-type-btn:focus,
.submit-btn:focus,
.checkbox-input:focus {
  outline: 2px solid #667eea;
  outline-offset: 2px;
}

.password-toggle:focus {
  outline: 2px solid #667eea;
  outline-offset: 1px;
}

/* Animation for Form Loading */
.register-card {
  animation: slideUp 0.6s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Hover Effects for Interactive Elements */
.feature-item {
  cursor: default;
}

.input-wrapper input:hover:not(:focus) {
  border-color: #cbd5e0;
}

.checkbox-wrapper:hover .checkbox-input {
  transform: scale(1.05);
}

/* Custom Scrollbar for Better UX */
html {
  scroll-behavior: smooth;
}

/* Print Styles */
@media print {
  .register-container {
    background: white !important;
  }
  
  .branding-section {
    background: white !important;
    color: black !important;
  }
  
  .submit-btn {
    background: #333 !important;
  }
}
`;

const styleElement = document.createElement('style');
styleElement.innerHTML = styles;
document.head.appendChild(styleElement);

export default Register;