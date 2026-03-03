import React from 'react';
import { Link } from 'react-router-dom';

// Footer Component with semantic HTML5 elements
function Footer() {
  return (
    <footer className="footer" data-testid="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>About OmniGigs</h4>
          <p style={{color: '#94a3b8'}}>
            Your one-stop marketplace for freelance services. 
            Connect with talented professionals worldwide.
          </p>
        </div>
        
        <div className="footer-section">
          <h4>For Clients</h4>
          <ul>
            <li><Link to="/">Find Services</Link></li>
            <li><Link to="/">How it Works</Link></li>
            <li><Link to="/">Success Stories</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>For Freelancers</h4>
          <ul>
            <li><Link to="/post-gig">Post a Service</Link></li>
            <li><Link to="/">Become a Seller</Link></li>
            <li><Link to="/">Resources</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Support</h4>
          <ul>
            <li><Link to="/">Help Center</Link></li>
            <li><Link to="/">Trust & Safety</Link></li>
            <li><Link to="/">Contact Us</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>© 2025 OmniGigs. All rights reserved. | Built with React for Web Programming Course</p>
      </div>
    </footer>
  );
}

export default Footer;