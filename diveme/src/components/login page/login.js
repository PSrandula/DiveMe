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
}

  export default Login;