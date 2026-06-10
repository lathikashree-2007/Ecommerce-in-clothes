import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../Context/AdminContext';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { loginAdmin } = useAdmin();
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('http://localhost:5000/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failure');

      loginAdmin(data.admin, data.token);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '90vh', backgroundColor: '#f1f5f9', fontFamily: 'sans-serif' }}>
      <form onSubmit={handleLoginSubmit} style={{ background: '#fff', padding: '40px', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)', width: '100%', maxWidth: '380px' }}>
        <h2 style={{ marginBottom: '5px', textAlign: 'center', color: '#1e293b' }}>Admin Portal</h2>
        <p style={{ fontSize: '13px', color: '#64748b', textAlign: 'center', marginBottom: '25px' }}>Management console authorization access</p>
        
        {error && <div style={{ color: '#ef4444', fontSize: '13px', background: '#fee2e2', padding: '10px', borderRadius: '4px', marginBottom: '15px' }}>⚠️ {error}</div>}
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input type="email" placeholder="Admin Email" required value={email} onChange={e => setEmail(e.target.value)} style={{ padding: '11px', border: '1px solid #cbd5e1', borderRadius: '4px' }} />
          <input type="password" placeholder="Secure Password" required value={password} onChange={e => setPassword(e.target.value)} style={{ padding: '11px', border: '1px solid #cbd5e1', borderRadius: '4px' }} />
          <button type="submit" style={{ padding: '12px', background: '#1e293b', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>
            Verify Portal Entry
          </button>
        </div>
      </form>
    </div>
  );
}