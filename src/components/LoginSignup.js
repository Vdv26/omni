import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

// Login/Signup Component with comprehensive form controls
function LoginSignup({ onLogin }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    agreedToTerms: false
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  // Get the page user was trying to access
  const from = location.state?.from || '/';

  // Event handler - onChange
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    // Name validation (signup only)
    if (!isLogin && !formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // Confirm password (signup only)
    if (!isLogin) {
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }

      if (!formData.agreedToTerms) {
        newErrors.agreedToTerms = 'You must agree to the terms and conditions';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Event handler - onSubmit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Store user in localStorage
      const user = {
        email: formData.email,
        name: formData.name || formData.email.split('@')[0],
        loggedIn: true
      };
      localStorage.setItem('user', JSON.stringify(user));
      
      // Call parent component's login handler
      onLogin(user);
      
      // Show success message
      alert(isLogin ? 'Login successful!' : 'Account created successfully!');
      
      // Navigate to the page user was trying to access
      // If coming from payment, need to handle gig data properly
      if (from === '/payment') {
        // Need to get gig from previous location state
        navigate('/', { replace: true });
        alert('Please select a service again to continue with payment');
      } else {
        navigate(from, { replace: true });
      }
    }
  };

  // Toggle between login and signup
  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      agreedToTerms: false
    });
    setErrors({});
  };

  return (
    <div className="main-container" data-testid="login-signup-page">
      <div className="form-container" style={{maxWidth: '500px'}}>
        <h2 data-testid="form-title">{isLogin ? 'Welcome Back!' : 'Create Account'}</h2>
        <p style={{color: '#64748b', marginBottom: '30px'}}>
          {isLogin 
            ? 'Login to access your account and continue'
            : 'Sign up to start posting gigs and hiring freelancers'
          }
        </p>

        <form onSubmit={handleSubmit}>
          {/* Name field (Signup only) */}
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                data-testid="name-input"
              />
              {errors.name && <span style={{color: '#ef4444', fontSize: '14px'}}>{errors.name}</span>}
            </div>
          )}

          {/* Email field */}
          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              data-testid="email-input"
            />
            {errors.email && <span style={{color: '#ef4444', fontSize: '14px'}}>{errors.email}</span>}
          </div>

          {/* Password field */}
          <div className="form-group">
            <label htmlFor="password">Password *</label>
            <div style={{position: 'relative'}}>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password (min 6 characters)"
                data-testid="password-input"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '20px'
                }}
                data-testid="toggle-password-button"
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
            {errors.password && <span style={{color: '#ef4444', fontSize: '14px'}}>{errors.password}</span>}
          </div>

          {/* Confirm Password (Signup only) */}
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password *</label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter password"
                data-testid="confirm-password-input"
              />
              {errors.confirmPassword && <span style={{color: '#ef4444', fontSize: '14px'}}>{errors.confirmPassword}</span>}
            </div>
          )}

          {/* Terms checkbox (Signup only) */}
          {!isLogin && (
            <div className="form-group">
              <label style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                <input
                  type="checkbox"
                  name="agreedToTerms"
                  checked={formData.agreedToTerms}
                  onChange={handleChange}
                  data-testid="terms-checkbox"
                />
                I agree to the Terms of Service and Privacy Policy *
              </label>
              {errors.agreedToTerms && <span style={{color: '#ef4444', fontSize: '14px'}}>{errors.agreedToTerms}</span>}
            </div>
          )}

          {/* Submit button */}
          <button type="submit" className="submit-btn" data-testid="submit-button">
            {isLogin ? 'Login' : 'Create Account'}
          </button>
        </form>

        {/* Toggle between login and signup */}
        <div style={{
          textAlign: 'center',
          marginTop: '24px',
          paddingTop: '24px',
          borderTop: '1px solid #e2e8f0'
        }}>
          <p style={{color: '#64748b'}}>
            {isLogin ? "Don't have an account?" : 'Already have an account?'}
            {' '}
            <button
              type="button"
              onClick={toggleMode}
              style={{
                background: 'none',
                border: 'none',
                color: '#7c3aed',
                fontWeight: '700',
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
              data-testid="toggle-mode-button"
            >
              {isLogin ? 'Sign Up' : 'Login'}
            </button>
          </p>
        </div>

        {/* Back to home */}
        <button
          type="button"
          onClick={() => navigate('/')}
          style={{
            width: '100%',
            padding: '12px',
            marginTop: '16px',
            background: 'white',
            color: '#64748b',
            border: '2px solid #e2e8f0',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600'
          }}
          data-testid="back-home-button"
        >
          ← Back to Home
        </button>
      </div>
    </div>
  );
}

LoginSignup.propTypes = {
  onLogin: PropTypes.func.isRequired
};

export default LoginSignup;