import React, { useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AppContext } from '../App';

// Functional Component with Hooks (replaces class component)
function Header({ onSearch }) {
  const [inputValue, setInputValue] = useState('');
  const { favorites, user, handleLogout } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();

  // Event Handler - onChange
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Event Handler - onClick
  const handleSearchSubmit = () => {
    if (inputValue.trim()) {
      onSearch(inputValue);
      navigate('/');
    }
  };

  // Event Handler - onKeyPress
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  const handleLogoClick = () => {
    setInputValue('');
    onSearch('');
    navigate('/');
  };

  return (
    <header className="header" data-testid="header">
      <h1 className="logo" onClick={handleLogoClick} data-testid="logo">
        Omni<span>Gigs</span>
      </h1>
      
      <div className="search-bar" data-testid="search-bar">
        <input 
          type="text" 
          placeholder="Find services (e.g. website, plumbing, garden)" 
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          data-testid="search-input"
        />
        <button onClick={handleSearchSubmit} data-testid="search-button">Search</button>
      </div>
      
      <div className="header-actions">
        <Link 
          to="/post-gig" 
          className={`header-link ${location.pathname === '/post-gig' ? 'active' : ''}`}
          data-testid="post-gig-link"
        >
          Post a Gig
        </Link>
        
        <Link 
          to="/favorites" 
          className={`header-link favorites-badge ${location.pathname === '/favorites' ? 'active' : ''}`}
          data-testid="favorites-link"
        >
          Favorites
          {favorites.length > 0 && (
            <span className="badge-count" data-testid="favorites-count">{favorites.length}</span>
          )}
        </Link>
        
        <Link 
          to="/profile" 
          className={`header-link ${location.pathname === '/profile' ? 'active' : ''}`}
          data-testid="profile-link"
        >
          Profile
        </Link>
      </div>
    </header>
  );
}

// Props Validation
Header.propTypes = {
  onSearch: PropTypes.func.isRequired
};

export default Header;