import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Cart({ 
  cart = [], 
  setCart, 
  placeOrder 
}) {
  const navigate = useNavigate();
  
  // Toggle states for checkout flow stages
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  
  // Shipping Form Input Fields
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [pincode, setPincode] = useState('');
  const [addressLine, setAddressLine] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('COD'); // Default to Cash on Delivery

  // Calculate cart checkout pricing totals dynamically based on current item quantities
  const totalItemsPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = totalItemsPrice > 999 || totalItemsPrice === 0 ? 0 : 99;
  const grandTotal = totalItemsPrice + deliveryFee;

  // ⚡ INSTANT INLINE INCREMENT HANDLER (Flipkart/Meesho Mechanics)
  const handleLocalIncrement = (targetIndex) => {
    setCart(prevCart =>
      prevCart.map((item, idx) =>
        idx === targetIndex 
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      )
    );
  };

  // ⚡ INSTANT INLINE DECREMENT HANDLER (Removes item if drops below 1)
  const handleLocalDecrement = (targetIndex) => {
    setCart(prevCart =>
      prevCart.map((item, idx) => {
        if (idx === targetIndex) {
          const currentQty = item.quantity || 1;
          return currentQty > 1 ? { ...item, quantity: currentQty - 1 } : null;
        }
        return item;
      }).filter(Boolean) // Clears the item out if it returned null (hit 0)
    );
  };

  // Handles moving from Bag Overview to Address Form
  const handleProceedToCheckout = () => {
    if (cart.length === 0) {
      alert("🛒 Your shopping bag is empty!");
      return;
    }
    setIsCheckingOut(true);
  };

  // Handles finalizing the entire order form structure
  const handleFinalizeOrder = (e) => {
    e.preventDefault();

    if (!fullName || !mobile || !pincode || !addressLine) {
      alert("⚠️ Please fill in all required shipping fields.");
      return;
    }

    // Triggers the global state manager in Application.jsx
    if (typeof placeOrder === 'function') {
      placeOrder(); 
      setIsCheckingOut(false);
      navigate('/orders'); // Redirects straight to tracking page
    } else {
      console.error("The placeOrder state function prop was not mapped correctly inside Application.jsx");
      alert("Checkout error: State function missing.");
    }
  };

  return (
    <div style={{ padding: '40px 8%', background: '#f8f9fa', minHeight: '85vh', fontFamily: 'sans-serif' }}>
      
      {/* Checkout Progression Header Tracker Indicator */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '35px', fontWeight: 'bold', fontSize: '14px', color: '#718096', textTransform: 'uppercase' }}>
        <span style={{ color: !isCheckingOut ? '#ff3f6c' : '#4a5568', borderBottom: !isCheckingOut ? '2px solid #ff3f6c' : 'none', paddingBottom: '5px' }}>1. Shopping Bag</span>
        <span>➔</span>
        <span style={{ color: isCheckingOut ? '#ff3f6c' : '#4a5568', borderBottom: isCheckingOut ? '2px solid #ff3f6c' : 'none', paddingBottom: '5px' }}>2. Shipping & Payment</span>
      </div>

      {cart.length === 0 ? (
        <div style={{ background: '#fff', padding: '60px 20px', textAlign: 'center', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <span style={{ fontSize: '50px', display: 'block', marginBottom: '15px' }}>🛒</span>
          <p style={{ color: '#666', fontSize: '1.1rem', margin: '0 0 20px 0' }}>Your shopping bag feels a bit light!</p>
          <Link to="/" style={{ padding: '12px 28px', backgroundColor: '#ff3f6c', color: '#fff', textDecoration: 'none', borderRadius: '4px', fontWeight: 'bold', display: 'inline-block' }}>
            Explore Trending Styles
          </Link>
        </div>
      ) : (
        <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
          
          {/* LEFT COLUMN PANEL: SWITCHES BETWEEN BAG ITEMS AND ADDRESS FORM */}
          <div style={{ flex: '2 1 500px' }}>
            
            {!isCheckingOut ? (
              /* --- VIEW A: BAG ITEMS MATRIX LIST --- */
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <h2 style={{ fontSize: '1.3rem', fontWeight: '800', margin: '0 0 10px 0' }}>Review Bag Items</h2>
                {cart.map((item, index) => (
                  <div key={`${item._id || item.id}-${item.size}-${index}`} style={{ display: 'flex', gap: '20px', background: '#fff', padding: '15px', borderRadius: '8px', border: '1px solid #e2e8f0', position: 'relative' }}>
                    <img src={item.img || item.image} alt="" style={{ width: '90px', height: '115px', objectFit: 'cover', borderRadius: '6px' }} />
                    <div style={{ flex: '1' }}>
                      <h4 style={{ fontSize: '1rem', margin: '0 0 4px 0', fontWeight: '700' }}>{item.name}</h4>
                      <p style={{ fontSize: '0.85rem', color: '#718096', margin: '0 0 10px 0' }}>
                        Brand: <strong>{item.brand || 'Premium'}</strong> | Size: <strong style={{ color: '#ff3f6c' }}>{item.size}</strong>
                      </p>
                      
                      {/* ⚡ FLIPKART / MEESHO STYLE INCREMENT/DECREMENT QUANTITY CONTROLS */}
                      <div style={{ display: 'flex', alignItems: 'center', marginTop: '12px', marginBottom: '12px' }}>
                        
                        {/* Minus Button */}
                        <button 
                          type="button"
                          onClick={() => handleLocalDecrement(index)}
                          style={{
                            border: '1px solid #cbd5e0', backgroundColor: '#fff',
                            width: '30px', height: '30px', cursor: 'pointer',
                            fontWeight: 'bold', fontSize: '16px', display: 'flex',
                            alignItems: 'center', justifyContent: 'center',
                            borderTopLeftRadius: '4px', borderBottomLeftRadius: '4px',
                            userSelect: 'none'
                          }}
                        >
                          -
                        </button>

                        {/* Quantity Counter Display Box */}
                        <div style={{
                          borderTop: '1px solid #cbd5e0', borderBottom: '1px solid #cbd5e0',
                          width: '40px', height: '30px', display: 'flex',
                          alignItems: 'center', justifyContent: 'center',
                          fontSize: '14px', fontWeight: '700', backgroundColor: '#f8f9fa',
                          color: '#2d3748', userSelect: 'none'
                        }}>
                          {item.quantity || 1}
                        </div>

                        {/* Plus Button */}
                        <button 
                          type="button"
                          onClick={() => handleLocalIncrement(index)}
                          style={{
                            border: '1px solid #cbd5e0', backgroundColor: '#fff',
                            width: '30px', height: '30px', cursor: 'pointer',
                            fontWeight: 'bold', fontSize: '16px', display: 'flex',
                            alignItems: 'center', justifyContent: 'center',
                            borderTopRightRadius: '4px', borderBottomRightRadius: '4px',
                            userSelect: 'none'
                          }}
                        >
                          +
                        </button>

                      </div>

                      <div style={{ fontSize: '1.1rem', fontWeight: '800' }}>₹{item.price * (item.quantity || 1)}</div>
                    </div>
                    <button onClick={() => setCart(prev => prev.filter((_, idx) => idx !== index))} style={{ position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', fontSize: '16px', cursor: 'pointer', color: '#aaa' }}>✕</button>
                  </div>
                ))}
              </div>
            ) : (
              /* --- VIEW B: FLIPKART/MEESHO STYLE DELIVERY FORM --- */
              <div style={{ background: '#fff', padding: '30px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #edf2f7', paddingBottom: '10px' }}>
                  <h2 style={{ fontSize: '1.2rem', fontWeight: '800', margin: 0 }}>Add Shipping Address</h2>
                  <button onClick={() => setIsCheckingOut(false)} style={{ background: 'none', border: 'none', color: '#2b6cb0', fontWeight: 'bold', cursor: 'pointer' }}>◀ Back to Bag</button>
                </div>

                <form onSubmit={handleFinalizeOrder} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                    <div style={{ flex: '1 1 200px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <label style={styles.formLabel}>Full Customer Name *</label>
                      <input type="text" required placeholder="Name" value={fullName} onChange={e => setFullName(e.target.value)} style={styles.formInput} />
                    </div>
                    <div style={{ flex: '1 1 200px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <label style={styles.formLabel}>Mobile Contact Number *</label>
                      <input type="tel" required placeholder="10-digit phone number" pattern="[0-9]{10}" value={mobile} onChange={e => setMobile(e.target.value)} style={styles.formInput} />
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={styles.formLabel}>Delivery Location Address (Flat/House No., Building, Street Area) *</label>
                    <input type="text" required placeholder="Complete home street destination" value={addressLine} onChange={e => setAddressLine(e.target.value)} style={styles.formInput} />
                  </div>

                  <div style={{ width: '50%', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={styles.formLabel}>Postal Pincode *</label>
                    <input type="text" required placeholder="6-digit Area PIN" pattern="[0-9]{6}" value={pincode} onChange={e => setPincode(e.target.value)} style={styles.formInput} />
                  </div>

                  {/* Payment Mode Selector */}
                  <div style={{ marginTop: '15px', borderTop: '1px solid #edf2f7', paddingTop: '20px' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: '800', marginBottom: '12px' }}>Select Payment Option</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <label style={styles.radioLabel}>
                        <input type="radio" name="payment" value="COD" checked={paymentMethod === 'COD'} onChange={() => setPaymentMethod('COD')} style={{ accentColor: '#ff3f6c' }} />
                        💵 Cash on Delivery (COD) / Pay on Arrival
                      </label>
                      <label style={{ ...styles.radioLabel, opacity: 0.5, cursor: 'not-allowed' }}>
                        <input type="radio" name="payment" value="UPI" disabled style={{ accentColor: '#ff3f6c' }} />
                        📱 PhonePe / Google Pay / UPI (Temporarily Offline)
                      </label>
                    </div>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN PANEL: FIXED PRICE DETAILS & CALL TO ACTION */}
          <div style={{ flex: '1 1 300px', background: '#fff', padding: '24px', borderRadius: '8px', border: '1px solid #e2e8f0', position: 'sticky', top: '100px' }}>
            <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', color: '#718096', letterSpacing: '0.5px', margin: '0 0 15px 0', borderBottom: '1px solid #edf2f7', paddingBottom: '10px' }}>
              Order Price Breakdowns
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.95rem', color: '#4a5568' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Total Bag Price</span>
                <span>₹{totalItemsPrice}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Delivery Convenience Fee</span>
                <span style={{ color: deliveryFee === 0 ? '#006644' : '#4a5568', fontWeight: deliveryFee === 0 ? 'bold' : 'normal' }}>
                  {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                </span>
              </div>
              
              <hr style={{ border: 'none', borderTop: '1px solid #edf2f7', margin: '10px 0' }} />
              
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: '800', color: '#1a202c' }}>
                <span>Total Amount</span>
                <span style={{ color: '#ff3f6c' }}>₹{grandTotal}</span>
              </div>
            </div>

            {!isCheckingOut ? (
              <button onClick={handleProceedToCheckout} style={styles.actionButton}>
                Proceed to Checkout Form
              </button>
            ) : (
              <button onClick={handleFinalizeOrder} style={{ ...styles.actionButton, backgroundColor: '#006644', boxShadow: '0 4px 12px rgba(0,102,68,0.2)' }}>
                Confirm & Place Order
              </button>
            )}
          </div>

        </div>
      )}
    </div>
  );
}

// Inline Form Component Styling Toolkit Definitions
const styles = {
  formLabel: { fontSize: '12px', fontWeight: '700', color: '#4a5568', textTransform: 'uppercase' },
  formInput: { padding: '11px 14px', borderRadius: '4px', border: '1px solid #cbd5e0', fontSize: '14px', outline: 'none', transition: 'border-color 0.2s', backgroundColor: '#fff' },
  radioLabel: { display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', fontWeight: '600', padding: '12px', border: '1px solid #edf2f7', borderRadius: '6px', backgroundColor: '#fafbfd', cursor: 'pointer' },
  actionButton: { width: '100%', padding: '15px', backgroundColor: '#ff3f6c', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer', marginTop: '20px', textTransform: 'uppercase', letterSpacing: '0.5px', boxShadow: '0 4px 12px rgba(255,63,108,0.2)', transition: 'all 0.2s' }
};