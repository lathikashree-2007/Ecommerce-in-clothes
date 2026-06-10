import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AdminProvider, useAdmin } from '../Context/AdminContext';

// Page Framework Layout Components
import Homepage from '../Pages/Homepage';
import Category from '../Pages/Category';
import ProductDetail from '../Pages/ProductDetail';
import Login from '../Pages/Login';
import Orders from '../Pages/Orders';
import Profile from '../Pages/Profile';
import Cart from '../Pages/Cart';
import Signup from '../Pages/Signup';
import ForgotPassword from '../Pages/ForgotPassword';
import ResetPassword from '../Pages/ResetPassword';
import AboutUs from '../Pages/AboutUs';
import ContactUs from '../Pages/ContactUs';
import FAQ from '../Pages/FAQ';
import PrivacyPolicy from '../Pages/PrivacyPolicy';
import TermsConditions from '../Pages/TermsConditions';

// Administrative Infrastructure Views
import AdminLogin from '../Pages/AdminLogin';
import AdminDashboard from '../Pages/AdminDashboard';
import AdminProductManager from '../Pages/AdminProductManager';

// Shared Layout Components
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

// Security Route guard to isolate dashboard from regular client sessions
function AdminRouteGuard({ currentUser, children }) {
  const { isAdminAuthenticated } = useAdmin();
  
  // ✅ ENHANCED BYPASS DETECTOR: Passes if AdminContext is true OR if bypass user has 'admin' role property
  const isAuthorized = isAdminAuthenticated || (currentUser && currentUser.role === 'admin');
  
  return isAuthorized ? children : <Navigate to="/login" replace />;
}

function Application() {
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]); // Global Orders State Array
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch Database Products
  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then((res) => {
        if (!res.ok) throw new Error("Failed to pipeline live database stream");
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        loading && setLoading(false);
      })
      .catch((err) => {
        console.error("Error reading database server repository:", err);
        setLoading(false);
      });
  }, []);

  // BACKEND CRUD STATE EMULATOR BRIDGE CHANNELS
  const handleAddProduct = (newProduct) => {
    const formatProduct = { ...newProduct, id: 'FH_SKU_' + Date.now() };
    setProducts((prev) => [formatProduct, ...prev]);
  };

  const handleDeleteProduct = (productId) => {
    setProducts((prev) => prev.filter((p) => (p.id !== productId && p._id !== productId)));
  };

  const handleUpdateStatus = (orderId, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.orderId === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const toggleWishlist = (product) => {
    setWishlist((prev) => 
      prev.some((item) => item._id === product._id)
        ? prev.filter((item) => item._id !== product._id)
        : [...prev, product]
    );
  };

  const addToCart = (product, selectedSize = 'M') => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item._id === product._id && item.size === selectedSize);
      if (existingIndex > -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingIndex].quantity += 1;
        return updatedCart;
      }
      return [...prevCart, { ...product, quantity: 1, size: selectedSize }];
    });
    alert(`🛍️ Added ${product.name} to your Shopping Bag!`);
  };
  // ➕ Increment item quantity in cart
  const incrementQuantity = (productId, selectedSize) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId && item.size === selectedSize
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // ➖ Decrement item quantity in cart (removes if it hits 0)
  const decrementQuantity = (productId, selectedSize) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId && item.size === selectedSize
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ).filter(item => item.quantity > 0) // Automatically clears out item if count drops below 1
    );
  };

  const placeOrder = () => {
    if (cart.length === 0) return alert("Your bag is empty!");
    if (!currentUser || !currentUser.email) {
      return alert("Please log in to your profile to complete checkout!");
    }
    
    const newOrder = {
      orderId: 'FH' + Math.floor(100000 + Math.random() * 900000),
      userEmail: currentUser.email, // Secure identity stamp
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      items: [...cart],
      grandTotal: cart.reduce((total, item) => total + item.price * item.quantity, 0),
      status: 'Processing',
      deliveryEstimate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
    };

    // Calculate the complete updated collection for THIS specific profile
    const updatedOrders = [newOrder, ...orders];
    
    // Update local Component state instantly for UI continuity
    setOrders(updatedOrders);
    
    // Permanent isolated save: Key is locked uniquely to this account's email string
    localStorage.setItem(`orders_${currentUser.email}`, JSON.stringify(updatedOrders));
    
    setCart([]); // Clean out shoppers checkout bag
    alert(`🎉 Order placed successfully under profile ${currentUser.email}! Reference ID: ${newOrder.orderId}`);
  };
  const handleLoginSuccess = (userData) => {
    setCurrentUser(userData);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontWeight: 'bold' }}>Loading Storefront...</div>;
  }

  return (
    <AdminProvider>
      <Router>
        <Routes>
          
          {/* 🛡️ ISOLATED ADMINISTRATIVE ROUTING TRACK */}
          <Route path="/admin/login" element={<AdminLogin />} />
          
          <Route path="/admin/dashboard" element={
            <AdminRouteGuard currentUser={currentUser}>
              <AdminDashboard 
                products={products} 
                orders={orders} 
                onUpdateStatus={handleUpdateStatus} 
              />
            </AdminRouteGuard>
          } />

          <Route path="/admin/add-product" element={
            <AdminRouteGuard currentUser={currentUser}>
              <AdminProductManager 
                products={products} 
                onAddProduct={handleAddProduct} 
                onDeleteProduct={handleDeleteProduct} 
              />
            </AdminRouteGuard>
          } />

          {/* 🛍️ RETAIL CLIENT WORKSPACE (Includes Nav and Footer options dynamically) */}
          <Route path="*" element={
            <>
              {/* ✅ Navbar now receives the core context user state to balance visibility maps */}
              <Navbar 
                user={currentUser} 
                onLogout={handleLogout} 
                wishlistCount={wishlist.length} 
                cartCount={cart.reduce((sum, i) => sum + i.quantity, 0)} 
              />
              <Routes>
                <Route path="/" element={<Homepage products={products} toggleWishlist={toggleWishlist} wishlist={wishlist} />} />
                <Route path="/category/:type" element={<Category products={products} toggleWishlist={toggleWishlist} wishlist={wishlist} />} />
                <Route path="/product/:id" element={<ProductDetail products={products} addToCart={addToCart} toggleWishlist={toggleWishlist} wishlist={wishlist} />} />
                <Route 
  path="/cart" 
  element={
    <Cart 
      cart={cart} 
      setCart={setCart} 
      placeOrder={placeOrder} 
      incrementQuantity={incrementQuantity} 
      decrementQuantity={decrementQuantity} 
    />
  } 
/>
                
                {/* Redirect directly to dashboard or profile if user is already logged in */}
                <Route path="/login" element={
                  currentUser ? (
                    currentUser.role === 'admin' ? <Navigate to="/admin/dashboard" /> : <Navigate to="/profile" />
                  ) : (
                    <Login onLoginSuccess={handleLoginSuccess} />
                  )
                } />
                
                <Route path="/signup" element={<Signup />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                
                <Route path="/orders" element={currentUser ? <Orders orders={orders} user={currentUser} /> : <Navigate to="/login" />} />
                <Route path="/profile" element={
                  currentUser ? (
                    <Profile 
                      user={currentUser} 
                      onLogout={handleLogout} 
                      wishlist={wishlist} 
                      toggleWishlist={toggleWishlist} 
                      addToCart={addToCart} 
                      orders={orders} 
                    />
                  ) : (
                    <Navigate to="/login" />
                  )
                } />
                
                <Route path="/about" element={<AboutUs />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<TermsConditions />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
              <Footer />
            </>
          } />

        </Routes>
      </Router>
    </AdminProvider>
  );
}

export default Application;