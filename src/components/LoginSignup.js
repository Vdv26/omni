import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function LoginSignup() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';

  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateLogin = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Enter a valid email';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateSignup = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Enter a valid email';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!formData.terms) newErrors.terms = 'You must accept the terms and conditions';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = isLogin ? validateLogin() : validateSignup();
    if (!isValid) return;

    const user = {
      name: isLogin ? (formData.email.split('@')[0]) : formData.name,
      email: formData.email,
      loggedIn: true
    };

    // If signing up, save user
    if (!isLogin) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      // On login just set session
      const existing = localStorage.getItem('user');
      const parsed = existing ? JSON.parse(existing) : null;
      if (parsed && parsed.email === formData.email) {
        localStorage.setItem('user', JSON.stringify({ ...parsed, loggedIn: true }));
      } else {
        localStorage.setItem('user', JSON.stringify(user));
      }
    }

    setSubmitted(true);
    setTimeout(() => {
      navigate(from);
      window.location.reload(); // refresh so Header picks up the user from context
    }, 1500);
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setErrors({});
    setFormData({ name: '', email: '', password: '', confirmPassword: '', terms: false });
  };

  if (submitted) {
    return (
      <div className="main-container" data-testid="login-page">
        <div className="form-container" style={{ textAlign: 'center', padding: '60px 40px' }}>
          <div style={{ fontSize: '72px', marginBottom: '20px' }}>🎉</div>
          <h2 style={{ marginBottom: '12px' }}>
            {isLogin ? 'Welcome back!' : 'Account Created!'}
          </h2>
          <p style={{ color: '#64748b' }}>Redirecting you now...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="main-container" data-testid="login-page">
      <div className="form-container" style={{ maxWidth: '480px' }}>

        {/* Toggle tabs */}
        <div style={{
          display: 'flex',
          background: '#f1f5f9',
          borderRadius: '10px',
          padding: '4px',
          marginBottom: '32px'
        }}>
          <button
            onClick={() => isLogin || switchMode()}
            data-testid="login-tab"
            style={{
              flex: 1,
              padding: '10px',
              border: 'none',
              borderRadius: '8px',
              fontWeight: '700',
              fontSize: '15px',
              cursor: 'pointer',
              transition: 'all 0.2s',
              background: isLogin ? 'white' : 'transparent',
              color: isLogin ? '#7c3aed' : '#94a3b8',
              boxShadow: isLogin ? '0 2px 8px rgba(0,0,0,0.1)' : 'none'
            }}
          >
            Sign In
          </button>
          <button
            onClick={() => !isLogin || switchMode()}
            data-testid="signup-tab"
            style={{
              flex: 1,
              padding: '10px',
              border: 'none',
              borderRadius: '8px',
              fontWeight: '700',
              fontSize: '15px',
              cursor: 'pointer',
              transition: 'all 0.2s',
              background: !isLogin ? 'white' : 'transparent',
              color: !isLogin ? '#7c3aed' : '#94a3b8',
              boxShadow: !isLogin ? '0 2px 8px rgba(0,0,0,0.1)' : 'none'
            }}
          >
            Sign Up
          </button>
        </div>

        <h2 style={{ marginBottom: '8px' }}>
          {isLogin ? 'Welcome back 👋' : 'Create an account 🚀'}
        </h2>
        <p style={{ color: '#64748b', marginBottom: '28px' }}>
          {isLogin
            ? 'Sign in to access your account and favorites.'
            : 'Join OmniGigs and start buying or selling services today.'}
        </p>

        <form onSubmit={handleSubmit}>

          {/* Name - signup only */}
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
              {errors.name && (
                <span style={{ color: '#ef4444', fontSize: '14px' }}>{errors.name}</span>
              )}
            </div>
          )}

          {/* Email */}
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
            {errors.email && (
              <span style={{ color: '#ef4444', fontSize: '14px' }}>{errors.email}</span>
            )}
          </div>

          {/* Password */}
          <div className="form-group">
            <label htmlFor="password">Password *</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Min. 6 characters"
              data-testid="password-input"
            />
            {errors.password && (
              <span style={{ color: '#ef4444', fontSize: '14px' }}>{errors.password}</span>
            )}
          </div>

          {/* Confirm Password - signup only */}
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password *</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter your password"
                data-testid="confirm-password-input"
              />
              {errors.confirmPassword && (
                <span style={{ color: '#ef4444', fontSize: '14px' }}>{errors.confirmPassword}</span>
              )}
            </div>
          )}

          {/* Terms - signup only */}
          {!isLogin && (
            <div className="form-group">
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  name="terms"
                  checked={formData.terms}
                  onChange={handleChange}
                  data-testid="terms-checkbox"
                />
                I accept the{' '}
                <span style={{ color: '#7c3aed', fontWeight: '600' }}>terms and conditions</span>
              </label>
              {errors.terms && (
                <span style={{ color: '#ef4444', fontSize: '14px' }}>{errors.terms}</span>
              )}
            </div>
          )}

          <button
            type="submit"
            className="submit-btn"
            data-testid="submit-button"
          >
            {isLogin ? 'Sign In →' : 'Create Account →'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '20px', color: '#64748b', fontSize: '14px' }}>
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <button
            onClick={switchMode}
            style={{
              background: 'none',
              border: 'none',
              color: '#7c3aed',
              fontWeight: '700',
              cursor: 'pointer',
              fontSize: '14px',
              padding: 0
            }}
            data-testid="switch-mode-link"
          >
            {isLogin ? 'Sign Up' : 'Sign In'}
          </button>
        </p>
      </div>
    </div>
  );
}

export default LoginSignup;