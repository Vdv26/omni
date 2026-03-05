import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AppContext } from '../App';

const SERVICE_OPTIONS = [
  { id: 1, emoji: '💻', label: 'Programming & Tech',      description: 'Websites, apps, APIs',         category: 'Programming & Tech'      },
  { id: 2, emoji: '🔨', label: 'Carpentry & Woodwork',    description: 'Furniture, repairs, builds',   category: 'Carpentry & Woodwork'    },
  { id: 3, emoji: '🔧', label: 'Plumbing Services',       description: 'Pipes, leaks, installations',  category: 'Plumbing Services'       },
  { id: 4, emoji: '🌿', label: 'Gardening & Landscaping', description: 'Lawn care, planting, design',  category: 'Gardening & Landscaping' },
  { id: 5, emoji: '⚡', label: 'Electrical Works',        description: 'Wiring, fixtures, repairs',    category: 'Electrical Works'        },
  { id: 6, emoji: '📣', label: 'Digital Marketing',       description: 'SEO, ads, social media',       category: 'Digital Marketing'       }
];

function Hero({ onSearch, onSelectCategory }) {
  const navigate = useNavigate();

  // Read the full gigs list straight from context — no prop needed
  const { allGigs } = useContext(AppContext);

  const [showModal, setShowModal]             = useState(false);
  const [step, setStep]                       = useState(1);
  const [selectedService, setSelectedService] = useState(null);
  const [hoveredGigId, setHoveredGigId]       = useState(null);
  const [hoveredCardId, setHoveredCardId]     = useState(null);

  // Filter the full gigs list by the chosen category
  const gigsForCategory = selectedService
    ? (allGigs || []).filter(g => g.category === selectedService.category)
    : [];

  const handleGetStarted = () => {
    setShowModal(true);
    setStep(1);
    setSelectedService(null);
  };

  const handleServiceClick = (service) => {
    setSelectedService(service);
    setStep(2);
    // Also filter the main gig list in the background (replaces CategoryMenu)
    if (onSelectCategory) onSelectCategory(service.category);
  };

  const handleGigClick = (gig) => {
    setShowModal(false);
    navigate(`/gig/${gig.id}`);
  };

  // Close modal — main list is already filtered
  const handleViewAll = () => {
    setShowModal(false);
    navigate('/');
  };

  const handleBrowseAll = () => {
    if (onSelectCategory) onSelectCategory('');
    if (onSearch) onSearch('');
    setShowModal(false);
    navigate('/');
  };

  const handleBack = () => {
    setStep(1);
    setSelectedService(null);
  };

  const handleClose = () => {
    setShowModal(false);
    setStep(1);
    setSelectedService(null);
  };

  return (
    <>
      {/* ── Hero Banner ── */}
      <div className="hero" data-testid="hero-section">
        <div className="hero-content">
          <h2 data-testid="hero-title">
            Find the perfect freelance services for your business
          </h2>
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

      {/* ── Modal ── */}
      {showModal && (
        <div
          className="modal-overlay"
          onClick={handleClose}
          data-testid="service-picker-modal"
          style={{ zIndex: 1000 }}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: step === 2 ? '760px' : '660px',
              width: '92%',
              padding: '36px',
              borderRadius: '16px',
              position: 'relative',
              maxHeight: '88vh',
              overflowY: 'auto'
            }}
          >
            {/* Close */}
            <button
              className="modal-close"
              onClick={handleClose}
              data-testid="modal-close-button"
              style={{ fontSize: '24px' }}
            >
              &times;
            </button>

            {/* ════ STEP 1: Pick a category ════ */}
            {step === 1 && (
              <>
                <div style={{ marginBottom: '28px', textAlign: 'center' }}>
                  <div style={{ fontSize: '48px', marginBottom: '8px' }}>🎯</div>
                  <h2 style={{ margin: '0 0 8px 0', fontSize: '24px', color: '#1e293b' }}>
                    What service do you need?
                  </h2>
                  <p style={{ color: '#64748b', margin: 0, fontSize: '15px' }}>
                    Pick a category and we'll show you available services instantly.
                  </p>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '14px'
                }}>
                  {SERVICE_OPTIONS.map((service) => {
                    // Show live count on each card
                    const count = (allGigs || []).filter(g => g.category === service.category).length;
                    return (
                      <button
                        key={service.id}
                        onClick={() => handleServiceClick(service)}
                        data-testid={`service-option-${service.id}`}
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          padding: '22px 12px',
                          background: hoveredCardId === service.id ? '#ede9fe' : '#f8fafc',
                          border: `2px solid ${hoveredCardId === service.id ? '#7c3aed' : '#e2e8f0'}`,
                          borderRadius: '12px',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          gap: '6px',
                          fontFamily: 'inherit',
                          transform: hoveredCardId === service.id ? 'translateY(-3px)' : 'translateY(0)',
                          boxShadow: hoveredCardId === service.id ? '0 8px 20px rgba(124,58,237,0.15)' : 'none',
                          position: 'relative'
                        }}
                        onMouseOver={() => setHoveredCardId(service.id)}
                        onMouseOut={() => setHoveredCardId(null)}
                      >
                        <span style={{ fontSize: '34px' }}>{service.emoji}</span>
                        <span style={{
                          fontWeight: '700', fontSize: '13px', color: '#1e293b',
                          lineHeight: '1.3', textAlign: 'center'
                        }}>
                          {service.label}
                        </span>
                        <span style={{ fontSize: '12px', color: '#94a3b8', textAlign: 'center' }}>
                          {service.description}
                        </span>
                        {/* Live service count badge */}
                        <span style={{
                          marginTop: '4px',
                          padding: '2px 10px',
                          background: count > 0 ? '#ede9fe' : '#f1f5f9',
                          color: count > 0 ? '#7c3aed' : '#94a3b8',
                          borderRadius: '20px',
                          fontSize: '11px',
                          fontWeight: '700'
                        }}>
                          {count} service{count !== 1 ? 's' : ''}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <p style={{ marginTop: '24px', fontSize: '13px', color: '#94a3b8', textAlign: 'center' }}>
                  Not sure?{' '}
                  <button
                    onClick={handleBrowseAll}
                    style={{
                      background: 'none', border: 'none', color: '#7c3aed',
                      cursor: 'pointer', fontWeight: '600', fontSize: '13px',
                      padding: 0, textDecoration: 'underline'
                    }}
                  >
                    Browse everything →
                  </button>
                </p>
              </>
            )}

            {/* ════ STEP 2: Show gigs in chosen category ════ */}
            {step === 2 && selectedService && (
              <>
                <div style={{ marginBottom: '20px' }}>
                  <button
                    onClick={handleBack}
                    style={{
                      background: 'none', border: 'none', cursor: 'pointer',
                      color: '#7c3aed', fontWeight: '600', fontSize: '14px',
                      padding: '0 0 14px 0', display: 'flex', alignItems: 'center', gap: '6px'
                    }}
                  >
                    ← Back to categories
                  </button>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <span style={{ fontSize: '40px' }}>{selectedService.emoji}</span>
                    <div>
                      <h2 style={{ margin: '0 0 4px 0', fontSize: '22px', color: '#1e293b' }}>
                        {selectedService.label}
                      </h2>
                      <p style={{ margin: 0, color: '#64748b', fontSize: '14px' }}>
                        {gigsForCategory.length} service{gigsForCategory.length !== 1 ? 's' : ''} available
                      </p>
                    </div>
                  </div>
                </div>

                <div style={{ height: '1px', background: '#e2e8f0', marginBottom: '20px' }} />

                {gigsForCategory.length > 0 ? (
                  <>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {gigsForCategory.map((gig) => (
                        <div
                          key={gig.id}
                          onClick={() => handleGigClick(gig)}
                          data-testid={`modal-gig-${gig.id}`}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '16px',
                            padding: '14px 16px',
                            background: hoveredGigId === gig.id ? '#ede9fe' : '#f8fafc',
                            border: `2px solid ${hoveredGigId === gig.id ? '#7c3aed' : '#e2e8f0'}`,
                            borderRadius: '12px',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            transform: hoveredGigId === gig.id ? 'translateX(4px)' : 'translateX(0)'
                          }}
                          onMouseOver={() => setHoveredGigId(gig.id)}
                          onMouseOut={() => setHoveredGigId(null)}
                        >
                          <img
                            src={gig.image}
                            alt={gig.title}
                            style={{
                              width: '72px', height: '56px',
                              objectFit: 'cover', borderRadius: '8px', flexShrink: 0
                            }}
                          />

                          <div style={{ flex: 1, minWidth: 0 }}>
                            <p style={{
                              margin: '0 0 6px 0', fontWeight: '700',
                              fontSize: '14px', color: '#1e293b',
                              whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
                            }}>
                              {gig.title}
                            </p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                              <div style={{
                                width: '22px', height: '22px', borderRadius: '50%',
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                color: 'white', fontSize: '11px', fontWeight: '700', flexShrink: 0
                              }}>
                                {gig.seller.charAt(0)}
                              </div>
                              <span style={{ fontSize: '13px', color: '#64748b' }}>{gig.seller}</span>
                              {gig.rating && (
                                <span style={{ fontSize: '12px', color: '#f59e0b' }}>⭐ {gig.rating}</span>
                              )}
                            </div>
                          </div>

                          <div style={{ textAlign: 'right', flexShrink: 0 }}>
                            <div style={{ fontSize: '18px', fontWeight: '800', color: '#7c3aed' }}>
                              ₹{gig.price}
                            </div>
                            <div style={{ fontSize: '11px', color: '#94a3b8' }}>starting at</div>
                          </div>

                          <span style={{ color: '#7c3aed', fontSize: '20px', flexShrink: 0 }}>›</span>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={handleViewAll}
                      className="submit-btn"
                      data-testid="view-all-button"
                      style={{ marginTop: '20px', width: '100%' }}
                    >
                      View All {selectedService.label} Services →
                    </button>
                  </>
                ) : (
                  <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                    <div style={{ fontSize: '56px', marginBottom: '16px' }}>🔍</div>
                    <h3 style={{ color: '#1e293b', marginBottom: '8px' }}>No services yet</h3>
                    <p style={{ color: '#64748b', marginBottom: '24px' }}>
                      Be the first to post a <strong>{selectedService.label}</strong> service!
                    </p>
                    <button
                      onClick={() => { setShowModal(false); navigate('/post-gig'); }}
                      className="submit-btn"
                      style={{ maxWidth: '260px', margin: '0 auto' }}
                    >
                      Post a Service
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

Hero.propTypes = {
  onSearch: PropTypes.func,
  onSelectCategory: PropTypes.func
};

export default Hero;