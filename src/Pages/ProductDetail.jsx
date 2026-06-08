import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function ProductDetail({ productsList = [], products = [], addToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);

  // 1. Safe fallback resolution to locate the matching item
  const coreProductsArray = productsList.length > 0 ? productsList : products;
  const product = coreProductsArray.find(p => String(p.id) === String(id));

  // 2. Crash Guard: If the product database is loading or the ID doesn't exist, show a helpful message instead of a blank screen
  if (!product) {
    return (
      <div style={{ padding: '60px 4%', textAlign: 'center', minHeight: '70vh', fontFamily: 'sans-serif' }}>
        <h2>Product Not Found</h2>
        <p style={{ color: '#666' }}>We couldn't locate the catalog item with ID: {id}. It might have been cleared from local storage.</p>
        <button 
          onClick={() => navigate('/')} 
          style={{ padding: '10px 20px', background: '#111', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '15px' }}
        >
          Return to Catalog
        </button>
      </div>
    );
  }

  const handleOrderSubmission = () => {
    if (!selectedSize && product.size && product.size.length > 0 && product.size[0] !== "Free Size") {
      alert("Please select a variant size option before ordering.");
      return;
    }

    // Call the parent state handler to inject the item into your persistent global bag
    if (addToCart) {
      addToCart({
        ...product,
        chosenSize: selectedSize || product.size?.[0] || "Standard"
      });
    }

    setOrderPlaced(true);
    alert(`🎉 Success! Added "${product.name}" to your secure bag.`);
  };

  return (
    <div style={{ padding: '40px 6%', minHeight: '80vh', fontFamily: 'sans-serif', display: 'flex', gap: '50px', flexWrap: 'wrap' }}>
      
      {/* LEFT COLUMN: VISUAL MEDIA CONTAINER */}
      <div style={{ flex: '1 1 400px', maxWidth: '500px' }}>
        <img 
          src={product.img || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600"} 
          alt={product.name} 
          style={{ width: '100%', borderRadius: '8px', objectFit: 'cover', border: '1px solid #eee' }} 
        />
      </div>

      {/* RIGHT COLUMN: DISPATCH/ORDER MATRIX SUMMARY */}
      <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', gap: '15px', textAlign: 'left' }}>
        <span style={{ textTransform: 'uppercase', color: '#777', fontSize: '12px', fontWeight: 'bold', letterSpacing: '1px' }}>{product.brand || "FashionHub Core"}</span>
        <h1 style={{ margin: 0, fontSize: '28px', fontWeight: '800' }}>{product.name}</h1>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', margin: '5px 0' }}>
          <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#ff3f6c' }}>₹{product.price}</span>
          {product.oldPrice && <span style={{ textDecoration: 'line-through', color: '#aaa', fontSize: '16px' }}>₹{product.oldPrice}</span>}
          {product.discount && <span style={{ color: '#27ae60', fontSize: '14px', fontWeight: 'bold' }}>({product.discount}% OFF)</span>}
        </div>

        <p style={{ color: '#444', fontSize: '14px', lineHeight: '1.6', margin: '10px 0' }}>
          {product.desc || "High-quality, curated garment inventory layer built sustainably for versatile everyday wardrobe configuration styles."}
        </p>

        <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '10px 0' }} />

        {/* SIZE VARIANT INPUT CONTROLS */}
        {product.size && product.size.length > 0 && (
          <div>
            <h4 style={{ margin: '0 0 10px 0', fontSize: '14px' }}>SELECT SIZE</h4>
            <div style={{ display: 'flex', gap: '10px' }}>
              {product.size.map((sz) => (
                <button
                  key={sz}
                  onClick={() => setSelectedSize(sz)}
                  style={{
                    padding: '10px 18px',
                    border: selectedSize === sz ? '2px solid #ff3f6c' : '1px solid #ccc',
                    background: selectedSize === sz ? '#fff' : '#f9f9f9',
                    color: selectedSize === sz ? '#ff3f6c' : '#111',
                    fontWeight: 'bold',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    transition: 'all 0.1s ease'
                  }}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ORDER DISPATCH ACTIONS */}
        <div style={{ marginTop: '20px', display: 'flex', gap: '15px' }}>
          <button 
            onClick={handleOrderSubmission}
            style={{
              flex: 1, padding: '15px', background: '#ff3f6c', color: '#fff',
              border: 'none', borderRadius: '4px', fontSize: '15px', fontWeight: 'bold',
              cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.5px'
            }}
          >
            🛒 Add to Shopping Bag
          </button>
          
          <button 
            onClick={() => navigate('/orders')}
            style={{
              padding: '15px 20px', background: '#111', color: '#fff',
              border: 'none', borderRadius: '4px', fontSize: '14px', fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            📦 Track Orders
          </button>
        </div>

        {orderPlaced && (
          <div style={{ marginTop: '15px', padding: '12px', background: '#e8f8f5', color: '#27ae60', borderRadius: '4px', fontSize: '13px', fontWeight: '600', border: '1px solid #d1f2eb' }}>
            ✓ Item checked out successfully. You can inspect tracking data instantly inside your Dashboard portal!
          </div>
        )}
      </div>

    </div>
  );
}