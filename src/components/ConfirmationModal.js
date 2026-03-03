import React from 'react';
import PropTypes from 'prop-types';

// Confirmation Modal - Success popup after payment
function ConfirmationModal({ gig, paymentMethod, onClose }) {
  const getPaymentMethodName = (method) => {
    switch(method) {
      case 'credit-card': return 'Credit/Debit Card';
      case 'upi': return 'UPI Payment';
      case 'net-banking': return 'Net Banking';
      default: return 'Payment';
    }
  };

  return (
    <div className="modal-overlay" data-testid="confirmation-modal">
      <div className="modal-content" style={{maxWidth: '500px', textAlign: 'center'}}>
        {/* Success Animation */}
        <div style={{
          width: '100px',
          height: '100px',
          margin: '0 auto 24px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '64px',
          animation: 'scaleIn 0.5s ease-out'
        }}>
          ✓
        </div>

        <h2 style={{color: '#10b981', marginBottom: '16px'}}>Service Confirmed!</h2>
        
        <p style={{color: '#64748b', fontSize: '16px', marginBottom: '24px'}}>
          Your payment of <strong style={{color: '#7c3aed'}}>${gig.price}</strong> has been processed successfully.
        </p>

        <div style={{
          background: '#f8fafc',
          padding: '20px',
          borderRadius: '12px',
          marginBottom: '24px',
          textAlign: 'left'
        }}>
          <h4 style={{marginTop: 0, marginBottom: '12px', color: '#1e293b'}}>Order Details</h4>
          <div style={{fontSize: '14px', color: '#64748b', lineHeight: '2'}}>
            <p style={{margin: 0}}><strong>Service:</strong> {gig.title}</p>
            <p style={{margin: 0}}><strong>Seller:</strong> {gig.seller}</p>
            <p style={{margin: 0}}><strong>Payment Method:</strong> {getPaymentMethodName(paymentMethod)}</p>
            <p style={{margin: 0}}><strong>Order ID:</strong> #{Date.now().toString().slice(-8)}</p>
          </div>
        </div>

        <div style={{
          background: '#ecfdf5',
          padding: '16px',
          borderRadius: '8px',
          marginBottom: '24px',
          fontSize: '14px',
          color: '#065f46'
        }}>
          📧 A confirmation email has been sent to your registered email address.
        </div>

        <div style={{
          background: '#eff6ff',
          padding: '16px',
          borderRadius: '8px',
          marginBottom: '24px',
          fontSize: '14px',
          color: '#1e40af'
        }}>
          💬 The seller will contact you shortly to discuss project details.
        </div>

        <button
          onClick={onClose}
          className="submit-btn"
          style={{marginTop: 0}}
          data-testid="close-confirmation-button"
        >
          Continue Browsing
        </button>
      </div>

      <style>{`
        @keyframes scaleIn {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

ConfirmationModal.propTypes = {
  gig: PropTypes.shape({
    title: PropTypes.string.isRequired,
    seller: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired
  }).isRequired,
  paymentMethod: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired
};

export default ConfirmationModal;