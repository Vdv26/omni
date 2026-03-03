import React from 'react';
import { useNavigate } from 'react-router-dom';

// Functional Component with event handlers
function Hero() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/post-gig');
  };

  return (
    <div className="hero" data-testid="hero-section">
      <div className="hero-content">
        <h2 data-testid="hero-title">Find the perfect freelance services for your business</h2>
        <p data-testid="hero-subtitle">
          From software engineering to fixing your kitchen sink, we have it all.
        </p>
        <button 
          className="hero-button" 
          onClick={handleGetStarted}
          data-testid="hero-button"
        >
          Get Started →
        </button>
      </div>
    </div>
  );
}

export default Hero;