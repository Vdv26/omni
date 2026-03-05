import React from 'react';
import PropTypes from 'prop-types';

// CategoryMenu bar removed - category filtering is now handled
// by the "Get Started" modal in Hero.js
// This file is kept so App.js imports don't break.
function CategoryMenu({ onSelectCategory, activeCategory }) {
  return null;
}

CategoryMenu.propTypes = {
  onSelectCategory: PropTypes.func.isRequired,
  activeCategory: PropTypes.string.isRequired
};

export default CategoryMenu;