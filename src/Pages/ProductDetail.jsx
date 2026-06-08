import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function ProductDetail({ products, addToCart, toggleWishlist, wishlist, trackHistory }) {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));
  const [selectedSize, setSelectedSize] = useState('');

  useEffect(() => {
    if (product) trackHistory(product.id);
  }, [id, product]);

  if (!product) return <div style={{ padding: '40px 6%' }}>Product architecture not found.</div>;

  // AI Recommendation Engine: Automatically builds a pairing combination setup
  const aiCoordinates = products.filter(p => p.id !== product.id && p.category !== product.category).slice(0, 2);

  return (
    <div style={{ padding: '30px 6% 100px 6%' }}>
      <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 400px' }}>
          <img src={product.img} alt="" style={{ width: '100%', maxHeight: '500px', objectFit: 'cover', borderRadius: '8px' }} />
        </div>
        
        <div style={{ flex: '1 1 350px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <h2>{product.name}</h2>
            <p style={{ color: '#aaa', margin: '4px 0' }}>{product.brand} Collection</p>
          </div>
          
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>₹{product.price}</div>
          <p style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>{product.desc}</p>

          <div>
            <h5 style={{ marginBottom: '8px', fontSize: '0.75rem' }}>CHOOSE SIZE VARIANT:</h5>
            <div style={{ display: 'flex', gap: '10px' }}>
              {product.size.map(sz => (
                <button key={sz} onClick={() => setSelectedSize(sz)} style={{ padding: '10px 16px', background: selectedSize === sz ? '#111' : '#fff', color: selectedSize === sz ? '#fff' : '#111', border: '1px solid #111', cursor: 'pointer', fontWeight: 'bold', borderRadius: '4px' }}>{sz}</button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* --- BONUS EXPERT FEATURE: SYSTEM INTEL AI OUTFIT GENERATOR MATRIX --- */}
      <div style={{ marginTop: '50px', background: 'rgba(212,175,55,0.05)', padding: '25px', borderRadius: '8px', border: '1px dashed #d4af37' }}>
        <h4 style={{ color: '#b38f1d', margin: '0 0 4px 0', fontSize: '1rem', fontWeight: '800' }}>🤖 AI OUTFIT GENERATOR</h4>
        <p style={{ margin: '0 0 20px 0', fontSize: '0.8rem', opacity: 0.8 }}>Our stylistic engines processed this metadata to generate visual pairings to complete your look.</p>
        
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          {aiCoordinates.map(aiItem => (
            <div key={aiItem.id} style={{ display: 'flex', gap: '12px', background: '#fff', padding: '10px', borderRadius: '6px', border: '1px solid #eee', flex: '1 1 240px', alignItems: 'center' }}>
              <img src={aiItem.img} style={{ width: '50px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} alt="" />
              <div>
                <h6 style={{ margin: 0, fontSize: '0.8rem' }}>{aiItem.name}</h6>
                <strong style={{ fontSize: '0.8rem', color: '#111' }}>₹{aiItem.price}</strong>
                <Link to={`/product/${aiItem.id}`} style={{ display: 'block', fontSize: '0.75rem', color: '#d4af37', textDecoration: 'none', marginTop: '4px' }}>Pair This Style →</Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- UI/UX CRITICAL CONTEXT: FIXED MOBILE STICKY VIEW PORT ADD CART BAR --- */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: '#fff', boxShadow: '0 -4px 15px rgba(0,0,0,0.1)', padding: '12px 6%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 850 }}>
        <div>
          <span style={{ fontSize: '0.75rem', color: '#666', display: 'block' }}>Selected Variant: {selectedSize || 'None'}</span>
          <strong style={{ fontSize: '1.1rem' }}>₹{product.price}</strong>
        </div>
        <button onClick={() => { if(!selectedSize) return alert('Please Select a Size first.'); addToCart(product, selectedSize); }} style={{ padding: '12px 30px', background: '#d4af37', border: 'none', color: '#111', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer', textTransform: 'uppercase' }}>Add to Bag</button>
      </div>
    </div>
  );
}

export default ProductDetail;