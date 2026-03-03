import React from 'react';

function CategoryMenu({ onSelectCategory, activeCategory }) {
  const categories = [
    "Programming & Tech", "Carpentry & Woodwork", "Plumbing Services", 
    "Gardening & Landscaping", "Electrical Works", "Digital Marketing"
  ];

  return (
    <div className="category-menu">
      {categories.map((cat, index) => (
        <span 
          key={index} 
          className={activeCategory === cat ? 'active' : ''}
          onClick={() => onSelectCategory(cat)}
        >
          {cat}
        </span>
      ))}
    </div>
  );
}

export default CategoryMenu;