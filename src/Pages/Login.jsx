import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isVerifying, setIsVerifying] = useState(false); // UI Loading Animation State
  
  const navigate = useNavigate(); // This is the navigation engine pointer

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    
    if (!email || !password) {
      setErrorMessage('Please fill in all security fields.');
      return;
    }

    // Trigger professional UI skeleton loading verification state
    setIsVerifying(true);

    // Simulate an API network authentication handshake delay
    setTimeout(() => {
      setIsVerifying(false);

      // 1. Core Administrative Login Verification Route
      if (email === "admin@fashionhub.com") {
        onLoginSuccess({ email, name: "System Administrator" });
        alert("🛡️ Admin Clearance Granted. Redirecting to Management Dashboard...");
        navigate('/admin'); // Force browser push to admin console page!
      } 
      // 2. Standard Consumer User Login Route
      else {
        onLoginSuccess({ email, name: "Alex Harrison" });
        alert("🎉 Verification successful! Welcome to FASHIONHUB.");
        navigate('/'); // Force browser push back to marketplace homepage layout!
      }
    }, 900); // 900ms micro-loading effect for production realism
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '75vh', padding: '0 20px' }}>
      <div style={{ width: '100%', maxWidth: '400px', background: 'var(--card-bg, #fff)', padding: '30px', borderRadius: '8px', boxShadow: '0 8px 24px rgba(0,0,0,0.05)', border: '1px solid rgba(0,0,0,0.05)' }}>
        <h2 style={{ fontSize: '1.6rem', fontWeight: '800', marginBottom: '6px', letterSpacing: '-0.5px' }}>Verify Your Identity</h2>
        <p style={{ color: '#666', fontSize: '0.85rem', marginBottom: '24px' }}>Access your personalized style portfolios and secure bag.</p>

        {errorMessage && (
          <div style={{ background: '#ffeded', color: '#d93838', padding: '10px 14px', borderRadius: '4px', fontSize: '0.8rem', marginBottom: '15px', fontWeight: '600' }}>
            ⚠️ {errorMessage}
          </div>
        )}

        <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: '#444', marginBottom: '6px', textTransform: 'uppercase' }}>Email Address</label>
            <input type="email" placeholder="e.g., admin@fashionhub.com or user@mail.com" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '0.9rem', background: 'transparent' }} required />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: '#444', marginBottom: '6px', textTransform: 'uppercase' }}>Secure Password</label>
            <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '0.9rem', background: 'transparent' }} required />
          </div>

          <button type="submit" disabled={isVerifying} style={{ width: '100%', padding: '14px', background: '#d4af37', color: '#111', border: 'none', borderRadius: '4px', fontWeight: '700', cursor: isVerifying ? 'not-allowed' : 'pointer', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: '10px', transition: 'all 0.2s', opacity: isVerifying ? 0.7 : 1 }}>
            {isVerifying ? 'Verifying Credentials...' : 'Verify & Login'}
          </button>
        </form>

        <div style={{ marginTop: '20px', padding: '12px', background: '#f9f9f9', borderRadius: '4px', fontSize: '0.75rem', color: '#666', lineHeight: '1.4' }}>
          💡 <strong>Project Demo Pro-Tip:</strong> Use <code>admin@fashionhub.com</code> to instantly unlock the interactive SVG Admin & Analytics Dashboard charts.
        </div>
      </div>
    </div>
  );
}

export default Login;