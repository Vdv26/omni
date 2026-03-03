import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { AppContext } from '../App';
import GigCard from './GigCard';

// Favorites Component - demonstrates Context API usage
function Favorites({ gigs }) {
  const { favorites } = useContext(AppContext);
  
  // Using a for loop to demonstrate traditional JavaScript loop (syllabus requirement)
  const favoriteGigs = [];
  for (let i = 0; i < gigs.length; i++) {
    if (favorites.includes(gigs[i].id)) {
      favoriteGigs.push(gigs[i]);
    }
  }

  return (
    <div className="main-container" data-testid="favorites-page">
      <h2>My Favorites</h2>
      <p style={{color: '#64748b', marginBottom: '30px'}}>
        {favoriteGigs.length} service{favoriteGigs.length !== 1 ? 's' : ''} saved
      </p>
      
      {favoriteGigs.length > 0 ? (
        <div className="gig-grid">
          {favoriteGigs.map(gig => (
            <GigCard key={gig.id} gig={gig} />
          ))}
        </div>
      ) : (
        <div className="empty-state" data-testid="empty-favorites">
          <h3>💔 No favorites yet</h3>
          <p>Start exploring services and add them to your favorites!</p>
        </div>
      )}
    </div>
  );
}

// Props Validation
Favorites.propTypes = {
  gigs: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired
  })).isRequired
};

export default Favorites;