import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Modal Component - demonstrates z-index layering and form controls
function ContactModal({ seller, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  return (
    <div className="modal-overlay" onClick={onClose} data-testid="contact-modal">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} data-testid="modal-close-button">
          &times;
        </button>
        
        {!submitted ? (
          <>
            <h2>Contact {seller}</h2>
            <p style={{color: '#64748b', marginBottom: '24px'}}>
              Send a message to the seller to discuss your project requirements.
            </p>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="contact-name">Your Name</label>
                <input
                  type="text"
                  id="contact-name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  data-testid="contact-name-input"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="contact-email">Your Email</label>
                <input
                  type="email"
                  id="contact-email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  data-testid="contact-email-input"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="contact-message">Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Hi, I'm interested in your service..."
                  data-testid="contact-message-textarea"
                />
              </div>
              
              <button type="submit" className="submit-btn" data-testid="contact-submit-button">
                Send Message
              </button>
            </form>
          </>
        ) : (
          <div style={{textAlign: 'center', padding: '40px 0'}}>
            <div style={{fontSize: '64px', marginBottom: '16px'}}>✔️</div>
            <h3>Message Sent!</h3>
            <p style={{color: '#64748b'}}>The seller will respond to you soon.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Props Validation
ContactModal.propTypes = {
  seller: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired
};

export default ContactModal;