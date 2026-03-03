import React from 'react';

function GigCard({ gig, onClick }) {
  const { seller, title, price, category, image } = gig;

  return (
    <div className="gig-card" onClick={onClick}>
      <img src={image} alt={title} className="gig-image" />
      <div className="gig-info">
        <div className="seller-info">
          <div className="avatar">{seller.charAt(0)}</div>
          <span className="seller-name">{seller}</span>
          <span className="category-badge">{category}</span>
        </div>
        <p className="gig-title">{title}</p>
      </div>
      <div className="gig-footer">
        <div className="gig-price">
          STARTING AT <span>${price}</span>
        </div>
      </div>
    </div>
  );
}

export default GigCard;