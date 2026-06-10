import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAdmin } from '../Context/AdminContext';

export default function AdminSidebar() {
  const { admin, logoutAdmin } = useAdmin();
  const navigate = useNavigate();

  return (
    <div style={{ width: '250px', background: '#1e293b', color: '#fff', minHeight: '100vh', padding: '20px', fontFamily: 'sans-serif' }}>
      <h2 style={{ color: '#f43f5e', fontSize: '1.4rem', marginBottom: '30px' }}>Hub Control Panel</h2>
      <p style={{ fontSize: '12px', background: '#334155', padding: '5px 10px', borderRadius: '4px', display: 'inline-block' }}>
        👤 {admin?.role}
      </p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '40px' }}>
  <Link to="/admin/dashboard" style={{ color: '#cbd5e1', textDecoration: 'none', fontWeight: 'bold' }}>📊 Analytics & Orders</Link>
  <Link to="/admin/add-product" style={{ color: '#cbd5e1', textDecoration: 'none', fontWeight: 'bold' }}>📦 Inventory Manager</Link>
</div>
      <button onClick={() => { logoutAdmin(); navigate('/admin/login'); }} style={{
        marginTop: '60px', width: '100%', padding: '10px', background: '#ef4444', border: 'none', color: '#fff', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer'
      }}>
        Secure Sign Out
      </button>
    </div>
  );
}