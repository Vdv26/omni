import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import GigCard from './GigCard';
import { AppContext } from '../App';

// Functional Component with Context and Conditional Rendering
function GigList({ gigs }) {
  const { isLoading, sortBy, setSortBy, priceRange, setPriceRange } = useContext(AppContext);

  if (isLoading) {
    return <div className="loading" data-testid="loading">Loading professional services</div>;
  }

  // Event handler for sort change
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  // Event handler for price range
  const handlePriceChange = (e) => {
    const value = parseInt(e.target.value);
    setPriceRange([0, value]);
  };

  return (
    <>
      <div className="controls-bar" data-testid="controls-bar">
        <div className="sort-dropdown">
          <label htmlFor="sort-select">Sort by: </label>
          <select 
            id="sort-select"
            value={sortBy} 
            onChange={handleSortChange}
            data-testid="sort-select"
          >
            <option value="default">Default</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rating</option>
          </select>
        </div>
        
        <div className="price-filter">
          <label htmlFor="price-range">Max Price: ₹{priceRange[1]}</label>
          <input 
            type="range" 
            id="price-range"
            min="0" 
            max="50000" 
            value={priceRange[1]}
            onChange={handlePriceChange}
            data-testid="price-range-slider"
          />
        </div>
      </div>

      <div className="gig-grid" data-testid="gig-grid">
        {gigs.length > 0 ? (
          gigs.map(gig => (
            <GigCard key={gig.id} gig={gig} />
          ))
        ) : (
          <div className="empty-state" data-testid="empty-state">
            <h3>No services found</h3>
            <p>Try adjusting your filters or search for something else!</p>
          </div>
        )}
      </div>
    </>
  );
}

// Props Validation
GigList.propTypes = {
  gigs: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    seller: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired
  })).isRequired
};

export default GigList;