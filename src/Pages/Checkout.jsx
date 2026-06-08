import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Checkout({ cart, cartTotal, clearCart, setOrdersList }) {
  const navigate = useNavigate();

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    // 1. Check if the cart array contains items
    if (!cart || cart.length === 0) {
      alert("Your shopping bag is completely empty! Add some gorgeous items first.");
      return;
    }

    // 2. Map items correctly to match what your application expects
    const orderItems = cart.map(item => ({
      name: item.name || "Fashion Garment",
      price: item.price || 0,
      quantity: item.quantity || 1,
      size: item.selectedSize || "M",
      img: item.img || "https://via.placeholder.com/100"
    }));

    // 3. Build a compatible order object tracking the correct fields
    const newPlacedOrder = {
      orderId: Math.floor(100000 + Math.random() * 900000), // Secure 6-digit orderId matching system spec
      date: new Date().toISOString().split('T')[0], // YYYY-MM-DD formatting
      items: orderItems,
      grandTotal: cartTotal || cart.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0),
      status: "Processing",
      shippingAddress: localStorage.getItem('userProfile') ? JSON.parse(localStorage.getItem('userProfile')).address : "Default Shipping Address",
      contactPhone: localStorage.getItem('userProfile') ? JSON.parse(localStorage.getItem('userProfile')).phone : "9876543210"
    };

    // 4. Update the state immediately in Application.js and append to 'userOrders'
    const savedOrdersString = localStorage.getItem('userOrders');
    let dynamicOrdersArray = [];

    if (savedOrdersString) {
      try {
        dynamicOrdersArray = JSON.parse(savedOrdersString);
        if (!Array.isArray(dynamicOrdersArray)) dynamicOrdersArray = [];
      } catch (err) {
        dynamicOrdersArray = [];
      }
    }

    const finalMergedTimeline = [newPlacedOrder, ...dynamicOrdersArray];
    
    // Save directly to the exact target keys used by Application.js
    localStorage.setItem('userOrders', JSON.stringify(finalMergedTimeline));
    if (setOrdersList) {
      setOrdersList(finalMergedTimeline);
    }

    // 5. Clear shopping bag view context and route over to history
    if (clearCart) {
      clearCart();
    } else {
      localStorage.setItem('cartItems', JSON.stringify([]));
    }

    alert("🎉 Order placed successfully! Tracking your shipment now...");
    navigate('/orders');
  };

  return (
    <div style={{ maxWidth: '500px', margin: '80px auto', padding: '30px', border: '1px solid #ddd', borderRadius: '8px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>Confirm Order Details</h2>
      <p style={{ color: '#555', marginBottom: '30px' }}>Your grand total value amounts to: <strong>₹{cartTotal || 0}</strong></p>
      
      <button 
        onClick={handlePlaceOrder}
        style={{ width: '100%', padding: '14px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '5px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}
      >
        Confirm & Place Order
      </button>
    </div>
  );
}