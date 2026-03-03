import React, { Component } from 'react';
import Header from './components/Header';
import CategoryMenu from './components/CategoryMenu';
import GigList from './components/GigList';
import GigDetail from './components/GigDetail';
import Hero from './components/Hero';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    // Managing the entire app's state here
    this.state = {
      searchQuery: '',
      activeCategory: '',
      currentView: 'home', // 'home' or 'detail'
      selectedGig: null,
      gigs: [],
      isLoading: true
    };
  }

  // React Component Life Cycle - Fetching mock data when app loads
  componentDidMount() {
    setTimeout(() => {
      const mockData = [
        { id: 1, seller: 'Alex T.', title: 'I will build a responsive ReactJS website', price: 150, category: 'Programming & Tech', image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500&q=80', desc: 'I am a senior React developer. I will build a fast, responsive, and modern website tailored specifically to your business needs.' },
        { id: 2, seller: 'John D.', title: 'I will fix your leaking pipes and taps', price: 40, category: 'Plumbing Services', image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=500&q=80', desc: 'Professional plumber with 10 years of experience. I can fix leaks, install new fixtures, and ensure your water systems are perfect.' },
        { id: 3, seller: 'Sarah M.', title: 'I will design and build custom wooden cabinets', price: 300, category: 'Carpentry & Woodwork', image: 'https://images.unsplash.com/photo-1622372736881-c353ee83b482?w=500&q=80', desc: 'I craft custom, high-quality wooden furniture and cabinets. Send me your designs and I will bring them to life.' },
        { id: 4, seller: 'Mike R.', title: 'I will landscape your garden and mow the lawn', price: 80, category: 'Gardening & Landscaping', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=500&q=80', desc: 'Let me transform your backyard into a beautiful paradise. I do mowing, planting, and full landscape design.' },
        { id: 5, seller: 'Elena V.', title: 'I will do full digital marketing and SEO', price: 200, category: 'Digital Marketing', image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=500&q=80', desc: 'I will rank your website on page 1 of Google and manage your social media ads to bring you massive traffic.' },
        { id: 6, seller: 'Bob Builder', title: 'I will do any electrical wiring or repairs', price: 60, category: 'Electrical Works', image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=500&q=80', desc: 'Certified electrician. Safety is my priority. I fix wiring, install panels, and troubleshoot electrical faults.' },
      ];
      this.setState({ gigs: mockData, isLoading: false });
    }, 800); // 0.8s fake load time
  }

  // "Routing" Handlers
  handleSearch = (query) => { this.setState({ searchQuery: query, activeCategory: '', currentView: 'home' }); }
  handleCategorySelect = (category) => { this.setState({ activeCategory: category, searchQuery: '', currentView: 'home' }); }
  handleGigClick = (gig) => { this.setState({ selectedGig: gig, currentView: 'detail' }); }
  handleGoHome = () => { this.setState({ currentView: 'home', searchQuery: '', activeCategory: '' }); }

  render() {
    return (
      <div className="App">
        <Header onSearch={this.handleSearch} goHome={this.handleGoHome} />
        <CategoryMenu onSelectCategory={this.handleCategorySelect} activeCategory={this.state.activeCategory} />
        
        {/* Conditional Rendering: Showing either the Home Page or the Detail Page */}
        {this.state.currentView === 'home' ? (
          <>
            {!this.state.searchQuery && !this.state.activeCategory && <Hero />}
            <div className="main-container">
              <h3>
                {this.state.searchQuery ? `Results for "${this.state.searchQuery}"` : 
                 this.state.activeCategory ? `${this.state.activeCategory} Services` : 
                 "Popular Professional Services"}
              </h3>
              <GigList 
                gigs={this.state.gigs} 
                isLoading={this.state.isLoading}
                searchQuery={this.state.searchQuery}
                activeCategory={this.state.activeCategory}
                onGigClick={this.handleGigClick}
              />
            </div>
          </>
        ) : (
          <GigDetail gig={this.state.selectedGig} goBack={this.handleGoHome} />
        )}
      </div>
    );
  }
}

export default App;