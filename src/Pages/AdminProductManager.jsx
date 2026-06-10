import React, { useState } from 'react';
import AdminSidebar from '../Components/AdminSidebar';

function AdminProductManager({ products = [], onAddProduct, onDeleteProduct }) {
  // Your original interactive form state hooks
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('men');
  const [brand, setBrand] = useState('');
  const [img] = useState('https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !price || !brand) return alert("Fill in required data fields!");
    
    // Committing using your exact architectural prop parameters
    onAddProduct({ 
      name, 
      price: Number(price), 
      oldPrice: Number(price) * 2, 
      category, 
      brand, 
      img, 
      size: ["M", "L"], 
      color: ["Black"], 
      desc: "Custom administrative upload variant." 
    });
    
    setName(''); 
    setPrice(''); 
    setBrand('');
    alert("System inventory updated successfully!");
  };

  return (
    <div style={{ display: 'flex', background: '#f8fafc', minHeight: '100vh' }}>
      <AdminSidebar />

      <div style={{ flex: '1', padding: '30px 4%', fontFamily: 'sans-serif', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
          
          {/* --- INVENTORY CAPTURE FORM --- */}
          <form onSubmit={handleSubmit} style={{ flex: '1 1 300px', background: '#f9f9f9', padding: '20px', borderRadius: '6px', height: 'fit-content', border: '1px solid #e3e3e3' }}>
            <h4 style={{ margin: '0 0 15px 0' }}>Introduce New Retail Style SKU</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input type="text" placeholder="Product Name" value={name} onChange={(e)=>setName(e.target.value)} style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} required />
              <input type="number" placeholder="Retail Target Price (INR)" value={price} onChange={(e)=>setPrice(e.target.value)} style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} required />
              <input type="text" placeholder="Brand Name" value={brand} onChange={(e)=>setBrand(e.target.value)} style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} required />
              <select value={category} onChange={(e)=>setCategory(e.target.value)} style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px', background: '#fff' }}>
                <option value="men">Men</option>
                <option value="women">Women</option>
                <option value="kids">Kids</option>
                <option value="accessories">Accessories</option>
              </select>
              <button type="submit" style={{ padding: '10px', background: '#27ae60', border: 'none', color: '#fff', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer' }}>Commit Item to DB</button>
            </div>
          </form>

          {/* --- SYSTEM SKU DATA TABLE CONTAINER --- */}
          <div style={{ flex: '2 1 400px' }}>
            <h4 style={{ marginBottom: '15px' }}>Current System SKUs ({products.length})</h4>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', background: '#fff', boxShadow: '0 2px 5px rgba(0,0,0,0.02)' }}>
              <thead>
                <tr style={{ background: '#eee', textAlign: 'left' }}>
                  <th style={{ padding: '10px' }}>ID</th>
                  <th style={{ padding: '10px' }}>Details</th>
                  <th style={{ padding: '10px' }}>Price</th>
                  <th style={{ padding: '10px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(p => (
                  <tr key={p.id || p._id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '10px' }}>{p.id || p._id}</td>
                    <td style={{ padding: '10px' }}><strong>[{p.brand}]</strong> {p.name}</td>
                    <td style={{ padding: '10px' }}>₹{p.price}</td>
                    <td style={{ padding: '10px' }}>
                      <button onClick={() => onDeleteProduct(p.id || p._id)} style={{ padding: '4px 8px', background: '#ff4d4d', color: '#fff', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
}

export default AdminProductManager;