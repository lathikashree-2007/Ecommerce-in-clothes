import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Homepage({ products, toggleWishlist, wishlist }) {
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 34, seconds: 19 });

  // Simulate High-Fidelity Skeleton Preloading Sequence Phase
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Structural Countdown Timer Engine Interval
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { hours: prev.hours, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        clearInterval(interval);
        return prev;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ paddingBottom: '60px' }}>
      
      {/* Dynamic Animated Flash Deal Banner */}
      <div style={{ background: '#b33939', color: '#fff', padding: '15px 6%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
        <div>
          <h4 style={{ margin: 0, fontWeight: '800', letterSpacing: '0.5px' }}>⚡ TODAY'S ULTRA FLASH MERCHANDISE DEALS</h4>
          <p style={{ margin: 0, fontSize: '0.8rem', opacity: 0.8 }}>Limited algorithmic supply drop. Pricing scales back up when the clock runs down.</p>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: '700', uppercase: true }}>CLOSING IN:</span>
          <div style={{ display: 'flex', gap: '4px' }}>
            {[`${timeLeft.hours}h`, `${timeLeft.minutes}m`, `${timeLeft.seconds}s`].map((unit, i) => (
              <span key={i} style={{ background: '#111', color: '#fff', padding: '6px 8px', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 'bold', fontFamily: 'monospace' }}>{unit}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Main Catalog Workspace Area */}
      <div style={{ padding: '30px 6%' }}>
        <h3 style={{ marginBottom: '25px', fontWeight: '800', textTransform: 'uppercase' }}>Curated Style Collections</h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '25px' }}>
          {loading ? (
            // Modern Structural Skeleton Wave Loader Arrays
            Array(4).fill(0).map((_, idx) => (
              <div key={idx} style={{ background: '#eee', height: '360px', borderRadius: '8px', animation: 'pulse 1.5s infinite ease-in-out' }} />
            ))
          ) : (
            products.map(prod => {
              const isWish = wishlist.some(w => w.id === prod.id);
              return (
                <div key={prod.id} className="product-card" style={{ background: 'var(--card-bg, #fff)', border: '1px solid rgba(0,0,0,0.05)', borderRadius: '8px', overflow: 'hidden', position: 'relative', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', transition: 'transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0 3s cubic-bezier(0.25, 0.8, 0.25, 1)' }}>
                  <button onClick={() => toggleWishlist(prod)} style={{ position: 'absolute', top: '12px', right: '12px', background: '#fff', border: 'none', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', zIndex: 10, boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>{isWish ? '❤️' : '🤍'}</button>
                  <Link to={`/product/${prod.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div style={{ overflow: 'hidden', height: '280px' }}>
                      <img src={prod.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} className="zoom-image" />
                    </div>
                    <div style={{ padding: '15px' }}>
                      <span style={{ fontSize: '0.7rem', fontWeight: 'bold', color: '#777', textTransform: 'uppercase' }}>{prod.brand}</span>
                      <h4 style={{ fontSize: '0.85rem', fontWeight: '600', margin: '4px 0 8px 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{prod.name}</h4>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontWeight: '700', fontSize: '1rem' }}>₹{prod.price}</span>
                        <span style={{ fontSize: '0.75rem', textDecoration: 'line-through', color: '#aaa' }}>₹{prod.oldPrice}</span>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Global CSS Injectors for High-End UX micro-interactions */}
      <style>{`
        .product-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 20px rgba(0,0,0,0.1) !important;
        }
        .product-card:hover .zoom-image {
          transform: scale(1.04);
        }
        @keyframes pulse {
          0% { opacity: 0.6; }
          50% { opacity: 1; }
          100% { opacity: 0.6; }
        }
      `}</style>
    </div>
  );
}

export default Homepage;