import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // 🌐 Imported to handle live server HTTP requests
import { useAdmin } from '../Context/AdminContext'; // 💎 Connects to your global backendUrl string

export default function Home({ addToCart, toggleWishlist = () => {}, wishlist = [] }) {
  // 1. Set up a state variable to hold the live database items locally
  const [dbProducts, setDbProducts] = useState([]);
  
  // 2. Extract your production Render URL dynamically from your context provider
  const { backendUrl } = useAdmin();

  // 3. Trigger an automatic data fetch loop when the landing page loads
  useEffect(() => {
    if (backendUrl) {
      axios.get(`${backendUrl}/api/products`)
        .then((response) => {
          setDbProducts(response.data); // Stores the database array smoothly in state
        })
        .catch((error) => {
          console.error("❌ Error fetching live marketplace inventory:", error.message);
        });
    }
  }, [backendUrl]);
  
  // Choose your real database catalog state variable for rendering down below
  const activeCatalogItems = dbProducts;

  // Grab just a few featured styles for the main dashboard display showcase
  const featuredMerchandise = activeCatalogItems.slice(0, 8);

  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#fdfdfd', color: '#111' }}>
      
      {/* HERO BANNER SECTION */}
      <div style={{
        background: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url("https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600")',
        backgroundSize: 'cover', backgroundPosition: 'center', height: '450px',
        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: '#fff', padding: '0 20px'
      }}>
        <h1 style={{ fontSize: '48px', fontWeight: '900', margin: '0 0 10px 0', letterSpacing: '2px' }}>EVOLVE YOUR STYLE</h1>
        <p style={{ fontSize: '18px', margin: '0 0 30px 0', fontWeight: '300', letterSpacing: '0.5px' }}>Flat 50% Off Across New Architecture Drops</p>
        <Link to="/category/men" style={{
          background: '#ff3f6c', color: '#fff', textDecoration: 'none', padding: '15px 35px',
          borderRadius: '4px', fontWeight: 'bold', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px'
        }}>Shop The Collection</Link>
      </div>

      {/* FEATURED STYLES GRID SHOWCASE */}
      <div style={{ padding: '60px 4%' }}>
        <h2 style={{ textAlign: 'center', fontSize: '24px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '40px' }}>
          Trending Styles Marketplace
        </h2>

        {featuredMerchandise.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#777' }}>Syncing global inventory records...</p>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: '30px'
          }}>
            {featuredMerchandise.map((product) => {
              // Safe check logic tracking if item is actively bookmarked inside wishlist arrays
              // Handled fallback string checking safely using fallback matching values
              const productIdStr = product._id || product.id;
              const isSavedInWishlist = Array.isArray(wishlist) && wishlist.some(item => {
                const itemIdStr = item._id || item.id;
                return String(itemIdStr) === String(productIdStr);
              });

              return (
                <div key={productIdStr} style={{
                  background: '#fff', border: '1px solid #eee', borderRadius: '8px',
                  overflow: 'hidden', position: 'relative', boxShadow: '0 4px 10px rgba(0,0,0,0.02)',
                  display: 'flex', flexDirection: 'column'
                }}>
                  
                  {/* WISHLIST OVERLAY CONTROL */}
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation(); 
                      if (typeof toggleWishlist === 'function') {
                        toggleWishlist(product);
                      }
                    }}
                    style={{
                      position: 'absolute', top: '12px', right: '12px', zIndex: 10,
                      background: '#ffffff', border: 'none', borderRadius: '50%',
                      width: '34px', height: '34px', display: 'flex', alignItems: 'center',
                      justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 6px rgba(0,0,0,0.12)',
                      fontSize: '16px', transition: 'transform 0.1s ease'
                    }}
                  >
                    {isSavedInWishlist ? '❤️' : '🤍'}
                  </button>

                  {/* ITEM PRODUCT METADATA VIEW LINKS */}
                  <Link to={`/product/${productIdStr}`} style={{ textDecoration: 'none', color: 'inherit', flexGrow: 1 }}>
                    <div style={{ height: '300px', overflow: 'hidden', backgroundColor: '#f5f5f5' }}>
                      <img src={product.img || product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    
                    <div style={{ padding: '15px', textAlign: 'left' }}>
                      <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#999', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>{product.brand || "FashionHub"}</span>
                      <h4 style={{ margin: '0 0 6px 0', fontSize: '14px', fontWeight: '600', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{product.name}</h4>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontWeight: 'bold', fontSize: '15px', color: '#111' }}>₹{product.price}</span>
                      </div>
                    </div>
                  </Link>

                  {/* DIRECT SHOPPING BAG CAPTURE ACTIONS CONTAINER */}
                  <div style={{ padding: '0 15px 15px 15px' }}>
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        if (addToCart) addToCart(product);
                      }}
                      style={{
                        width: '100%', padding: '10px', background: '#111111', color: '#ffffff',
                        border: 'none', borderRadius: '4px', fontSize: '13px', fontWeight: '700',
                        cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.5px'
                      }}
                    >
                      Add To Bag
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}