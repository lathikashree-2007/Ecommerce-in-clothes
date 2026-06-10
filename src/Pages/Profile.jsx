import React from 'react';
import { Link } from 'react-router-dom';

export default function Profile({ user, onLogout, wishlist = [], toggleWishlist, addToCart, orders = [] }) {
  
  const handleMoveToBag = (product) => {
    if (typeof addToCart === 'function') {
      addToCart(product, 'M'); // Adds product to global shopping cart bag with a default size 'M'
      
      // Optional: Automatically remove it from wishlist once moved to the bag (Myntra style)
      if (typeof toggleWishlist === 'function') {
        toggleWishlist(product);
      }
    } else {
      console.error("addToCart function prop is missing or not mapped into Profile.jsx properly.");
      alert("System Error: Unable to move item to bag.");
    }
  };

  return (
    <div style={{ padding: '40px 6%', background: '#f7f8fa', minHeight: '90vh', fontFamily: 'sans-serif' }}>
      
      {/* Main Profile Layout Architecture Split Grid */}
      <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
        
        {/* LEFT COLUMN: Premium Shopper Profile Summary Side-Card */}
        <div style={{ flex: '1 1 280px', background: '#fff', padding: '30px 20px', borderRadius: '8px', border: '1px solid #e2e8f0', textAlign: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
          <div style={{ width: '90px', height: '90px', borderRadius: '50%', backgroundColor: '#1a202c', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', fontWeight: 'bold', margin: '0 auto 15px auto' }}>
            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>
          <h3 style={{ margin: '0 0 5px 0', fontSize: '1.2rem', fontWeight: '800' }}>{user?.name || "Premium Shopper"}</h3>
          <p style={{ color: '#718096', fontSize: '0.9rem', margin: '0 0 20px 0' }}>{user?.email || "customer@fashionhub.com"}</p>
          
          <div style={{ borderTop: '1px solid #edf2f7', paddingTop: '15px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Link to="/orders" style={{ textDecoration: 'none', color: '#2b6cb0', fontSize: '0.95rem', fontWeight: 'bold' }}>
              📦 View Order History ({orders.length})
            </Link>
            <button onClick={onLogout} style={{ background: 'none', border: 'none', color: '#ff3f6c', fontSize: '0.95rem', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}>
              Logout Securely
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: Active Wishlist Management Display Panel */}
        <div style={{ flex: '3 1 600px', background: '#fff', padding: '30px', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: '900', letterSpacing: '0.5px', marginBottom: '25px', textTransform: 'uppercase', color: '#1a202c', borderBottom: '2px solid #1a202c', paddingBottom: '10px' }}>
            My Curated Wishlist Portfolio ({wishlist.length})
          </h2>

          {wishlist.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '50px 20px' }}>
              <span style={{ fontSize: '40px', display: 'block', marginBottom: '10px' }}>❤️</span>
              <p style={{ color: '#718096', margin: '0 0 15px 0' }}>Your personalized wishlist portfolio is currently empty.</p>
              <Link to="/" style={{ padding: '10px 20px', backgroundColor: '#1a202c', color: '#fff', textDecoration: 'none', borderRadius: '4px', fontWeight: 'bold', fontSize: '0.85rem' }}>
                Discover New Arrivals
              </Link>
            </div>
          ) : (
            /* Wishlist Products Grid Layout */
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '20px' }}>
              {wishlist.map((product) => (
                <div key={product._id} style={{ border: '1px solid #e2e8f0', borderRadius: '6px', overflow: 'hidden', display: 'flex', flexDirection: 'column', position: 'relative', background: '#fff' }}>
                  
                  {/* Remove cross layout action badge trigger */}
                  <button onClick={() => toggleWishlist(product)} style={{ position: 'absolute', top: '8px', right: '8px', background: 'rgba(255,255,255,0.9)', border: 'none', width: '24px', height: '24px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#666', zIndex: 5 }}>
                    ✕
                  </button>

                  <img src={product.img} alt={product.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                  
                  <div style={{ padding: '12px', flex: '1', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#ff3f6c', textTransform: 'uppercase' }}>{product.brand}</span>
                    <h4 style={{ fontSize: '0.85rem', margin: 0, color: '#2d3748', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{product.name}</h4>
                    <div style={{ fontWeight: 'bold', fontSize: '0.95rem', marginTop: 'auto', color: '#1a202c' }}>₹{product.price}</div>
                  </div>

                  {/* 💡 FIXED: "MOVE TO BAG" ACTION BUTTON PIPELINE */}
                  <button 
                    onClick={() => handleMoveToBag(product)}
                    style={{ width: '100%', padding: '12px', background: '#ff3f6c', color: '#fff', border: 'none', fontWeight: 'bold', fontSize: '0.85rem', cursor: 'pointer', textTransform: 'uppercase', transition: 'background 0.2s' }}
                  >
                    🛍️ Move to Bag
                  </button>

                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}