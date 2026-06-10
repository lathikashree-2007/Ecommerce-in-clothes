import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// 🌟 Reusable Link Component that handles its own smooth hover animations inline!
function NavLink({ to, children }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      to={to}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        textDecoration: 'none',
        color: isHovered ? '#ff3f6c' : '#282c3f',
        fontWeight: '600',
        fontSize: '14px',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        transform: isHovered ? 'translateY(-1px)' : 'translateY(0)',
        transition: 'all 0.2s ease-in-out',
        display: 'inline-block'
      }}
    >
      {children}
    </Link>
  );
}

function Navbar({ user, onLogout, wishlistCount = 0, cartCount = 0 }) {
  const navigate = useNavigate();
  const [isLogoutHovered, setIsLogoutHovered] = useState(false);

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '16px 48px',
      backgroundColor: '#ffffff',
      boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* 🏷️ LOGO */}
      <div style={{ letterSpacing: '2px', fontWeight: '800', fontSize: '22px' }}>
        <Link to="/" style={{ textDecoration: 'none', color: '#111111' }}>
          FASHION<span style={{ color: '#ff3f6c' }}>HUB</span>
        </Link>
      </div>

      {/* 🛍️ MIDDLE CATEGORIES */}
      <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
        <NavLink to="/category/men">Men</NavLink>
        <NavLink to="/category/women">Women</NavLink>
        <NavLink to="/category/kids">Kids</NavLink>
        <NavLink to="/category/accessories">Accessories</NavLink>
      </div>

      {/* 💡 UTILITY PAGES */}
      <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
        <Link to="/about" style={{ textDecoration: 'none', color: '#696e79', fontSize: '14px', fontWeight: '500' }}>About Us</Link>
        <Link to="/faq" style={{ textDecoration: 'none', color: '#696e79', fontSize: '14px', fontWeight: '500' }}>FAQ</Link>
      </div>

      {/* 👤 RIGHT ACCOUNT ACTIONS */}
      <div style={{ display: 'flex', gap: '28px', alignItems: 'center' }}>
        {user && user.role === 'admin' && (
          <Link to="/admin/dashboard" style={{
            textDecoration: 'none', color: '#fff', backgroundColor: '#282c3f', 
            padding: '8px 16px', borderRadius: '4px', fontWeight: '600', fontSize: '12px',
            transition: 'opacity 0.2s'
          }} onMouseEnter={(e) => e.target.style.opacity = '0.9'} onMouseLeave={(e) => e.target.style.opacity = '1'}>
            Dashboard
          </Link>
        )}

        <Link to="/profile" style={{ textDecoration: 'none', color: '#282c3f', fontWeight: '500', fontSize: '14px' }}>
          👤 {user ? `${user.name || 'Account'}` : 'Login'}
        </Link>

        {/* Wishlist */}
        <Link to="/profile" style={{ textDecoration: 'none', color: '#282c3f', position: 'relative', fontWeight: '500', fontSize: '14px' }}>
          ❤️ <span style={{ marginLeft: '4px' }}>Wishlist</span>
          {wishlistCount > 0 && (
            <span style={{ position: 'absolute', top: '-12px', right: '-15px', backgroundColor: '#ff3f6c', color: '#fff', borderRadius: '50%', width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 'bold' }}>
              {wishlistCount}
            </span>
          )}
        </Link>

        {/* Bag */}
        <Link to="/cart" style={{ textDecoration: 'none', color: '#282c3f', position: 'relative', fontWeight: '500', fontSize: '14px' }}>
          🛍️ <span style={{ marginLeft: '4px' }}>Bag</span>
          {cartCount > 0 && (
            <span style={{ position: 'absolute', top: '-12px', right: '-15px', backgroundColor: '#111', color: '#fff', borderRadius: '50%', width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 'bold' }}>
              {cartCount}
            </span>
          )}
        </Link>

        {user && (
          <button 
            onClick={onLogout} 
            onMouseEnter={() => setIsLogoutHovered(true)}
            onMouseLeave={() => setIsLogoutHovered(false)}
            style={{
              background: isLogoutHovered ? '#f5f5f7' : 'none', 
              border: '1px solid #d4d5d9', 
              padding: '6px 14px', 
              cursor: 'pointer', 
              borderRadius: '4px', 
              fontSize: '13px', 
              fontWeight: '500', 
              color: isLogoutHovered ? '#ff3f6c' : '#282c3f',
              borderColor: isLogoutHovered ? '#ff3f6c' : '#d4d5d9',
              transition: 'all 0.2s ease'
            }}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;