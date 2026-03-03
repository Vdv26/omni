import React from 'react';

function TrustAndSafety() {
  return (
    <div className="main-container" data-testid="trust-safety-page">
      <div style={{maxWidth: '900px', margin: '0 auto'}}>
        <h1 style={{fontSize: '36px', marginBottom: '20px'}}>Trust & Safety</h1>
        <p style={{color: '#64748b', fontSize: '18px', marginBottom: '40px'}}>
          Your security and trust are our top priorities. Learn about the measures we take to keep you safe.
        </p>

        {/* User Authentication */}
        <div style={{
          background: 'white',
          padding: '30px',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          marginBottom: '30px'
        }}>
          <div style={{display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px'}}>
            <div style={{fontSize: '40px'}}>🔐</div>
            <h2 style={{margin: 0}}>User Authentication & Verification</h2>
          </div>
          <ul style={{color: '#64748b', lineHeight: '2', fontSize: '16px'}}>
            <li><strong>Email Verification:</strong> All users must verify their email address during sign-up to ensure authenticity.</li>
            <li><strong>Secure Login:</strong> Password-protected accounts with minimum 6-character requirement and encryption.</li>
            <li><strong>Account Validation:</strong> Each user profile is validated before they can post services or make purchases.</li>
            <li><strong>Identity Verification:</strong> Sellers undergo identity verification to ensure legitimacy.</li>
            <li><strong>Review System:</strong> User ratings and reviews help identify trustworthy service providers.</li>
          </ul>
        </div>

        {/* Secure Payment */}
        <div style={{
          background: 'white',
          padding: '30px',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          marginBottom: '30px'
        }}>
          <div style={{display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px'}}>
            <div style={{fontSize: '40px'}}>💳</div>
            <h2 style={{margin: 0}}>Secure Payment Gateway</h2>
          </div>
          <ul style={{color: '#64748b', lineHeight: '2', fontSize: '16px'}}>
            <li><strong>SSL Encryption:</strong> All payment data is encrypted using 256-bit SSL technology.</li>
            <li><strong>PCI DSS Compliant:</strong> Our payment system meets Payment Card Industry Data Security Standards.</li>
            <li><strong>No Card Storage:</strong> We never store your complete card details on our servers.</li>
            <li><strong>Multiple Payment Options:</strong> Support for Credit/Debit Cards, UPI, and Net Banking.</li>
            <li><strong>Fraud Detection:</strong> Advanced algorithms monitor transactions for suspicious activity.</li>
            <li><strong>Chargeback Protection:</strong> Built-in dispute resolution system for failed transactions.</li>
          </ul>
        </div>

        {/* Data Protection */}
        <div style={{
          background: 'white',
          padding: '30px',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          marginBottom: '30px'
        }}>
          <div style={{display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px'}}>
            <div style={{fontSize: '40px'}}>🛡️</div>
            <h2 style={{margin: 0}}>Data Protection & Privacy</h2>
          </div>
          <ul style={{color: '#64748b', lineHeight: '2', fontSize: '16px'}}>
            <li><strong>Data Encryption:</strong> All personal data is encrypted both in transit and at rest.</li>
            <li><strong>Privacy Policy:</strong> Strict adherence to data protection regulations and privacy laws.</li>
            <li><strong>Limited Access:</strong> Only authorized personnel have access to user data, with full audit trails.</li>
            <li><strong>Regular Backups:</strong> Automated daily backups ensure your data is never lost.</li>
            <li><strong>Secure Servers:</strong> Data stored on enterprise-grade servers with 24/7 monitoring.</li>
          </ul>
        </div>

        {/* Platform Security */}
        <div style={{
          background: 'white',
          padding: '30px',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          marginBottom: '30px'
        }}>
          <div style={{display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px'}}>
            <div style={{fontSize: '40px'}}>🔒</div>
            <h2 style={{margin: 0}}>Platform Security Measures</h2>
          </div>
          <ul style={{color: '#64748b', lineHeight: '2', fontSize: '16px'}}>
            <li><strong>Regular Security Audits:</strong> Third-party security assessments conducted quarterly.</li>
            <li><strong>DDoS Protection:</strong> Advanced protection against denial-of-service attacks.</li>
            <li><strong>Firewall Protection:</strong> Multi-layer firewall system protects against unauthorized access.</li>
            <li><strong>Malware Scanning:</strong> Continuous monitoring for malicious code and threats.</li>
            <li><strong>Secure Authentication:</strong> Token-based authentication system prevents unauthorized access.</li>
          </ul>
        </div>

        {/* Communication Safety */}
        <div style={{
          background: 'white',
          padding: '30px',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          marginBottom: '30px'
        }}>
          <div style={{display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px'}}>
            <div style={{fontSize: '40px'}}>💬</div>
            <h2 style={{margin: 0}}>Safe Communication</h2>
          </div>
          <ul style={{color: '#64748b', lineHeight: '2', fontSize: '16px'}}>
            <li><strong>In-Platform Messaging:</strong> All communications happen within the platform for safety.</li>
            <li><strong>Spam Detection:</strong> Automated systems filter out spam and inappropriate content.</li>
            <li><strong>Report System:</strong> Easy reporting mechanism for suspicious behavior or scams.</li>
            <li><strong>Support Team:</strong> 24/7 customer support available to address safety concerns.</li>
          </ul>
        </div>

        {/* Trust Badge */}
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '40px',
          borderRadius: '12px',
          textAlign: 'center',
          color: 'white'
        }}>
          <div style={{fontSize: '64px', marginBottom: '20px'}}>✓</div>
          <h2 style={{marginBottom: '12px'}}>Trusted by Thousands</h2>
          <p style={{opacity: 0.9, fontSize: '16px', maxWidth: '600px', margin: '0 auto'}}>
            OmniGigs is committed to maintaining the highest standards of security and trust. 
            Your safety is our responsibility, and we continuously work to improve our security measures.
          </p>
        </div>
      </div>
    </div>
  );
}

export default TrustAndSafety;