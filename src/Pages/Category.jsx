import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function Category({ products = [], toggleWishlist, wishlist = [] }) {
  const { type } = useParams();
  
  // --- INTELLIGENCE FILTERS STATE MATRIX ---
  const [maxPrice, setMaxPrice] = useState(5000);
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [sortOption, setSortOption] = useState('popular');

  // URL types might come in capitalized like "Men", database values are lowercase "men"
  const baseItems = products.filter(p => p.category && p.category.toLowerCase() === type.toLowerCase());
  
  // Dynamic filter lists compiled strictly from database specs matching the current active collection
  const uniqueBrands = ['All', ...new Set(baseItems.map(p => p.brand))];

  const filteredItems = baseItems.filter(p => {
    if (p.price > maxPrice) return false;
    if (selectedBrand !== 'All' && p.brand !== selectedBrand) return false;
    return true;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortOption === 'lowToHigh') return a.price - b.price;
    if (sortOption === 'highToLow') return b.price - a.price;
    return b.rating - a.rating;
  });

  return (
    <div style={{ padding: '30px 6%', background: '#fafafa', minHeight: '90vh', display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
      
      {/* --- INTELLIGENT SIDEBAR PANEL --- */}
      <div style={{ flex: '1 1 220px', background: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #eee', height: 'fit-content' }}>
        <h4 style={{ margin: '0 0 15px 0', fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '1px solid #eee', paddingBottom: '8px' }}>Smart Filters</h4>
        
        {/* Price slider */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontSize: '0.8rem', fontWeight: '600', color: '#555', display: 'block', marginBottom: '8px' }}>Max Price: ₹{maxPrice}</label>
          <input type="range" min="500" max="5000" step="100" value={maxPrice} onChange={(e)=>setMaxPrice(Number(e.target.value))} style={{ width: '100%', accentColor: '#d4af37' }} />
        </div>

        {/* Dynamic Category Brands */}
        <div>
          <label style={{ fontSize: '0.8rem', fontWeight: '600', color: '#555', display: 'block', marginBottom: '8px' }}>Brand Collection:</label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {uniqueBrands.map(b => (
              <label key={b} style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input type="radio" name="brandGroup" checked={selectedBrand === b} onChange={()=>setSelectedBrand(b)} style={{ accentColor: '#d4af37' }} />
                {b}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* MERCHANDISE MAIN VIEW COMPONENT */}
      <div style={{ flex: '3 1 500px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', background: '#fff', padding: '10px 15px', borderRadius: '6px', border: '1px solid #eee' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: '800', textTransform: 'uppercase', margin: 0 }}>{type} Group ({sortedItems.length})</h2>
          <select value={sortOption} onChange={(e)=>setSortOption(e.target.value)} style={{ padding: '6px 10px', borderRadius: '4px', border: '1px solid #ddd', fontSize: '0.8rem', background: '#fff' }}>
            <option value="popular">Popularity</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>
        </div>

        {sortedItems.length === 0 ? <p style={{ textAlign: 'center', color: '#888', marginTop: '40px' }}>No styles match current limits.</p> : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
            {sortedItems.map(p => (
              // 💡 FIXED: Changed keys and checking paths to use MongoDB's ._id property
              <div key={p._id} style={{ background: '#fff', border: '1px solid #eee', borderRadius: '6px', overflow: 'hidden', position: 'relative' }}>
                <button onClick={() => toggleWishlist(p)} style={{ position: 'absolute', top: '8px', right: '8px', border: 'none', background: '#fff', width: '28px', height: '28px', borderRadius: '50%', cursor: 'pointer' }}>
                  {wishlist.some(w => w._id === p._id) ? '❤️' : '🤍'}
                </button>
                <Link to={`/product/${p._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <img src={p.img} alt={p.name} style={{ width: '100%', height: '240px', objectFit: 'cover' }} />
                  <div style={{ padding: '10px' }}>
                    <span style={{ fontSize: '0.7rem', color: '#999', display: 'block' }}>{p.brand}</span>
                    <h4 style={{ fontSize: '0.8rem', margin: '2px 0 4px 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.name}</h4>
                    <span style={{ fontSize: '0.9rem', fontWeight: '700' }}>₹{p.price}</span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Category;