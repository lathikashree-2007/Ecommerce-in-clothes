import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

function ProductDetail({ products = [], addToCart, toggleWishlist, wishlist = [] }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState('M');

  // 💡 FIXED: Locate item checking against MongoDB's unique string parameter '_id' rather than 'id'
  const product = products.find((p) => p._id === id);

  if (!product) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 20px', fontFamily: 'sans-serif' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '10px' }}>Product Not Found</h2>
        <p style={{ color: '#666', marginBottom: '20px' }}>We couldn't locate the catalog item with ID: {id}.</p>
        <Link to="/" style={{ padding: '12px 24px', background: '#1a202c', color: '#fff', textDecoration: 'none', borderRadius: '4px', fontWeight: 'bold' }}>Return to Catalog</Link>
      </div>
    );
  }

  const isWishlisted = wishlist.some((w) => w._id === product._id);

  return (
    <div style={{ padding: '40px 6%', display: 'flex', gap: '50px', flexWrap: 'wrap', background: '#fff', fontFamily: 'sans-serif' }}>
      {/* Product Image Gallery Panel */}
      <div style={{ flex: '1 1 400px', maxWidth: '500px' }}>
        <img src={product.img} alt={product.name} style={{ width: '100%', borderRadius: '8px', objectFit: 'cover', maxHeight: '600px', border: '1px solid #f0f0f0' }} />
      </div>

      {/* Retail Specs Detail Info Interface Panel */}
      <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <span style={{ fontSize: '0.9rem', color: '#888', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>{product.brand}</span>
          <h1 style={{ fontSize: '1.8rem', margin: '5px 0', fontWeight: '700', color: '#1a202c' }}>{product.name}</h1>
          <p style={{ color: '#666', fontSize: '0.95rem', lineHeight: '1.5', margin: '10px 0' }}>{product.description || "Premium high-quality wardrobe staple tailored for absolute lifestyle luxury, versatility, and comfort."}</p>
        </div>

        {/* Pricing Segment */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', borderBottom: '1px solid #eee', paddingBottom: '20px' }}>
          <span style={{ fontSize: '2rem', fontWeight: '800', color: '#1a202c' }}>₹{product.price}</span>
          <span style={{ textDecoration: 'line-through', color: '#aaa', fontSize: '1.1rem' }}>₹{Math.floor(product.price * 1.4)}</span>
          <span style={{ color: '#ff905a', fontWeight: 'bold', fontSize: '1rem' }}>(40% OFF)</span>
        </div>

        {/* Myntra / Flipkart Size Picker Matrix */}
        <div>
          <h4 style={{ fontSize: '0.9rem', marginBottom: '10px', textTransform: 'uppercase', color: '#222' }}>Select Size</h4>
          <div style={{ display: 'flex', gap: '12px' }}>
            {['S', 'M', 'L', 'XL'].map((size) => (
              <button key={size} onClick={() => setSelectedSize(size)} style={{ width: '45px', height: '45px', borderRadius: '50%', border: selectedSize === size ? '2px solid #1a202c' : '1px solid #ccc', background: selectedSize === size ? '#1a202c' : '#fff', color: selectedSize === size ? '#fff' : '#333', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.2s' }}>{size}</button>
            ))}
          </div>
        </div>

        {/* Actions Button Row (Add To Bag / Wishlist) */}
        <div style={{ display: 'flex', gap: '15px', marginTop: '15px' }}>
          <button onClick={() => addToCart(product, selectedSize)} style={{ flex: '2', padding: '16px', background: '#ff3f6c', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer', textTransform: 'uppercase', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', boxShadow: '0 4px 12px rgba(255,63,108,0.2)' }}>
            🛍️ Add to Bag
          </button>
          
          <button onClick={() => toggleWishlist(product)} style={{ flex: '1', padding: '16px', background: '#fff', color: '#333', border: '1px solid #d4d5d9', borderRadius: '6px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
            {isWishlisted ? '❤️ Saved' : '🤍 Wishlist'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;