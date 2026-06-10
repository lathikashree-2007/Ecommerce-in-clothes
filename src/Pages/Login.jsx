import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAdmin } from '../Context/AdminContext';

export default function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { loginAsAdmin } = useAdmin();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear previous errors

    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      // 📩 Inside your Login.jsx -> handleFormSubmit function:
const data = await response.json();
console.log("📩 Received response from backend:", data);

if (!response.ok || data.success === false) {
  throw new Error(data.message || "Invalid credentials configuration.");
}

// 🔀 THE FLIPKART / MEESHO DYNAMIC ROUTING MATRIX
if (data.user && data.user.role === 'admin') {
  // 1. If it's an admin, update the admin state context and route to the dashboard
  loginAsAdmin(data.token); 
  alert("👮 Admin Access Granted! Opening Dashboard Hub...");
  navigate('/admin/dashboard'); 
} else {
  // 2. If it's a regular customer, trigger the normal login and go to the shopping profile
  onLoginSuccess(data.user);
  alert(`👋 Welcome back, ${data.user.name || 'Customer'}!`);
  navigate('/profile'); 
}

    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  return (
    <div style={{ maxWidth: '420px', margin: '60px auto', padding: '35px', border: '1px solid #e0e0e0', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', fontFamily: 'sans-serif' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '8px', fontWeight: '600' }}>Sign In</h2>
      <p style={{ textAlign: 'center', color: '#666', fontSize: '14px', marginBottom: '24px' }}>Access your FashionHub Account</p>
      
      {errorMessage && (
        <div style={{ padding: '10px', marginBottom: '15px', borderRadius: '6px', background: '#fff0f0', color: '#dd3333', fontSize: '14px', border: '1px solid #ffcccc' }}>
          ❌ {errorMessage}
        </div>
      )}

      <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '13px', fontWeight: '600', color: '#333' }}>Email Address</label>
          <input 
            type="email" 
            placeholder="name@example.com" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            style={{ padding: '11px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '15px' }} 
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <label style={{ fontSize: '13px', fontWeight: '600', color: '#333' }}>Password</label>
            {/* 🔑 FORGOT PASSWORD LINK LINKED HERE */}
            <Link to="/forgot-password" style={{ fontSize: '13px', color: '#ff3f6c', textDecoration: 'none', fontWeight: '500' }}>
              Forgot Password?
            </Link>
          </div>
          <input 
            type="password" 
            placeholder="••••••••" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            style={{ padding: '11px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '15px' }} 
          />
        </div>

        <button type="submit" style={{ padding: '13px', background: '#ff3f6c', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '16px', marginTop: '10px', boxShadow: '0 2px 5px rgba(255, 63, 108, 0.2)' }}>
          Secure Sign In
        </button>
      </form>

      <div style={{ textAlign: 'center', marginTop: '25px', fontSize: '14px', color: '#666', borderTop: '1px solid #eee', paddingTop: '20px' }}>
        New to FashionHub? <Link to="/signup" style={{ color: '#ff3f6c', textDecoration: 'none', fontWeight: '600' }}>Create an account</Link>
      </div>
    </div>
  );
}