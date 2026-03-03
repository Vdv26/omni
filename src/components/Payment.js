import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import ConfirmationModal from './ConfirmationModal';

// Payment Page Component with transaction mode selection
function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const gig = location.state?.gig;
  
  const [paymentData, setPaymentData] = useState({
    paymentMethod: 'credit-card', // Radio button selection
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    upiId: '',
    bankAccount: '',
    saveCard: false // Checkbox
  });
  
  const [errors, setErrors] = useState({});
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // If no gig data, redirect
  if (!gig) {
    navigate('/');
    return null;
  }

  // Event handler - onChange
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPaymentData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Validation based on payment method
  const validateForm = () => {
    const newErrors = {};

    if (paymentData.paymentMethod === 'credit-card') {
      if (!paymentData.cardNumber) {
        newErrors.cardNumber = 'Card number is required';
      } else if (paymentData.cardNumber.replace(/\s/g, '').length !== 16) {
        newErrors.cardNumber = 'Card number must be 16 digits';
      }

      if (!paymentData.cardName.trim()) {
        newErrors.cardName = 'Cardholder name is required';
      }

      if (!paymentData.expiryDate) {
        newErrors.expiryDate = 'Expiry date is required';
      }

      if (!paymentData.cvv) {
        newErrors.cvv = 'CVV is required';
      } else if (paymentData.cvv.length !== 3) {
        newErrors.cvv = 'CVV must be 3 digits';
      }
    } else if (paymentData.paymentMethod === 'upi') {
      if (!paymentData.upiId) {
        newErrors.upiId = 'UPI ID is required';
      } else if (!paymentData.upiId.includes('@')) {
        newErrors.upiId = 'Invalid UPI ID format';
      }
    } else if (paymentData.paymentMethod === 'net-banking') {
      if (!paymentData.bankAccount) {
        newErrors.bankAccount = 'Bank account is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Format card number with spaces
  const formatCardNumber = (value) => {
    const cleaned = value.replace(/\s/g, '');
    const chunks = cleaned.match(/.{1,4}/g);
    return chunks ? chunks.join(' ') : cleaned;
  };

  // Handle card number input
  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').substring(0, 16);
    setPaymentData(prev => ({
      ...prev,
      cardNumber: formatCardNumber(value)
    }));
  };

  // Event handler - onSubmit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsProcessing(true);
      
      // Simulate payment processing
      setTimeout(() => {
        setIsProcessing(false);
        setShowConfirmation(true);
        
        // Store order in localStorage
        const orders = JSON.parse(localStorage.getItem('orders') || '[]');
        orders.push({
          id: Date.now(),
          gig: gig,
          paymentMethod: paymentData.paymentMethod,
          amount: gig.price,
          date: new Date().toISOString()
        });
        localStorage.setItem('orders', JSON.stringify(orders));
      }, 2000);
    }
  };

  const handleConfirmationClose = () => {
    setShowConfirmation(false);
    navigate('/');
  };

  return (
    <div className="main-container" data-testid="payment-page">
      <div className="form-container" style={{maxWidth: '700px'}}>
        <h2>Complete Your Payment</h2>
        <p style={{color: '#64748b', marginBottom: '30px'}}>
          Review your order and select payment method
        </p>

        {/* Order Summary */}
        <div style={{
          background: '#f8fafc',
          padding: '24px',
          borderRadius: '12px',
          marginBottom: '30px',
          border: '2px solid #e2e8f0'
        }}>
          <h3 style={{marginTop: 0}}>Order Summary</h3>
          <div style={{display: 'flex', gap: '20px', alignItems: 'center'}}>
            <img 
              src={gig.image} 
              alt={gig.title}
              style={{
                width: '100px',
                height: '100px',
                objectFit: 'cover',
                borderRadius: '8px'
              }}
            />
            <div style={{flex: 1}}>
              <h4 style={{margin: '0 0 8px 0'}}>{gig.title}</h4>
              <p style={{color: '#64748b', margin: '0 0 8px 0'}}>by {gig.seller}</p>
              <p style={{margin: 0}}>
                <span style={{color: '#64748b'}}>Category: </span>
                <span className="category-badge">{gig.category}</span>
              </p>
            </div>
            <div style={{fontSize: '28px', fontWeight: 'bold', color: '#7c3aed'}}>
              ${gig.price}
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Payment Method Selection - Radio Buttons */}
          <div className="form-group">
            <label>Select Payment Method *</label>
            <div className="radio-group" style={{gap: '16px'}}>
              <label style={{
                padding: '16px',
                border: '2px solid',
                borderColor: paymentData.paymentMethod === 'credit-card' ? '#7c3aed' : '#e2e8f0',
                borderRadius: '8px',
                background: paymentData.paymentMethod === 'credit-card' ? '#ede9fe' : 'white',
                transition: 'all 0.3s'
              }}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="credit-card"
                  checked={paymentData.paymentMethod === 'credit-card'}
                  onChange={handleChange}
                  data-testid="payment-credit-card"
                />
                💳 Credit/Debit Card
              </label>
              
              <label style={{
                padding: '16px',
                border: '2px solid',
                borderColor: paymentData.paymentMethod === 'upi' ? '#7c3aed' : '#e2e8f0',
                borderRadius: '8px',
                background: paymentData.paymentMethod === 'upi' ? '#ede9fe' : 'white',
                transition: 'all 0.3s'
              }}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="upi"
                  checked={paymentData.paymentMethod === 'upi'}
                  onChange={handleChange}
                  data-testid="payment-upi"
                />
                📱 UPI Payment
              </label>
              
              <label style={{
                padding: '16px',
                border: '2px solid',
                borderColor: paymentData.paymentMethod === 'net-banking' ? '#7c3aed' : '#e2e8f0',
                borderRadius: '8px',
                background: paymentData.paymentMethod === 'net-banking' ? '#ede9fe' : 'white',
                transition: 'all 0.3s'
              }}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="net-banking"
                  checked={paymentData.paymentMethod === 'net-banking'}
                  onChange={handleChange}
                  data-testid="payment-net-banking"
                />
                🏦 Net Banking
              </label>
            </div>
          </div>

          {/* Credit Card Form */}
          {paymentData.paymentMethod === 'credit-card' && (
            <>
              <div className="form-group">
                <label htmlFor="cardNumber">Card Number *</label>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  value={paymentData.cardNumber}
                  onChange={handleCardNumberChange}
                  placeholder="1234 5678 9012 3456"
                  maxLength="19"
                  data-testid="card-number-input"
                />
                {errors.cardNumber && <span style={{color: '#ef4444', fontSize: '14px'}}>{errors.cardNumber}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="cardName">Cardholder Name *</label>
                <input
                  type="text"
                  id="cardName"
                  name="cardName"
                  value={paymentData.cardName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  data-testid="card-name-input"
                />
                {errors.cardName && <span style={{color: '#ef4444', fontSize: '14px'}}>{errors.cardName}</span>}
              </div>

              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px'}}>
                <div className="form-group">
                  <label htmlFor="expiryDate">Expiry Date *</label>
                  <input
                    type="text"
                    id="expiryDate"
                    name="expiryDate"
                    value={paymentData.expiryDate}
                    onChange={handleChange}
                    placeholder="MM/YY"
                    maxLength="5"
                    data-testid="expiry-date-input"
                  />
                  {errors.expiryDate && <span style={{color: '#ef4444', fontSize: '14px'}}>{errors.expiryDate}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="cvv">CVV *</label>
                  <input
                    type="password"
                    id="cvv"
                    name="cvv"
                    value={paymentData.cvv}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '').substring(0, 3);
                      setPaymentData(prev => ({ ...prev, cvv: value }));
                    }}
                    placeholder="123"
                    maxLength="3"
                    data-testid="cvv-input"
                  />
                  {errors.cvv && <span style={{color: '#ef4444', fontSize: '14px'}}>{errors.cvv}</span>}
                </div>
              </div>

              <div className="form-group">
                <label style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                  <input
                    type="checkbox"
                    name="saveCard"
                    checked={paymentData.saveCard}
                    onChange={handleChange}
                    data-testid="save-card-checkbox"
                  />
                  Save card for future purchases
                </label>
              </div>
            </>
          )}

          {/* UPI Form */}
          {paymentData.paymentMethod === 'upi' && (
            <div className="form-group">
              <label htmlFor="upiId">UPI ID *</label>
              <input
                type="text"
                id="upiId"
                name="upiId"
                value={paymentData.upiId}
                onChange={handleChange}
                placeholder="yourname@upi"
                data-testid="upi-id-input"
              />
              {errors.upiId && <span style={{color: '#ef4444', fontSize: '14px'}}>{errors.upiId}</span>}
              <small style={{color: '#64748b', display: 'block', marginTop: '8px'}}>
                Enter your UPI ID (e.g., 9876543210@paytm, username@googlepay)
              </small>
            </div>
          )}

          {/* Net Banking Form */}
          {paymentData.paymentMethod === 'net-banking' && (
            <div className="form-group">
              <label htmlFor="bankAccount">Select Bank *</label>
              <select
                id="bankAccount"
                name="bankAccount"
                value={paymentData.bankAccount}
                onChange={handleChange}
                data-testid="bank-account-select"
              >
                <option value="">-- Select your bank --</option>
                <option value="hdfc">HDFC Bank</option>
                <option value="icici">ICICI Bank</option>
                <option value="sbi">State Bank of India</option>
                <option value="axis">Axis Bank</option>
                <option value="kotak">Kotak Mahindra Bank</option>
              </select>
              {errors.bankAccount && <span style={{color: '#ef4444', fontSize: '14px'}}>{errors.bankAccount}</span>}
            </div>
          )}

          {/* Submit Button */}
          <button 
            type="submit" 
            className="submit-btn"
            disabled={isProcessing}
            data-testid="pay-now-button"
          >
            {isProcessing ? '⏳ Processing...' : `💳 Pay $${gig.price} Now`}
          </button>

          <button
            type="button"
            onClick={() => navigate(-1)}
            style={{
              width: '100%',
              padding: '16px',
              marginTop: '12px',
              background: 'white',
              color: '#64748b',
              border: '2px solid #e2e8f0',
              borderRadius: '8px',
              fontSize: '17px',
              fontWeight: '700',
              cursor: 'pointer'
            }}
            data-testid="cancel-payment-button"
          >
            Cancel Payment
          </button>
        </form>

        {/* Security Note */}
        <div style={{
          marginTop: '24px',
          padding: '16px',
          background: '#f0fdf4',
          border: '2px solid #86efac',
          borderRadius: '8px',
          fontSize: '14px',
          color: '#166534'
        }}>
          🔒 Your payment information is secure and encrypted. We never store your card details.
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <ConfirmationModal 
          gig={gig}
          paymentMethod={paymentData.paymentMethod}
          onClose={handleConfirmationClose}
        />
      )}
    </div>
  );
}

Payment.propTypes = {
  // No props needed as we get data from location state
};

export default Payment;