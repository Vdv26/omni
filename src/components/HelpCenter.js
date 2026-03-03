import React, { useState } from 'react';

function HelpCenter() {
  const [selectedQuestion, setSelectedQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const faqs = [
    {
      question: 'How do I create an account?',
      answer: 'Click on "Sign In / Join" in the header, then click "Sign Up". Fill in your name, email, and password. Accept the terms and conditions, then click "Create Account". You\'ll be logged in automatically!'
    },
    {
      question: 'How do I post a service/gig?',
      answer: 'After logging in, click "Post a Gig" in the header. Fill out the form with your service details including title, description, price, category, delivery time, and features. Don\'t forget to add your signature! Once submitted, your gig will be live on the marketplace.'
    },
    {
      question: 'What payment methods are accepted?',
      answer: 'We accept three payment methods: Credit/Debit Cards (Visa, Mastercard, American Express), UPI Payment (any UPI ID), and Net Banking (all major banks). All payments are processed securely with encryption.'
    },
    {
      question: 'Is my payment information secure?',
      answer: 'Yes! We use industry-standard encryption to protect your payment information. We never store your complete card details on our servers. All transactions are processed through secure payment gateways.'
    },
    {
      question: 'How do I contact a seller?',
      answer: 'On any gig detail page, click the "Contact Seller" button. Fill out the contact form with your name, email, and message. The seller will receive your message and respond directly to your email.'
    },
    {
      question: 'Can I save my favorite services?',
      answer: 'Yes! Click the heart icon on any gig card to add it to your favorites. Access all your saved services by clicking "Favorites" in the header. You can remove items from favorites by clicking the heart icon again.'
    },
    {
      question: 'How long does service delivery take?',
      answer: 'Delivery time varies by service and is specified in each gig listing. You can filter services by delivery time when posting a gig (1 day, 3 days, 7 days, or 14 days). The seller will confirm the exact timeline after you place your order.'
    },
    {
      question: 'What if I\'m not satisfied with the service?',
      answer: 'We strive for 100% customer satisfaction. If you\'re not happy with the delivered service, contact the seller first to request revisions. Most sellers offer unlimited revisions. If the issue isn\'t resolved, contact our support team through the Contact Us page.'
    },
    {
      question: 'How do I edit my profile?',
      answer: 'Click on your name in the header, then select "Profile". On your profile page, you can edit your bio by clicking the "Edit Bio" button. Your profile displays your rating, completed orders, and member since date.'
    },
    {
      question: 'Can I cancel an order?',
      answer: 'Order cancellation depends on the service status. If work hasn\'t started yet, you can request cancellation by contacting the seller. Once work has begun, cancellation terms depend on the seller\'s policy. Contact support for assistance.'
    }
  ];

  const handleQuestionSelect = (e) => {
    const selected = e.target.value;
    setSelectedQuestion(selected);
    
    if (selected) {
      const faq = faqs.find(f => f.question === selected);
      setAnswer(faq.answer);
    } else {
      setAnswer('');
    }
  };

  return (
    <div className="main-container" data-testid="help-center-page">
      <div style={{maxWidth: '800px', margin: '0 auto'}}>
        <h1 style={{fontSize: '36px', marginBottom: '20px'}}>Help Center</h1>
        <p style={{color: '#64748b', fontSize: '18px', marginBottom: '40px'}}>
          Get instant answers to frequently asked questions
        </p>

        <div style={{
          background: 'white',
          padding: '40px',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
            marginBottom: '30px'
          }}>
            <div style={{fontSize: '48px'}}>🤖</div>
            <div>
              <h3 style={{margin: '0 0 5px 0'}}>OmniGigs Assistant</h3>
              <p style={{color: '#64748b', margin: 0}}>How can I help you today?</p>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="faq-select" style={{fontSize: '16px', fontWeight: '600'}}>
              Select a question:
            </label>
            <select
              id="faq-select"
              value={selectedQuestion}
              onChange={handleQuestionSelect}
              style={{
                width: '100%',
                padding: '14px',
                fontSize: '15px',
                border: '2px solid #e2e8f0',
                borderRadius: '8px',
                cursor: 'pointer',
                background: 'white'
              }}
              data-testid="faq-select"
            >
              <option value="">-- Choose a question --</option>
              {faqs.map((faq, idx) => (
                <option key={idx} value={faq.question}>
                  {faq.question}
                </option>
              ))}
            </select>
          </div>

          {answer && (
            <div style={{
              marginTop: '30px',
              padding: '20px',
              background: '#eff6ff',
              borderLeft: '4px solid #3b82f6',
              borderRadius: '8px',
              animation: 'slideIn 0.3s ease-out'
            }}>
              <h4 style={{margin: '0 0 12px 0', color: '#1e40af'}}>
                💡 Answer:
              </h4>
              <p style={{color: '#1e293b', lineHeight: '1.8', margin: 0}}>
                {answer}
              </p>
            </div>
          )}

          {!answer && (
            <div style={{
              marginTop: '30px',
              padding: '30px',
              textAlign: 'center',
              color: '#94a3b8'
            }}>
              <div style={{fontSize: '48px', marginBottom: '10px'}}>💬</div>
              <p>Select a question above to see the answer</p>
            </div>
          )}
        </div>

        <div style={{
          marginTop: '40px',
          padding: '30px',
          background: '#f8fafc',
          borderRadius: '12px',
          textAlign: 'center'
        }}>
          <h3 style={{marginBottom: '12px'}}>Still Need Help?</h3>
          <p style={{color: '#64748b', marginBottom: '20px'}}>
            Can't find the answer you're looking for? Contact our support team!
          </p>
          <button
            onClick={() => window.location.href = '/contact-us'}
            className="submit-btn"
            style={{maxWidth: '300px', margin: '0 auto'}}
          >
            Contact Support
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export default HelpCenter;