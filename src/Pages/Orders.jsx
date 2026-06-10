import React from 'react';

export default function Orders({ orders = [], user }) {
  const myOrders = orders.filter(order => 
    !order.userEmail || order.userEmail === (user ? user.email : "") || user?.email === "guest@fashionhub.com"
  );

  return (
    <div style={{ 
      backgroundColor: '#f5f5f7', 
      minHeight: '100vh', 
      padding: '48px 20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{ maxWidth: '850px', margin: '0 auto' }}>
        
        <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#1c1c1e', marginBottom: '8px' }}>Your Orders</h2>
        <p style={{ color: '#8e8e93', margin: '0 0 32px 0', fontSize: '15px' }}>
          Logged in as: <span style={{ color: '#1c1c1e', fontWeight: '500' }}>{user?.email || 'Guest Session'}</span>
        </p>
        
        {myOrders.length === 0 ? (
          <div style={{ 
            textAlign: 'center', padding: '60px 20px', backgroundColor: '#ffffff', 
            borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.02)', border: '1px solid #e5e5ea' 
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📦</div>
            <h3 style={{ fontSize: '18px', color: '#1c1c1e', margin: '0 0 8px 0' }}>No Orders Found</h3>
            <p style={{ color: '#8e8e93', margin: 0, fontSize: '14px' }}>Looks like you haven't placed any fashion orders yet.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {myOrders.map((order) => (
              <div 
                key={order.orderId} 
                style={{ 
                  backgroundColor: '#ffffff', borderRadius: '16px', padding: '24px',
                  boxShadow: '0 4px 18px rgba(0,0,0,0.03)', border: '1px solid #e5e5ea',
                  transition: 'transform 0.2s ease'
                }}
              >
                {/* Order Top Banner Header Area */}
                <div style={{ 
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  borderBottom: '1px solid #f2f2f7', paddingBottom: '16px', marginBottom: '20px' 
                }}>
                  <div>
                    <span style={{ fontSize: '13px', fontWeight: '600', color: '#8e8e93', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Order Reference</span>
                    <div style={{ fontSize: '16px', fontWeight: '700', color: '#1c1c1e', marginTop: '2px' }}>#{order.orderId}</div>
                    <div style={{ fontSize: '13px', color: '#8e8e93', marginTop: '4px' }}>Placed on {order.date}</div>
                  </div>
                  
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ 
                      backgroundColor: '#e4f9f0', color: '#10b981', padding: '6px 14px', 
                      borderRadius: '20px', fontSize: '13px', fontWeight: '600', display: 'inline-block'
                    }}>
                      ● {order.status}
                    </span>
                  </div>
                </div>
                
                {/* Inner Delivery Content Core Grid */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {order.items.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                      <img 
                        src={item.image || 'https://via.placeholder.com/150'} 
                        alt="" 
                        style={{ width: '64px', height: '80px', objectFit: 'cover', borderRadius: '8px', backgroundColor: '#f5f5f7' }} 
                      />
                      <div style={{ flex: 1 }}>
                        <h4 style={{ margin: '0 0 4px 0', fontSize: '15px', fontWeight: '600', color: '#1c1c1e' }}>{item.name}</h4>
                        <p style={{ margin: 0, fontSize: '13px', color: '#8e8e93' }}>
                          Size: <strong style={{ color: '#1c1c1e' }}>{item.size || 'M'}</strong> &nbsp;|&nbsp; Qty: <strong style={{ color: '#1c1c1e' }}>{item.quantity}</strong>
                        </p>
                      </div>
                      <div style={{ fontSize: '16px', fontWeight: '600', color: '#1c1c1e' }}>
                        ₹{item.price * item.quantity}
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Bottom Total Segment Summary Footer */}
                <div style={{ 
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #f2f2f7' 
                }}>
                  <div>
                    <span style={{ fontSize: '13px', color: '#8e8e93' }}>Estimated Delivery</span>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#1c1c1e', marginTop: '2px' }}>🚚 By {order.deliveryEstimate}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '13px', color: '#8e8e93' }}>Total Paid</span>
                    <div style={{ fontSize: '20px', fontWeight: '700', color: '#ff3f6c', marginTop: '2px' }}>₹{order.grandTotal}</div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}