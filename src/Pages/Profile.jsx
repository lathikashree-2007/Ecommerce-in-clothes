import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Profile({ profile, wishlist, onLogout, moveWishlistToCart }) {
  // Local interface toggle states for modifying user data parameters
  const [isEditing, setIsEditing] = useState(false);
  const [localPhone, setLocalPhone] = useState(profile?.phone || "9876543210");
  const [localAddress, setLocalAddress] = useState(profile?.address || "402, Sapphire Block, Bangalore - 560102");

  const handleProfileSaveChanges = (e) => {
    e.preventDefault();
    setIsEditing(false);
    alert("Profile security parameters synchronized successfully!");
  };

  return (
    <div style={{ padding: '30px 6%', minHeight: '85vh' }}>
      
      {/* TWO-COLUMN DESIGN: USER ACCOUNT ARTIFACTS vs BOOKMARKED WISHLIST */}
      <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
        
        {/* LEFT COLUMN: IDENTITY MANAGEMENT PROFILE CARD */}
        <div style={{ flex: '1 1 300px', background: 'var(--card-bg, #fff)', border: '1px solid rgba(0,0,0,0.06)', padding: '25px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <div style={{ width: '80px', height: '80px', background: '#333', color: '#fff', fontSize: '2rem', fontWeight: '800', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px auto' }}>
              {profile?.name ? profile.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <h3 style={{ margin: 0, fontWeight: '800' }}>{profile?.name || "Premium Shopper"}</h3>
            <p style={{ margin: '4px 0 0 0', fontSize: '0.8rem', color: '#777' }}>{profile?.email || "shopper@fashionhub.com"}</p>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '20px 0' }} />

          {!isEditing ? (
            <div style={{ fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div><strong style={{ display: 'block', color: '#777', fontSize: '0.7rem', uppercase: true }}>Mobile Contact:</strong> {localPhone}</div>
              <div><strong style={{ display: 'block', color: '#777', fontSize: '0.7rem', uppercase: true }}>Shipping Hub Hub destination:</strong> {localAddress}</div>
              <button onClick={() => setIsEditing(true)} style={{ marginTop: '10px', width: '100%', padding: '10px', background: '#111', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: '700', cursor: 'pointer', fontSize: '0.8rem' }}>Edit Meta Credentials</button>
            </div>
          ) : (
            <form onSubmit={handleProfileSaveChanges} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '0.7rem', fontWeight: '700', color: '#555' }}>CONTACT PHONE</label>
                <input type="tel" value={localPhone} onChange={(e) => setLocalPhone(e.target.value)} style={{ width: '100%', padding: '8px', marginTop: '4px', border: '1px solid #ccc', borderRadius: '4px' }} required />
              </div>
              <div>
                <label style={{ fontSize: '0.7rem', fontWeight: '700', color: '#555' }}>SHIPPING HUB ADDRESS</label>
                <textarea value={localAddress} onChange={(e) => setLocalAddress(e.target.value)} rows="3" style={{ width: '100%', padding: '8px', marginTop: '4px', border: '1px solid #ccc', borderRadius: '4px', resize: 'none', fontFamily: 'inherit' }} required />
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button type="submit" style={{ flex: 1, padding: '8px', background: '#27ae60', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>Save</button>
                <button type="button" onClick={() => setIsEditing(false)} style={{ flex: 1, padding: '8px', background: '#ccc', color: '#111', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Cancel</button>
              </div>
            </form>
          )}

          <button onClick={onLogout} style={{ marginTop: '25px', width: '100%', padding: '10px', background: 'transparent', color: '#ff4d4d', border: '1px solid #ff4d4d', borderRadius: '4px', fontWeight: '700', cursor: 'pointer', fontSize: '0.8rem' }}>Sign Out From System</button>
        </div>

        {/* RIGHT COLUMN: CORE WISHLIST PERSISTENCE LOGIC AREA GRID */}
        <div style={{ flex: '2 1 500px' }}>
          <div style={{ borderBottom: '2px solid #111', paddingBottom: '10px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <h3 style={{ margin: 0, fontWeight: '900', letterSpacing: '-0.5px' }}>MY CURATED WISHLIST PORTFOLIO</h3>
            <span style={{ fontSize: '0.85rem', color: '#666', fontWeight: '600' }}>({wishlist.length} Items Saved)</span>
          </div>

          {wishlist.length === 0 ? (
            <div style={{ padding: '40px 20px', textAlign: 'center', border: '2px dashed #ddd', borderRadius: '8px', background: 'rgba(0,0,0,0.01)' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>❤️</div>
              <h4 style={{ margin: '0 0 6px 0', color: '#333' }}>Your Wishlist Is Empty</h4>
              <p style={{ margin: '0 0 20px 0', fontSize: '0.85rem', color: '#777' }}>Bookmark elite styles while browsing across collections to pin them right inside this module viewport.</p>
              <Link to="/" style={{ display: 'inline-block', background: '#d4af37', color: '#111', textDecoration: 'none', padding: '10px 24px', borderRadius: '4px', fontWeight: '700', fontSize: '0.85rem', textTransform: 'uppercase' }}>Explore Products</Link>
            </div>
          ) : (
            // Wishlist Grid layout responsive interface module block
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
              {wishlist.map((product) => (
                <div key={product.id} className="wish-card" style={{ background: '#fff', border: '1px solid #eee', borderRadius: '6px', overflow: 'hidden', display: 'flex', flexDirection: 'column', position: 'relative', transition: 'box-shadow 0.2s ease' }}>
                  
                  {/* Aspect-Ratio Main Product Image Asset Preview Container Link */}
                  <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit', flexGrow: 1 }}>
                    <div style={{ height: '200px', overflow: 'hidden' }}>
                      <img src={product.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ padding: '12px' }}>
                      <span style={{ fontSize: '0.65rem', fontWeight: 'bold', color: '#777', textTransform: 'uppercase' }}>{product.brand}</span>
                      <h5 style={{ margin: '2px 0 6px 0', fontSize: '0.8rem', fontWeight: '600', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{product.name}</h5>
                      <strong style={{ fontSize: '0.9rem', color: '#111' }}>₹{product.price}</strong>
                    </div>
                  </Link>

                  {/* ACTION HANDOFF LAYER: CROSS ROUTE ITEM FROM WISHLIST DIRECTLY INTO CHECKOUT SLIDEOUT BAG */}
                  <button onClick={() => moveWishlistToCart(product)} style={{ width: '100%', padding: '10px 0', background: '#d4af37', border: 'none', color: '#111', fontWeight: '700', fontSize: '0.75rem', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.5px', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
                    ⚡ Move To Secure Bag
                  </button>

                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Global CSS Style Micro-animations Hook Injection overrides */}
      <style>{`
        .wish-card:hover {
          box-shadow: 0 6px 15px rgba(0,0,0,0.08);
        }
      `}</style>
    </div>
  );
}

export default Profile;