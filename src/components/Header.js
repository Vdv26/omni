import React, { Component } from 'react';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { inputValue: '' };
  }

  handleInputChange = (e) => { this.setState({ inputValue: e.target.value }); }

  handleSearchSubmit = () => { this.props.onSearch(this.state.inputValue); }

  render() {
    return (
      <header className="header">
        <h1 className="logo" onClick={this.props.goHome}>Omni<span>Gigs</span></h1>
        <div className="search-bar">
          <input 
            type="text" 
            placeholder="Find services (e.g. website, plumbing, garden)" 
            value={this.state.inputValue}
            onChange={this.handleInputChange}
          />
          <button onClick={this.handleSearchSubmit}>Search</button>
        </div>
        <div>
          <strong style={{cursor: 'pointer'}}>Sign In / Join</strong>
        </div>
      </header>
    );
  }
}

export default Header;