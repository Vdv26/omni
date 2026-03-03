import React from 'react';

function HowItWorks() {
  return (
    <div className="main-container" data-testid="how-it-works-page">
      <div style={{maxWidth: '900px', margin: '0 auto'}}>
        <h1 style={{fontSize: '36px', marginBottom: '20px'}}>How It Works</h1>
        <p style={{color: '#64748b', fontSize: '18px', marginBottom: '40px'}}>
          OmniGigs makes it easy to connect with talented freelancers for any service you need.
        </p>

        <div style={{
          display: 'grid',
          gap: '30px',
          marginBottom: '40px'
        }}>
          {/* Step 1 */}
          <div style={{
            background: 'white',
            padding: '30px',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            borderLeft: '4px solid #7c3aed'
          }}>
            <div style={{
              width: '50px',
              height: '50px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              fontWeight: 'bold',
              color: 'white',
              marginBottom: '20px'
            }}>1</div>
            <h3 style={{marginBottom: '12px'}}>Browse Services</h3>
            <p style={{color: '#64748b', lineHeight: '1.8'}}>
              Explore our marketplace with hundreds of services across various categories. Use the search bar to find specific services or browse by category. Filter by price range and sort by ratings to find the perfect match for your needs.
            </p>
          </div>

          {/* Step 2 */}
          <div style={{
            background: 'white',
            padding: '30px',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            borderLeft: '4px solid #3b82f6'
          }}>
            <div style={{
              width: '50px',
              height: '50px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              fontWeight: 'bold',
              color: 'white',
              marginBottom: '20px'
            }}>2</div>
            <h3 style={{marginBottom: '12px'}}>Sign Up / Login</h3>
            <p style={{color: '#64748b', lineHeight: '1.8'}}>
              Create a free account or login to access all features. Registration takes less than a minute. Once logged in, you can save favorites, post your own services, and make secure payments.
            </p>
          </div>

          {/* Step 3 */}
          <div style={{
            background: 'white',
            padding: '30px',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            borderLeft: '4px solid #10b981'
          }}>
            <div style={{
              width: '50px',
              height: '50px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              fontWeight: 'bold',
              color: 'white',
              marginBottom: '20px'
            }}>3</div>
            <h3 style={{marginBottom: '12px'}}>Review & Contact</h3>
            <p style={{color: '#64748b', lineHeight: '1.8'}}>
              Click on any service to view detailed information including seller ratings, reviews, and package details. Use the "Contact Seller" button to discuss your project requirements before making a purchase.
            </p>
          </div>

          {/* Step 4 */}
          <div style={{
            background: 'white',
            padding: '30px',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            borderLeft: '4px solid #f59e0b'
          }}>
            <div style={{
              width: '50px',
              height: '50px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              fontWeight: 'bold',
              color: 'white',
              marginBottom: '20px'
            }}>4</div>
            <h3 style={{marginBottom: '12px'}}>Secure Payment</h3>
            <p style={{color: '#64748b', lineHeight: '1.8'}}>
              When you're ready, proceed to checkout. Choose from multiple payment methods: Credit/Debit Card, UPI, or Net Banking. All payments are encrypted and secure. Your card details are never stored.
            </p>
          </div>

          {/* Step 5 */}
          <div style={{
            background: 'white',
            padding: '30px',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            borderLeft: '4px solid #ef4444'
          }}>
            <div style={{
              width: '50px',
              height: '50px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              fontWeight: 'bold',
              color: 'white',
              marginBottom: '20px'
            }}>5</div>
            <h3 style={{marginBottom: '12px'}}>Get Your Service</h3>
            <p style={{color: '#64748b', lineHeight: '1.8'}}>
              After payment confirmation, the seller will contact you to start work on your project. Track progress, communicate through our platform, and receive your completed work according to the agreed timeline.
            </p>
          </div>
        </div>

        <div style={{
          background: '#eff6ff',
          padding: '30px',
          borderRadius: '12px',
          textAlign: 'center',
          marginTop: '40px'
        }}>
          <h3 style={{marginBottom: '12px'}}>Ready to Get Started?</h3>
          <p style={{color: '#64748b', marginBottom: '20px'}}>
            Join thousands of satisfied clients and freelancers on OmniGigs today!
          </p>
          <button
            onClick={() => window.location.href = '/login'}
            className="submit-btn"
            style={{maxWidth: '300px', margin: '0 auto'}}
          >
            Sign Up Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default HowItWorks;