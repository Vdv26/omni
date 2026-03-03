import React, { Component } from 'react';

class GigDetail extends Component {
  render() {
    const { gig, goBack } = this.props;

    if (!gig) return null;

    return (
      <div className="detail-container">
        <button className="back-btn" onClick={goBack}>&larr; Back to Results</button>
        
        <h1 className="detail-title">{gig.title}</h1>
        
        <div className="seller-info" style={{marginBottom: '20px', fontSize: '18px'}}>
          <div className="avatar" style={{width: '40px', height: '40px', fontSize: '18px'}}>{gig.seller.charAt(0)}</div>
          <span className="seller-name">{gig.seller}</span>
          <span className="category-badge" style={{fontSize: '14px'}}>{gig.category}</span>
        </div>

        <img src={gig.image} alt={gig.title} className="detail-image" />
        
        <div className="detail-content">
          <div className="detail-desc">
            <h3>About This Gig</h3>
            <p>{gig.desc}</p>
            <p><strong>Why choose me?</strong></p>
            <ul>
              <li>Professional & Reliable</li>
              <li>100% Satisfaction Guaranteed</li>
              <li>Fast Delivery</li>
            </ul>
          </div>
          
          <div className="detail-sidebar">
            <h4>${gig.price}</h4>
            <p style={{color: '#62646a'}}>Standard Package</p>
            <p>✓ Fast Response</p>
            <p>✓ High Quality Work</p>
            <button className="buy-btn">Continue to Checkout</button>
          </div>
        </div>
      </div>
    );
  }
}

export default GigDetail;