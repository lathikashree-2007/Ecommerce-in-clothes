import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

function ProductCard({ product, addToCart }) {
  
  // Safe Fallback for button execution
  const handleAddToCartClick = (e) => {
    // CRITICAL: Stops the browser from navigating to the product detail page 
    // when you only intended to click the "Add to Cart" button!
    e.stopPropagation();
    e.preventDefault();
    if (addToCart) {
      addToCart(product);
    }
  };

  // Safe crash guard check if product object hasn't loaded yet
  if (!product) return null;

  return (
    <div className="product-card" style={{ background: '#fff', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column' }}>
      
      {/* FIXED: Wrapped the visual layout elements inside a routing Link component */}
      <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block', flexGrow: 1 }}>
        
        <div className="product-img-container" style={{ height: '320px', overflow: 'hidden' }}>
          <img 
            src={product.img || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600"} 
            alt={product.name} 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          />
        </div>

        <div className="product-details" style={{ padding: '20px', textAlign: 'left' }}>
          {product.brand && (
            <span style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', color: '#888', textTransform: 'uppercase', marginBottom: '4px', letterSpacing: '0.5px' }}>
              {product.brand}
            </span>
          )}
          <h4 style={{ fontSize: '1.05rem', margin: '0 0 8px 0', color: '#333', fontWeight: '600', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {product.name}
          </h4>
          <p style={{ color: '#111', fontWeight: '700', fontSize: '1.2rem', margin: 0 }}>
            ₹{(product.price || 0).toLocaleString('en-IN')}
          </p>
        </div>

      </Link>

      {/* KEEP OUTSIDE MAIN LINK SELECTION LAYER */}
      <div style={{ padding: '0 20px 20px 20px' }}>
        <button 
          onClick={handleAddToCartClick} 
          style={{ width: '100%', padding: '12px', background: '#ff3f6c', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', transition: 'background 0.2s ease' }}
        >
          Add to Bag
        </button>
      </div>

    </div>
  );
}

export default ProductCard;