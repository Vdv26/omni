import React, { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AppContext } from '../App';
import ContactModal from './ContactModal';
import RatingCanvas from './RatingCanvas';

// Functional Component with Hooks and Modal demonstration (z-index)
function GigDetail({ gigs }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useContext(AppContext);
  const [showContactModal, setShowContactModal] = useState(false);
  
  const gig = gigs.find(g => g.id === parseInt(id));
  
  if (!gig) {
    return (
      <div className="detail-container" data-testid="gig-not-found">
        <h2>Gig not found</h2>
        <button className="back-btn" onClick={() => navigate('/')}>Go Back Home</button>
      </div>
    );
  }

  const isFavorite = favorites.includes(gig.id);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleContactSeller = () => {
    setShowContactModal(true);
  };

  const handleCheckout = () => {
    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    
    if (!user || !user.loggedIn) {
      // Redirect to login with return path
      navigate('/login', { state: { from: `/payment` } });
    } else {
      // Navigate to payment page with gig data
      navigate('/payment', { state: { gig } });
    }
  };

  return (
    <div className="detail-container" data-testid="gig-detail">
      <button className="back-btn" onClick={handleGoBack} data-testid="back-button">
        ← Back to Results
      </button>
      
      <h1 className="detail-title" data-testid="detail-title">{gig.title}</h1>
      
      <div className="seller-info" style={{marginBottom: '20px', fontSize: '18px'}}>
        <div className="avatar" style={{width: '40px', height: '40px', fontSize: '18px'}}>
          {gig.seller.charAt(0)}
        </div>
        <span className="seller-name">{gig.seller}</span>
        <span className="category-badge" style={{fontSize: '14px'}}>{gig.category}</span>
        {gig.rating && (
          <span className="rating" style={{marginLeft: '10px'}}>
            ⭐ {gig.rating}
          </span>
        )}
      </div>

      <img 
        src={gig.image} 
        alt={gig.title} 
        className="detail-image" 
        data-testid="detail-image"
      />
      
      {/* Canvas Rating Visualization */}
      <RatingCanvas rating={gig.rating || 4.5} />
      
      <div className="detail-content">
        <div className="detail-desc">
          <h3>About This Gig</h3>
          <p data-testid="gig-description">{gig.desc}</p>
          
          <h3 style={{marginTop: '30px'}}>Features Included</h3>
          <ul>
            {gig.features && gig.features.map((feature, idx) => (
              <li key={idx}>✓ {feature}</li>
            ))}
          </ul>
          
          <h3 style={{marginTop: '30px'}}>Why choose me?</h3>
          <ul>
            <li>Professional & Reliable</li>
            <li>100% Satisfaction Guaranteed</li>
            <li>Fast Delivery</li>
            <li>24/7 Customer Support</li>
          </ul>
        </div>
        
        <div className="detail-sidebar" data-testid="detail-sidebar">
          <h4>${gig.price}</h4>
          <p style={{color: '#64748b', marginBottom: '20px'}}>Standard Package</p>
          
          <div className="feature-list">
            {gig.features && gig.features.map((feature, idx) => (
              <p key={idx}>✓ {feature}</p>
            ))}
          </div>
          
          <button 
            className="buy-btn" 
            onClick={() => alert('Checkout functionality would be implemented here!')}
            data-testid="checkout-button"
          >
            Continue to Checkout
          </button>
          
          <button 
            className="buy-btn" 
            onClick={handleContactSeller}
            style={{marginTop: '10px', background: 'white', color: '#7c3aed', border: '2px solid #7c3aed'}}
            data-testid="contact-seller-button"
          >
            Contact Seller
          </button>
          
          <button 
            className="buy-btn" 
            onClick={() => toggleFavorite(gig.id)}
            style={{
              marginTop: '10px',
              background: isFavorite ? '#ef4444' : 'white',
              color: isFavorite ? 'white' : '#ef4444',
              border: '2px solid #ef4444'
            }}
            data-testid="toggle-favorite-button"
          >
            {isFavorite ? '❤️ Remove from Favorites' : '🤍 Add to Favorites'}
          </button>
        </div>
      </div>
      
      {/* Modal Component - demonstrates z-index layering */}
      {showContactModal && (
        <ContactModal 
          seller={gig.seller}
          onClose={() => setShowContactModal(false)}
        />
      )}
    </div>
  );
}

// Props Validation
GigDetail.propTypes = {
  gigs: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    seller: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired
  })).isRequired
};

export default GigDetail;