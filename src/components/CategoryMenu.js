import React from 'react';
import PropTypes from 'prop-types';

// Functional Component - Simple but demonstrates props and event handling
function CategoryMenu({ onSelectCategory, activeCategory }) {
  const categories = [
    "Programming & Tech",
    "Carpentry & Woodwork",
    "Plumbing Services",
    "Gardening & Landscaping",
    "Electrical Works",
    "Digital Marketing"
  ];

  return (
    <div className="category-menu" data-testid="category-menu">
      {categories.map((cat, index) => (
        <span 
          key={index} 
          className={activeCategory === cat ? 'active' : ''}
          onClick={() => onSelectCategory(cat)}
          data-testid={`category-${cat.toLowerCase().replace(/\s+/g, '-')}`}
        >
          {cat}
        </span>
      ))}
    </div>
  );
}

// Props Validation
CategoryMenu.propTypes = {
  onSelectCategory: PropTypes.func.isRequired,
  activeCategory: PropTypes.string.isRequired
};

export default CategoryMenu;