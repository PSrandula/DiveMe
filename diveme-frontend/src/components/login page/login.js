import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import './login.css';
import "../register page/register";

const Login = () => {
  // Form state management
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    userType: "tourist",
    remember: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  // Load saved data on component mount
  useEffect(() => {
    loadSavedData();
  }, []);

  // Load remembered email if available
  const loadSavedData = () => {
    const rememberedEmail = localStorage.getItem("diveme_remembered_email");
    if (rememberedEmail) {
      setFormData((prev) => ({
        ...prev,
        email: rememberedEmail,
        remember: true,
      }));
    }
  };

  // Form handlers
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleUserTypeChange = (userType) => {
    setFormData((prev) => ({
      ...prev,
      userType,
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
      newErrors.email = "Email is required";
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          userType: formData.userType, // ✅ important
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors({ password: data.message || "Login failed" });
        setIsLoading(false);
        return;
      }

      localStorage.setItem("diveme_user", JSON.stringify(data));
      localStorage.setItem("diveme_token", data.token);

      if (formData.remember) {
        localStorage.setItem("diveme_remembered_email", formData.email);
      } else {
        localStorage.removeItem("diveme_remembered_email");
      }
      navigate("/home");
    } catch (error) {
      console.error("Login failed:", error);
      setErrors({ password: "Server error, please try again later." });
    } finally {
      setIsLoading(false);
    }
  };

  const navigate = useNavigate();

  const handleSignupClick = (e) => {
    e.preventDefault(); // Prevent default anchor behavior
    navigate("/register"); // Navigate to Register page
  };

  const handleKeyPress = (e, nextFieldId) => {
    if (e.key === "Enter") {
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
                <svg
                  className="feature-icon"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <span>Premium Diving Experiences</span>
              </div>
              <div className="feature-item">
                <svg
                  className="feature-icon"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                <span>Expert Dive Guides</span>
              </div>
              <div className="feature-item">
                <svg
                  className="feature-icon"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
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
                    className={`user-type-btn ${
                      formData.userType === "tourist" ? "active" : ""
                    }`}
                    onClick={() => handleUserTypeChange("tourist")}
                  >
                    <svg
                      className="icon"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    Tourist
                  </button>
                  <button
                    type="button"
                    className={`user-type-btn ${
                      formData.userType === "admin" ? "active admin" : ""
                    }`}
                    onClick={() => handleUserTypeChange("admin")}
                  >
                    <svg
                      className="icon"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
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
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <div className="input-wrapper">
                  <svg
                    className="input-icon"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
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
                    onKeyPress={(e) => handleKeyPress(e, "password")}
                    className={errors.email ? "error" : ""}
                    required
                  />
                </div>
                {errors.email && (
                  <div className="error-message show">{errors.email}</div>
                )}
              </div>

              {/* Password Input */}
              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <div className="input-wrapper">
                  <svg
                    className="input-icon"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect
                      x="3"
                      y="11"
                      width="18"
                      height="11"
                      rx="2"
                      ry="2"
                    ></rect>
                    <circle cx="12" cy="16" r="1"></circle>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>

                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    onKeyPress={(e) => handleKeyPress(e)}
                    className={errors.password ? "error input" : "input"}
                    required
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={togglePasswordVisibility}
                    aria-label="Toggle password visibility"
                  >
                    <svg
                      className="eye-icon"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
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
                <a href="#" className="forgot-password">
                  Forgot password?
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className={`submit-btn ${
                  formData.userType === "admin" ? "admin" : ""
                } ${isLoading ? "loading" : ""}`}
                disabled={isLoading}
              >
                {!isLoading && (
                  <svg
                    className="btn-icon"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                    <polyline points="10,17 15,12 10,7"></polyline>
                    <line x1="15" y1="12" x2="3" y2="12"></line>
                  </svg>
                )}
                <span className={`btn-text ${isLoading ? "loading" : ""}`}>
                  {isLoading
                    ? ""
                    : `Sign In as ${
                        formData.userType === "admin"
                          ? "Diving Center"
                          : "Tourist"
                      }`}
                </span>
                {isLoading && (
                  <div className="loading-spinner">
                    <div className="spinner"></div>
                  </div>
                )}
              </button>

              {/* Sign Up Link */}
              <div className="signup-link">
                <p>
                  Don't have an account?{" "}
                  <a href="/register" onClick={handleSignupClick}>
                    Sign up now
                  </a>
                </p>
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

const styles = `

/* Login.css - Two Column Layout */
.login-container {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  background: linear-gradient(135deg, #b3e5fc 0%, #0288d1 50%, #01579b 100%);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}


.login-container *,
.login-container *::before,
.login-container *::after {
  box-sizing: border-box;
}

/* Main Content - Two Column Layout */
.main-content {
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: calc(100vh - 80px);
}

/* Left Side - Branding Section */
.branding-section {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  padding: 60px 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.branding-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none"><circle cx="50" cy="50" r="2" fill="rgba(255,255,255,0.1)"/></svg>') repeat;
  opacity: 0.3;
  animation: float 20s linear infinite;
}

@keyframes float {
  0% { transform: translateY(0px); }
  100% { transform: translateY(-100px); }
}

.branding-content {
  position: relative;
  z-index: 1;
  text-align: center;
  max-width: 500px;
  width: 100%;
}

.logo-section{
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
   margin-bottom: 60px;
  animation: fadeInUp 1s ease-out;
}

.logo-icon{
  margin: 0 auto 30px;
  width: 150px !important;
  height: 150px !important;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  animation: logoFloat 4s ease-in-out infinite;
  background: white;
  padding: 10px;
}

.logo-icon img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

@keyframes logoFloat {
  0%, 100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-15px) scale(1.05);
  }
}

.brand-text {
  color: white;
}

.brand-title {
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

.brand-subtitle {
  font-size: 1.4rem;
  font-weight: 300;
  margin: 0;
  opacity: 0.9;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  letter-spacing: 0.5px;
}

/* Features Preview */
.features-preview {
  animation: fadeInUp 1s ease-out 0.3s both;
}

.feature-item {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: white;
  margin-bottom: 20px;
  padding: 15px 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.feature-item:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateX(10px);
}

.feature-icon {
  margin-right: 15px;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
}

.feature-item span {
  font-size: 1rem;
  font-weight: 500;
}

/* Right Side - Form Section */
.form-section {
  background: linear-gradient(135deg, #b3e5fc);
  padding: 60px 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}


.login-card {
  width: 100%;
  max-width: 420px;
  animation: slideInRight 0.8s ease-out;
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.card-header {
  margin-bottom: 40px;
  text-align: center;
}

.card-header h2 {
  font-size: 2.2rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 10px 0;
}

.card-header p {
  color: #6b7280;
  font-size: 1.1rem;
  margin: 0;
}

/* Form Styles */
.login-form {
  text-align: left;
}

.form-group {
  margin-bottom: 28px;
}

.form-label {
  display: block;
  margin-bottom: 10px;
  font-weight: 600;
  color: #374151;
  font-size: 1rem;
}

/* User Type Buttons */
.user-type-buttons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.user-type-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px 20px;
  border: 2px solidrgb(229, 235, 235);
  border-radius: 15px;
  background: white;
  color: #6b7280;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;
  font-size: 0.95rem;
}

.user-type-btn:hover {
  border-color: #d1d5db;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.user-type-btn.active {
  border-color: #3b82f6;
  background: #eff6ff;
  color: #1d4ed8;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(54, 110, 200, 0.2);
}

.user-type-btn.admin.active {
  border-color: #f2f5f5;
  background: #f0fdfa;
  color: #e8e8e8;
  box-shadow: 0 8px 20px rgba(20, 184, 166, 0.2);
}

.user-type-btn .icon {
  margin-right: 10px;
  width: 20px;
  height: 20px;
}

/* Input wrapper */
.input-wrapper {
  position: relative;
  width: 100%;
}

input[type="email"],
input[type="password"],
input[type="text"] {
  width: 100%;
  padding: 16px 16px 16px 40px;
  border: 2px solid #e5e7eb;
  border-radius: 15px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: #fafafa;
  font-family: 'Segoe UI', sans-serif;
  box-sizing: border-box;
}

input[type="email"]:focus,
input[type="password"]:focus,
input[type="text"]:focus {
  outline: none;
  border-color: #3b82f6;
  background: white;
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
  transform: translateY(-1px);
}

input.error {
  border-color: #ef4444;
  background: #fef2f2;
  animation: shake 0.5s ease-in-out;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
  20%, 40%, 60%, 80% { transform: translateX(5px); }
}

/* Input icons */
.input-icon {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
  pointer-events: none;
  z-index: 1;
}

.password-toggle {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #9ca3af;
  padding: 6px;
  border-radius: 6px;
  transition: all 0.2s ease;
  z-index: 2;
}

.password-toggle:hover {
  color: #6b7280;
  background: rgba(0, 0, 0, 0.05);
}

/* Error message */
.error-message {
  color: #ef4444;
  font-size: 0.9rem;
  margin-top: 8px;
  display: none;
  font-weight: 500;
}

.error-message.show {
  display: block;
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-5px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Form Options */
.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.remember-me {
  display: flex;
  align-items: center;
}

.remember-me input[type="checkbox"] {
  width: 18px;
  height: 18px;
  margin-right: 10px;
  accent-color: #3b82f6;
}

.remember-me label {
  font-size: 0.95rem;
  color: #374151;
  cursor: pointer;
  font-weight: 500;
}

.forgot-password {
  color:#374151;
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 600;
  transition: color 0.2s ease;
}

.forgot-password:hover {
  color: #1f283a;
}

/* Submit Button */
.submit-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 18px 24px;
  background: linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%);
  color: white;
  border: none;
  border-radius: 15px;
  font-weight: 700;
  font-size: 1.05rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  font-family: inherit;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 12px 30px rgba(59, 130, 246, 0.4);
}

.submit-btn:active:not(:disabled) {
  transform: translateY(-1px);
}

.submit-btn.admin {
  background: linear-gradient(135deg, #14b8a6 0%, #10b981 100%);
}

.submit-btn.admin:hover:not(:disabled) {
  box-shadow: 0 12px 30px rgba(20, 184, 166, 0.4);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.btn-icon {
  margin-right: 10px;
  width: 20px;
  height: 20px;
}

.btn-text {
  transition: opacity 0.2s ease;
}

.btn-text.loading {
  opacity: 0;
}

.loading-spinner {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.spinner {
  width: 24px;
  height: 24px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top: 3px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Sign Up Link */
.signup-link {
  text-align: center;
  margin-top: 30px;
  padding-top: 25px;
  border-top: 1px solid #e5e7eb;
}

.signup-link p {
  color: #202021;
  font-size: 1rem;
  margin: 0;
}

.signup-link a {
  color: #aaa3af;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s ease;
}

.signup-link a:hover {
  color: #515357;
}
/* Footer */
.footer {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 20px 0;
  text-align: center;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
}

.footer p {
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.95rem;
  margin: 0;
  font-weight: 500;
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive Design */
@media (max-width: 1200px) {
  .main-content {
    grid-template-columns: 1fr;
    min-height: auto;
  }
  
  .branding-section {
    padding: 40px 30px;
    min-height: 50vh;
  }
  
  .brand-title {
    font-size: 3rem;
  }
  
  .logo-icon {
    width: 120px;
    height: 120px;
  }
  
  .form-section {
    padding: 40px 30px;
  }
}

@media (max-width: 768px) {
  .branding-section {
    padding: 30px 20px;
    min-height: 40vh;
  }
  
  .brand-title {
    font-size: 2.5rem;
  }
  
  .brand-subtitle {
    font-size: 1.2rem;
  }
  
  .logo-icon {
    width: 100px;
    height: 100px;
    margin-bottom: 20px;
  }
  
  .features-preview {
    margin-top: 30px;
  }
  
  .feature-item {
    padding: 12px 15px;
    margin-bottom: 15px;
  }
  
  .form-section {
    padding: 30px 20px;
  }
  
  .card-header h2 {
    font-size: 1.8rem;
  }
  
  .user-type-buttons {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  
  .form-options {
    flex-direction: column;
    gap: 15px;
    align-items: flex-start;
  }
}

@media (max-width: 480px) {
  .login-container {
    padding: 0;
  }
  
  .branding-section {
    padding: 20px 15px;
    min-height: 35vh;
  }
  
  .brand-title {
    font-size: 2rem;
  }
  
  .brand-subtitle {
    font-size: 1rem;
  }
  
  .logo-icon {
    width: 80px;
    height: 80px;
  }
  
  .form-section {
    padding: 20px 15px;
  }
  
  .login-card {
    max-width: 100%;
  }
  
  .card-header h2 {
    font-size: 1.6rem;
  }
  
  input[type="email"],
  input[type="password"],
  input[type="text"] {
    padding: 14px 40px;
    font-size: 0.95rem;
  }
  
  .submit-btn {
    padding: 16px 20px;
    font-size: 1rem;
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .form-section {
    background: rgba(255, 255, 255, 0.98);
  }
  
  .login-card {
    background: rgba(255, 255, 255, 0.95);
  }
}

/* High contrast mode */
@media (prefers-contrast: high) {
  .branding-section {
    background: rgba(0, 0, 0, 0.8);
  }
  
  .feature-item {
    background: rgba(255, 255, 255, 0.2);
    border: 2px solid rgba(255, 255, 255, 0.5);
  }
  
  input[type="email"],
  input[type="password"],
  input[type="text"] {
    border-width: 3px;
  }
  
  .submit-btn {
    border: 2px solid rgba(255, 255, 255, 0.3);
  }
}
/* Print styles */
@media print {
  .login-container {
    background: white;
    color: black;
  }

  .branding-section {
    background: #f5f5f5;
  }

  .brand-title,
  .brand-subtitle,
  .feature-item {
    color: black;
  }
}

`;

const styleElement = document.createElement("style");
styleElement.innerHTML = styles;
document.head.appendChild(styleElement);

export default Login;
