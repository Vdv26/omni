import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AppContext } from '../App';

// Functional Component with mouseover/mouseout events
function GigCard({ gig }) {
  const { favorites, toggleFavorite } = useContext(AppContext);
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const { id, seller, title, price, category, image, rating } = gig;
  const isFavorite = favorites.includes(id);

  // Event handler - onClick
  const handleCardClick = () => {
    navigate(`/gig/${id}`);
  };

  // Event handler - toggle favorite
  const handleFavoriteClick = (e) => {
    e.stopPropagation(); // Prevent card click
    toggleFavorite(id);
  };

  // Event handlers - onMouseOver and onMouseOut (JavaScript Events demonstration)
  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseOut = () => {
    setIsHovered(false);
  };

  return (
    <div 
      className="gig-card" 
      onClick={handleCardClick}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      data-testid={`gig-card-${id}`}
      style={{
        transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
        transition: 'transform 0.3s ease'
      }}
    >
      <img src={image} alt={title} className="gig-image" data-testid="gig-image" />
      
      <div className="gig-info">
        <div className="seller-info">
          <div className="avatar" data-testid="seller-avatar">{seller.charAt(0)}</div>
          <span className="seller-name" data-testid="seller-name">{seller}</span>
          <span className="category-badge" data-testid="category-badge">{category}</span>
        </div>
        
        <p className="gig-title" data-testid="gig-title">{title}</p>
        
        {rating && (
          <div className="rating" data-testid="gig-rating">
            <span>⭐</span>
            <span>{rating}</span>
          </div>
        )}
      </div>
      
      <div className="gig-footer">
        <div className="gig-price" data-testid="gig-price">
          STARTING AT <span>${price}</span>
        </div>
        
        <button 
          className={`favorite-btn ${isFavorite ? 'active' : ''}`}
          onClick={handleFavoriteClick}
          title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          data-testid="favorite-button"
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>
      </div>
    </div>
  );
}

// Props Validation
GigCard.propTypes = {
  gig: PropTypes.shape({
    id: PropTypes.number.isRequired,
    seller: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    rating: PropTypes.number
  }).isRequired
};

export default GigCard;