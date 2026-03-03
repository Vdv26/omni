import React, { useState } from 'react';

function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
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
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  return (
    <div className="main-container" data-testid="contact-us-page">
      <div style={{maxWidth: '900px', margin: '0 auto'}}>
        <h1 style={{fontSize: '36px', marginBottom: '20px'}}>Contact Us</h1>
        <p style={{color: '#64748b', fontSize: '18px', marginBottom: '40px'}}>
          Have questions? We're here to help! Reach out to us through any of the channels below.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '30px',
          marginBottom: '40px'
        }}>
          {/* Phone Numbers */}
          <div style={{
            background: 'white',
            padding: '30px',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            textAlign: 'center'
          }}>
            <div style={{fontSize: '48px', marginBottom: '15px'}}>📞</div>
            <h3 style={{marginBottom: '15px'}}>Call Us</h3>
            <p style={{color: '#64748b', marginBottom: '15px'}}>Available 24/7 for your support</p>
            <div style={{fontSize: '18px', fontWeight: '600', color: '#7c3aed', marginBottom: '10px'}}>
              📱 Mobile: +1 (555) 123-4567
            </div>
            <div style={{fontSize: '18px', fontWeight: '600', color: '#7c3aed'}}>
              ☎️ Telephone: +1 (555) 987-6543
            </div>
          </div>

          {/* Email */}
          <div style={{
            background: 'white',
            padding: '30px',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            textAlign: 'center'
          }}>
            <div style={{fontSize: '48px', marginBottom: '15px'}}>📧</div>
            <h3 style={{marginBottom: '15px'}}>Email Us</h3>
            <p style={{color: '#64748b', marginBottom: '15px'}}>We'll respond within 24 hours</p>
            <div style={{fontSize: '18px', fontWeight: '600', color: '#7c3aed', marginBottom: '10px'}}>
              support@omnigigs.com
            </div>
            <div style={{fontSize: '18px', fontWeight: '600', color: '#7c3aed'}}>
              business@omnigigs.com
            </div>
          </div>

          {/* Address */}
          <div style={{
            background: 'white',
            padding: '30px',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            textAlign: 'center'
          }}>
            <div style={{fontSize: '48px', marginBottom: '15px'}}>📍</div>
            <h3 style={{marginBottom: '15px'}}>Visit Us</h3>
            <p style={{color: '#64748b', marginBottom: '15px'}}>Our office location</p>
            <div style={{fontSize: '16px', color: '#64748b', lineHeight: '1.8'}}>
              123 Business Street<br />
              Tech Park, Suite 456<br />
              San Francisco, CA 94102<br />
              United States
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div style={{
          background: 'white',
          padding: '40px',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
        }}>
          <h2 style={{marginBottom: '20px'}}>Send Us a Message</h2>
          
          {!submitted ? (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="contact-name">Your Name *</label>
                <input
                  type="text"
                  id="contact-name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-email">Your Email *</label>
                <input
                  type="email"
                  id="contact-email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="you@example.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-subject">Subject *</label>
                <input
                  type="text"
                  id="contact-subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="How can we help?"
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-message">Message *</label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Tell us more about your inquiry..."
                  rows="6"
                />
              </div>

              <button type="submit" className="submit-btn">
                Send Message
              </button>
            </form>
          ) : (
            <div style={{
              textAlign: 'center',
              padding: '40px 0'
            }}>
              <div style={{fontSize: '64px', marginBottom: '20px'}}>✅</div>
              <h3 style={{marginBottom: '12px'}}>Message Sent Successfully!</h3>
              <p style={{color: '#64748b'}}>
                Thank you for contacting us. We'll get back to you within 24 hours.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ContactUs;