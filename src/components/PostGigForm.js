import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

// Comprehensive Form Component demonstrating:
// - Text inputs, textarea, select dropdown, radio buttons, checkboxes
// - Form validation
// - Canvas element (signature pad)
// - DOM manipulation
// - All form control types from syllabus
    
function PostGigForm({ onAddGig }) {   
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  
  // Form state management
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    deliveryTime: '',
    serviceType: 'fixed', // Radio button
    features: [], // Checkboxes
    terms: false // Single checkbox
  });
  
  const [errors, setErrors] = useState({});   
  const [hasSignature, setHasSignature] = useState(false);

  // Canvas setup - useEffect (Component Lifecycle)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.strokeStyle = '#7c3aed';
    }
  }, []);

  // Event Handlers - onChange for different input types
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      if (name === 'terms') {
        setFormData(prev => ({ ...prev, terms: checked }));
      } else {
        // Multiple checkboxes for features
        setFormData(prev => ({
          ...prev,
          features: checked 
            ? [...prev.features, value]
            : prev.features.filter(f => f !== value)
        }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Canvas Drawing Events
  const startDrawing = (e) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
    setHasSignature(true);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
  };

  // Form Validation
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 50) {
      newErrors.description = 'Description must be at least 50 characters';
    }
    
    if (!formData.price || formData.price <= 0) {
      newErrors.price = 'Price must be greater than 0';
    }
    
    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }
    
    if (!formData.deliveryTime) {
      newErrors.deliveryTime = 'Please select delivery time';
    }
    
    if (formData.features.length === 0) {
      newErrors.features = 'Please select at least one feature';
    }
    
    if (!formData.terms) {
      newErrors.terms = 'You must accept the terms and conditions';
    }
    
    if (!hasSignature) {
      newErrors.signature = 'Please provide your signature';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Event Handler - onSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Create new gig object
      const newGig = {
        seller: 'You',
        title: formData.title,
        price: parseInt(formData.price),
        rating: 5.0,
        category: formData.category,
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&q=80',
        desc: formData.description,
        features: formData.features
      };
      
      onAddGig(newGig);
      alert('Gig posted successfully!');
      navigate('/');
    } else {
      // DOM manipulation - scroll to first error
      const firstErrorField = Object.keys(errors)[0];
      const element = document.getElementsByName(firstErrorField)[0];
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.focus();
      }
    }
  };

  // Event Handler - onFocus
  const handleFocus = (e) => {
    e.target.style.borderColor = '#7c3aed';
  };

  // Event Handler - onBlur
  const handleBlur = (e) => {
    e.target.style.borderColor = '#e2e8f0';
  };

  const categories = [
    "Programming & Tech",
    "Carpentry & Woodwork",
    "Plumbing Services",
    "Gardening & Landscaping",
    "Electrical Works",
    "Digital Marketing"
  ];

  const availableFeatures = [
    "Fast Delivery",
    "24/7 Support",
    "Unlimited Revisions",
    "Source Files Included",
    "Commercial License"
  ];

  return (
    <div className="form-container" data-testid="post-gig-form">
      <h2>Post a New Gig</h2>
      <p style={{color: '#64748b', marginBottom: '30px'}}>
        Fill out the form below to list your service. All fields are required.
      </p>
      
      <form onSubmit={handleSubmit}>
        {/* Text Input */}
        <div className="form-group">
          <label htmlFor="title">Gig Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder="I will..."
            data-testid="title-input"
          />
          {errors.title && <span style={{color: '#ef4444', fontSize: '14px'}}>{errors.title}</span>}
        </div>
        
        {/* Textarea Control */}
        <div className="form-group">
          <label htmlFor="description">Description *</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder="Describe your service in detail (minimum 50 characters)..."
            data-testid="description-textarea"
          />
          <small style={{color: '#64748b'}}>{formData.description.length} / 50 minimum characters</small>
          {errors.description && <div><span style={{color: '#ef4444', fontSize: '14px'}}>{errors.description}</span></div>}
        </div>
        
        {/* Number Input */}
        <div className="form-group">
          <label htmlFor="price">Price (USD) *</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            placeholder="50"
            min="1"
            data-testid="price-input"
          />
          {errors.price && <span style={{color: '#ef4444', fontSize: '14px'}}>{errors.price}</span>}
        </div>
        
        {/* Select Dropdown (Pull-down Menu) */}
        <div className="form-group">
          <label htmlFor="category">Category *</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            data-testid="category-select"
          >
            <option value="">-- Select a category --</option>
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>{cat}</option>
            ))}
          </select>
          {errors.category && <span style={{color: '#ef4444', fontSize: '14px'}}>{errors.category}</span>}
        </div>
        
        {/* Another Select Dropdown */}
        <div className="form-group">
          <label htmlFor="deliveryTime">Delivery Time *</label>
          <select
            id="deliveryTime"
            name="deliveryTime"
            value={formData.deliveryTime}
            onChange={handleInputChange}
            data-testid="delivery-time-select"
          >
            <option value="">-- Select delivery time --</option>
            <option value="1-day">1 Day Delivery</option>
            <option value="3-days">3 Days Delivery</option>
            <option value="7-days">7 Days Delivery</option>
            <option value="14-days">14 Days Delivery</option>
          </select>
          {errors.deliveryTime && <span style={{color: '#ef4444', fontSize: '14px'}}>{errors.deliveryTime}</span>}
        </div>
        
        {/* Radio Buttons */}
        <div className="form-group">
          <label>Service Type *</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="serviceType"
                value="fixed"
                checked={formData.serviceType === 'fixed'}
                onChange={handleInputChange}
                data-testid="service-type-fixed"
              />
              Fixed Price - One-time service with set deliverables
            </label>
            <label>
              <input
                type="radio"
                name="serviceType"
                value="hourly"
                checked={formData.serviceType === 'hourly'}
                onChange={handleInputChange}
                data-testid="service-type-hourly"
              />
              Hourly Rate - Ongoing work billed by the hour
            </label>
            <label>
              <input
                type="radio"
                name="serviceType"
                value="package"
                checked={formData.serviceType === 'package'}
                onChange={handleInputChange}
                data-testid="service-type-package"
              />
              Package Deal - Multiple tiers with different features
            </label>
          </div>
        </div>
        
        {/* Checkboxes (Multiple Selection) */}
        <div className="form-group">
          <label>Features Included * (Select at least one)</label>
          <div className="checkbox-group">
            {availableFeatures.map((feature, idx) => (
              <label key={idx}>
                <input
                  type="checkbox"
                  name="features"
                  value={feature}
                  checked={formData.features.includes(feature)}
                  onChange={handleInputChange}
                  data-testid={`feature-${feature.toLowerCase().replace(/\s+/g, '-')}`}
                />
                {feature}
              </label>
            ))}
          </div>
          {errors.features && <span style={{color: '#ef4444', fontSize: '14px'}}>{errors.features}</span>}
        </div>
        
        {/* Canvas Element - Signature Pad (Drawing demonstration) */}
        <div className="form-group">
          <label>Signature * (Draw your signature below)</label>
          <div className="canvas-container">
            <canvas
              ref={canvasRef}
              width={600}
              height={150}
              className="signature-pad"
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              data-testid="signature-canvas"
            />
            <button 
              type="button" 
              onClick={clearCanvas}
              style={{
                marginTop: '10px',
                padding: '8px 16px',
                background: '#ef4444',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }} 
              data-testid="clear-signature-button"     
            >
              Clear Signature
            </button>
          </div>
          {errors.signature && <span style={{color: '#ef4444', fontSize: '14px'}}>{errors.signature}</span>}
        </div>
        
        {/* Single Checkbox - Terms & Conditions */}
        <div className="form-group">
          <label style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
            <input
              type="checkbox"
              name="terms"
              checked={formData.terms}
              onChange={handleInputChange}
              data-testid="terms-checkbox"
            />
            I accept the terms and conditions *
          </label>
          {errors.terms && <span style={{color: '#ef4444', fontSize: '14px'}}>{errors.terms}</span>}
        </div>
        
        {/* Submit Button */}
        <button 
          type="submit" 
          className="submit-btn"
          data-testid="submit-button"
        >
          Post Gig
        </button>
        
        <button 
          type="button" 
          onClick={() => navigate('/')}
          style={{
            width: '100%',
            padding: '16px',
            background: 'white',
            color: '#7c3aed',
            border: '2px solid #7c3aed',
            borderRadius: '8px',
            fontSize: '17px',
            fontWeight: '700',
            cursor: 'pointer',
            marginTop: '10px'
          }}
          data-testid="cancel-button"
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

// Props Validation
PostGigForm.propTypes = {
  onAddGig: PropTypes.func.isRequired
};

export default PostGigForm;