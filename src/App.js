import React, { useState, useEffect, useMemo, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from './components/Header';
import CategoryMenu from './components/CategoryMenu';
import GigList from './components/GigList';
import GigDetail from './components/GigDetail';
import Hero from './components/Hero';
import PostGigForm from './components/PostGigForm';
import Favorites from './components/Favorites';
import UserProfile from './components/UserProfile';
import Footer from './components/Footer';
import './App.css';

// Context API for global state management (React Context demonstration)
export const AppContext = createContext();

function App() {
  // State management using React Hooks (useState, useEffect)
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('');
  const [gigs, setGigs] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState('default');
  const [priceRange, setPriceRange] = useState([0, 500]);

  // Component Life Cycle - useEffect Hook (replaces componentDidMount)
  useEffect(() => {
    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }

    // Fetch mock data with setTimeout (simulating API call)
    const timer = setTimeout(() => {
      const mockData = [
        { id: 1, seller: 'Alex T.', title: 'I will build a responsive ReactJS website', price: 150, rating: 4.9, category: 'Programming & Tech', image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500&q=80', desc: 'I am a senior React developer with 8+ years of experience. I will build a fast, responsive, and modern website tailored specifically to your business needs using the latest React 19 features.', features: ['Responsive Design', 'Fast Loading', 'SEO Optimized'] },
        { id: 2, seller: 'John D.', title: 'I will fix your leaking pipes and taps', price: 40, rating: 4.7, category: 'Plumbing Services', image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=500&q=80', desc: 'Professional plumber with 10 years of experience. I can fix leaks, install new fixtures, and ensure your water systems are perfect.', features: ['24/7 Available', 'Licensed', 'Emergency Service'] },
        { id: 3, seller: 'Sarah M.', title: 'I will design and build custom wooden cabinets', price: 300, rating: 5.0, category: 'Carpentry & Woodwork', image: 'https://images.unsplash.com/photo-1622372736881-c353ee83b482?w=500&q=80', desc: 'I craft custom, high-quality wooden furniture and cabinets. Send me your designs and I will bring them to life with precision and care.', features: ['Custom Design', 'Quality Wood', 'Lifetime Warranty'] },
        { id: 4, seller: 'Mike R.', title: 'I will landscape your garden and mow the lawn', price: 80, rating: 4.8, category: 'Gardening & Landscaping', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=500&q=80', desc: 'Let me transform your backyard into a beautiful paradise. I do mowing, planting, and full landscape design with eco-friendly practices.', features: ['Eco-Friendly', 'Weekly Service', 'Garden Design'] },
        { id: 5, seller: 'Elena V.', title: 'I will do full digital marketing and SEO', price: 200, rating: 4.9, category: 'Digital Marketing', image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=500&q=80', desc: 'I will rank your website on page 1 of Google and manage your social media ads to bring you massive traffic and conversions.', features: ['SEO Audit', 'Social Media', 'Monthly Reports'] },
        { id: 6, seller: 'Bob Builder', title: 'I will do any electrical wiring or repairs', price: 60, rating: 4.6, category: 'Electrical Works', image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=500&q=80', desc: 'Certified electrician with safety as my top priority. I fix wiring, install panels, and troubleshoot electrical faults professionally.', features: ['Certified', 'Safety First', 'Free Inspection'] },
        { id: 7, seller: 'Maria L.', title: 'I will create stunning graphic designs', price: 120, rating: 4.8, category: 'Digital Marketing', image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=500&q=80', desc: 'Professional graphic designer specializing in branding, logos, and marketing materials. Let me bring your vision to life!', features: ['Unlimited Revisions', 'Fast Delivery', 'Print Ready'] },
        { id: 8, seller: 'Tom H.', title: 'I will build full-stack web applications', price: 350, rating: 5.0, category: 'Programming & Tech', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&q=80', desc: 'Full-stack developer proficient in React, Node.js, and MongoDB. I build scalable, secure web applications from scratch.', features: ['Full Stack', 'Database Design', 'API Development'] }
      ];
      setGigs(mockData);
      setIsLoading(false);
    }, 800);

    // Cleanup function (demonstrated in useEffect)
    return () => clearTimeout(timer);
  }, []);

  // Save favorites to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Event Handlers
  const handleSearch = (query) => {
    setSearchQuery(query);
    setActiveCategory('');
  };

  const handleCategorySelect = (category) => {
    setActiveCategory(category);
    setSearchQuery('');
  };

  const handleAddGig = (newGig) => {
    setGigs([...gigs, { ...newGig, id: gigs.length + 1 }]);
  };

  const toggleFavorite = (gigId) => {
    setFavorites(prev => 
      prev.includes(gigId) 
        ? prev.filter(id => id !== gigId)
        : [...prev, gigId]
    );
  };

  // Filtered and Sorted Gigs using useMemo (performance optimization)
  const filteredAndSortedGigs = useMemo(() => {
    let result = [...gigs];

    // Filter by search query
    if (searchQuery) {
      result = result.filter(gig => 
        gig.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        gig.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (activeCategory) {
      result = result.filter(gig => gig.category === activeCategory);
    }

    // Filter by price range
    result = result.filter(gig => gig.price >= priceRange[0] && gig.price <= priceRange[1]);

    // Sort gigs
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [gigs, searchQuery, activeCategory, sortBy, priceRange]);

  // Context value
  const contextValue = {
    gigs,
    favorites,
    toggleFavorite,
    isLoading,
    sortBy,
    setSortBy,
    priceRange,
    setPriceRange
  };

  return (
    <Router>
      <AppContext.Provider value={contextValue}>
        <div className="App" data-testid="app-container">
          <Header onSearch={handleSearch} />
          <CategoryMenu 
            onSelectCategory={handleCategorySelect} 
            activeCategory={activeCategory} 
          />
          
          <Routes>
            <Route path="/" element={
              <HomePage 
                searchQuery={searchQuery}
                activeCategory={activeCategory}
                filteredGigs={filteredAndSortedGigs}
              />
            } />
            <Route path="/gig/:id" element={<GigDetail gigs={gigs} />} />
            <Route path="/post-gig" element={<PostGigForm onAddGig={handleAddGig} />} />
            <Route path="/favorites" element={<Favorites gigs={gigs} />} />
            <Route path="/profile" element={<UserProfile />} />
          </Routes>
          
          <Footer />
        </div>
      </AppContext.Provider>
    </Router>
  );
}

// Home Page Component
function HomePage({ searchQuery, activeCategory, filteredGigs }) {
  return (
    <>
      {!searchQuery && !activeCategory && <Hero />}
      <div className="main-container">
        <h3 data-testid="page-title">
          {searchQuery ? `Results for "${searchQuery}"` : 
           activeCategory ? `${activeCategory} Services` : 
           "Popular Professional Services"}
        </h3>
        <GigList gigs={filteredGigs} />
      </div>
    </>
  );
}

HomePage.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  activeCategory: PropTypes.string.isRequired,
  filteredGigs: PropTypes.array.isRequired
};

export default App;