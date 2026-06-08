import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Cart({ cart = [], setCart, onPlaceOrder }) {
  const navigate = useNavigate();

  // Shipping Form States
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [cityName, setCityName] = useState('');
  const [stateName, setStateName] = useState('');

  // 1. Calculate pricing logic parameters safely
  const itemsPrice = cart.reduce((total, item) => total + (Number(item.price) * (item.quantity || 1)), 0);
  const deliveryCharges = itemsPrice > 500 || itemsPrice === 0 ? 0 : 49;
  const totalBillAmount = itemsPrice + deliveryCharges;

  // 2. Handle item deletion from checkout bag state array
  const handleRemoveItem = (productId) => {
    if (setCart) {
      setCart(prev => prev.filter(item => item.id !== productId));
    }
  };

  // 3. Process ordering submission action
  const handleCheckoutSubmit = (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Your Shopping Bag is empty!");
      return;
    }

    // Prepare structured payload tracking artifact
    const shippingDetails = { fullName, phoneNumber, pinCode, streetAddress, cityName, stateName };
    const simulatedOrderId = "FH-" + Math.floor(100000 + Math.random() * 900000);

    const completeOrderObj = {
      orderId: simulatedOrderId,
      items: cart,
      summary: { itemsPrice, deliveryCharges, totalBillAmount },
      shipping: shippingDetails,
      date: new Date().toLocaleDateString(),
      status: "Processing Delivery"
    };

    // Store order data tracking history to local storage seamlessly
    const currentOrdersList = JSON.parse(localStorage.getItem('app_orders')) || [];
    currentOrdersList.unshift(completeOrderObj);
    localStorage.setItem('app_orders', JSON.stringify(currentOrdersList));

    // Handle cross-functional status update down to core state model parameters
    if (onPlaceOrder) {
      onPlaceOrder(completeOrderObj);
    }

    // Flush active checkout state bag clear
    if (setCart) setCart([]);

    alert(`🎉 Order Placed Successfully!\nTracking Number: ${simulatedOrderId}`);
    navigate('/orders');
  };

  // 4. Empty Bag Interface View State Guard
  if (cart.length === 0) {
    return (
      <div style={{ padding: '80px 4%', textAlign: 'center', minHeight: '60vh', fontFamily: 'sans-serif' }}>
        <div style={{ fontSize: '50px', marginBottom: '15px' }}>🛍️</div>
        <h2 style={{ fontWeight: '800' }}>Your Shopping Bag is Empty</h2>
        <p style={{ color: '#666', marginBottom: '25px', fontSize: '15px' }}>Add beautiful apparel options from our catalog collections to initiate shipping dispatch workflows.</p>
        <Link to="/" style={{ background: '#ff3f6c', color: '#fff', textDecoration: 'none', padding: '12px 30px', borderRadius: '4px', fontWeight: 'bold', fontSize: '14px', uppercase: true }}>Explore Store</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '30px 4%', minHeight: '80vh', fontFamily: 'sans-serif', backgroundColor: '#f9f9f9', color: '#1a202c' }}>
      <h2 style={{ textAlign: 'left', fontWeight: '800', marginBottom: '25px', fontSize: '24px', textTransform: 'uppercase', borderBottom: '2px solid #111', paddingBottom: '10px' }}>Secure Checkout Pipeline</h2>

      <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
        
        {/* LEFT COMPONENT COLUMN: CUSTOMER ADDRESS CAPTURE & ORDER PREVIEW */}
        <div style={{ flex: '2 1 550px', display: 'flex', flexDirection: 'column', gap: '25px' }}>
          
          {/* ITEMS SUMMARY COMPONENT */}
          <div style={{ background: '#fff', padding: '20px', borderRadius: '6px', border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
            <h3 style={{ margin: '0 0 15px 0', fontSize: '16px', fontWeight: '700', textAlign: 'left' }}>1. REVIEW ITEMS IN BAG ({cart.length})</h3>
            {cart.map((item) => (
              <div key={item.id} style={{ display: 'flex', gap: '15px', padding: '12px 0', borderBottom: '1px solid #edf2f7', alignItems: 'center' }}>
                <img src={item.img} alt="" style={{ width: '65px', height: '80px', objectFit: 'cover', borderRadius: '4px' }} />
                <div style={{ flexGrow: 1, textAlign: 'left' }}>
                  <h5 style={{ margin: 0, fontSize: '14px', fontWeight: '600' }}>{item.name}</h5>
                  <p style={{ margin: '4px 0', fontSize: '12px', color: '#718096' }}>Brand: {item.brand || 'Core'} | Size: {item.chosenSize || 'Free Size'}</p>
                  <strong style={{ fontSize: '14px', color: '#111' }}>₹{item.price}</strong>
                </div>
                <button onClick={() => handleRemoveItem(item.id)} style={{ background: 'transparent', color: '#e53e3e', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: '600' }}>Remove</button>
              </div>
            ))}
          </div>

          {/* SHIPPING DELIVERY ADDRESS INPUT CONTAINER */}
          <form onSubmit={handleCheckoutSubmit} style={{ background: '#fff', padding: '25px', borderRadius: '6px', border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <h3 style={{ margin: '0 0 5px 0', fontSize: '16px', fontWeight: '700', textAlign: 'left' }}>2. DELIVERY SHIPPING ADDRESS</h3>
            
            <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
              <div style={styles.formField}>
                <label style={styles.label}>Customer Full Name *</label>
                <input type="text" required placeholder="Receiver Name" value={fullName} onChange={(e) => setFullName(e.target.value)} style={styles.input} />
              </div>
              <div style={styles.formField}>
                <label style={styles.label}>Mobile Contact Number *</label>
                <input type="tel" required pattern="[0-9]{10}" placeholder="10-Digit Mobile Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} style={styles.input} />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
              <div style={{ ...styles.formField, flex: '1 1 150px' }}>
                <label style={styles.label}>Pincode / Postal Code *</label>
                <input type="text" required placeholder="6-Digit Code" value={pinCode} onChange={(e) => setPinCode(e.target.value)} style={styles.input} />
              </div>
              <div style={{ ...styles.formField, flex: '2 1 300px' }}>
                <label style={styles.label}>Flat, House no., Building, Apartment, Street *</label>
                <input type="text" required placeholder="Complete Street Address Layer" value={streetAddress} onChange={(e) => setStreetAddress(e.target.value)} style={styles.input} />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
              <div style={styles.formField}>
                <label style={styles.label}>Town / City *</label>
                <input type="text" required placeholder="City Name" value={cityName} onChange={(e) => setCityName(e.target.value)} style={styles.input} />
              </div>
              <div style={styles.formField}>
                <label style={styles.label}>State Region *</label>
                <input type="text" required placeholder="State Province" value={stateName} onChange={(e) => setStateName(e.target.value)} style={styles.input} />
              </div>
            </div>

            <button type="submit" style={{ display: 'none' }} id="hidden-submit-trigger" />
          </form>

        </div>

        {/* RIGHT COMPONENT COLUMN: PRICING VERIFICATION CARD & SUBMIT */}
        <div style={{ flex: '1 1 320px', position: 'sticky', top: '90px' }}>
          <div style={{ background: '#fff', padding: '20px', borderRadius: '6px', border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
            <h3 style={{ margin: '0 0 15px 0', fontSize: '15px', fontWeight: '700', borderBottom: '1px solid #eee', paddingBottom: '8px', textAlign: 'left' }}>PRICE DETAILS PRICE BREAKDOWN</h3>
            
            <div style={styles.priceRow}>
              <span>Total Catalog Price</span>
              <span>₹{itemsPrice}</span>
            </div>
            <div style={styles.priceRow}>
              <span>Shipping & Delivery Fees</span>
              <span style={{ color: deliveryCharges === 0 ? '#27ae60' : '#111' }}>{deliveryCharges === 0 ? 'FREE' : `₹${deliveryCharges}`}</span>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '15px 0' }} />

            <div style={{ ...styles.priceRow, fontSize: '16px', fontWeight: '800', color: '#111', marginBottom: '20px' }}>
              <span>Total Amount Payable</span>
              <span>₹{totalBillAmount}</span>
            </div>

            <button 
              onClick={() => document.getElementById('hidden-submit-trigger').click()}
              style={{
                width: '100%', padding: '14px', background: '#ff3f6c', color: '#fff',
                border: 'none', borderRadius: '4px', fontSize: '15px', fontWeight: 'bold',
                cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.5px'
              }}
            >
              Place Order (Cash On Delivery)
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

const styles = {
  formField: { flex: '1 1 200px', display: 'flex', flexDirection: 'column', gap: '5px', textAlign: 'left' },
  label: { fontSize: '12px', fontWeight: '600', color: '#4a5568', textTransform: 'uppercase' },
  input: { padding: '10px', borderRadius: '4px', border: '1px solid #cbd5e0', fontSize: '14px', outline: 'none' },
  priceRow: { display: 'flex', justifyContent: 'space-between', fontSize: '13px', margin: '10px 0', color: '#4a5568' }
};