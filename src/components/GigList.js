import React, { Component } from 'react';
import GigCard from './GigCard';

class GigList extends Component {
  render() {
    const { gigs, isLoading, searchQuery, activeCategory, onGigClick } = this.props;

    if (isLoading) {
      return <h2>Loading professional services...</h2>;
    }

    // Filtering logic based on search OR category
    let filteredGigs = gigs;
    if (searchQuery) {
      filteredGigs = gigs.filter(gig => 
        gig.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        gig.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    } else if (activeCategory) {
      filteredGigs = gigs.filter(gig => gig.category === activeCategory);
    }

    return (
      <div className="gig-grid">
        {filteredGigs.length > 0 ? (
          filteredGigs.map(gig => (
            <GigCard key={gig.id} gig={gig} onClick={() => onGigClick(gig)} />
          ))
        ) : (
          <p>No services found. Try searching for something else!</p>
        )}
      </div>
    );
  }
}

export default GigList;