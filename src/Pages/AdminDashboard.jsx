import React, { useState } from 'react';
import AdminSidebar from '../Components/AdminSidebar';

function AdminDashboard({ products = [], orders = [], onUpdateStatus }) {
  const [activeTab, setActiveTab] = useState('analytics');

  // Your original Analytical Framework Metrics Parsers
  const aggregateRevenue = orders.reduce((sum, o) => sum + o.grandTotal, 0);
  const aggregateUnitsSold = products.reduce((sum, p) => sum + (p.salesCount || 0), 0);

  return (
    <div style={{ display: 'flex', background: '#f8fafc', minHeight: '100vh' }}>
      {/* Structural Sidebar Component Inclusion */}
      <AdminSidebar />

      <div style={{ flex: '1', padding: '30px 4%', fontFamily: 'sans-serif', boxSizing: 'border-box' }}>
        {/* Sub-navigation controls */}
        <div style={{ display: 'flex', gap: '15px', borderBottom: '2px solid #eee', paddingBottom: '15px', marginBottom: '25px' }}>
          {['analytics', 'orders'].map(tab => (
            <button 
              key={tab} 
              onClick={() => setActiveTab(tab)} 
              style={{ 
                padding: '10px 20px', 
                background: activeTab === tab ? '#111' : '#eee', 
                color: activeTab === tab ? '#fff' : '#111', 
                border: 'none', 
                borderRadius: '4px', 
                cursor: 'pointer', 
                fontWeight: '700', 
                textTransform: 'uppercase', 
                fontSize: '0.8rem' 
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* --- REVENUE TRACKING ANALYTICS SUBPANEL --- */}
        {activeTab === 'analytics' && (
          <div>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '40px' }}>
              <div style={{ flex: '1 1 200px', background: '#fff', padding: '20px', borderRadius: '6px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', borderLeft: '4px solid #27ae60' }}>
                <span style={{ fontSize: '0.8rem', color: '#666' }}>Total Operational Revenue</span>
                <h2 style={{ margin: '5px 0 0 0', fontWeight: '800' }}>₹{aggregateRevenue}</h2>
              </div>
              <div style={{ flex: '1 1 200px', background: '#fff', padding: '20px', borderRadius: '6px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', borderLeft: '4px solid #3498db' }}>
                <span style={{ fontSize: '0.8rem', color: '#666' }}>Total Styles Transacted</span>
                <h2 style={{ margin: '5px 0 0 0', fontWeight: '800' }}>{aggregateUnitsSold} Units</h2>
              </div>
            </div>

            {/* SVG Vector Analytics Area Chart Graphic */}
            <div style={{ background: '#fff', padding: '25px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
              <h4 style={{ margin: '0 0 20px 0' }}>Operational Earnings Trajectory Pipeline (Last 6 Months)</h4>
              <div style={{ width: '100%', overflowX: 'auto' }}>
                <svg viewBox="0 0 600 200" style={{ width: '100%', height: 'auto', overflow: 'visible' }}>
                  <defs>
                    <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#27ae60" stopOpacity="0.3"/>
                      <stop offset="100%" stopColor="#27ae60" stopOpacity="0.0"/>
                    </linearGradient>
                  </defs>
                  <path d="M 50,150 L 150,110 L 250,130 L 350,70 L 450,90 L 550,30 L 550,170 L 50,170 Z" fill="url(#chartGrad)" />
                  <path d="M 50,150 L 150,110 L 250,130 L 350,70 L 450,90 L 550,30" fill="none" stroke="#27ae60" strokeWidth="3" />
                  <line x1="50" y1="170" x2="550" y2="170" stroke="#eee" strokeWidth="2" />
                  {[ {x:50,y:150,m:"Jan"}, {x:150,y:110,m:"Feb"}, {x:250,y:130,m:"Mar"}, {x:350,y:70,m:"Apr"}, {x:450,y:90,m:"May"}, {x:550,y:30,m:"Jun"} ].map((pt, i) => (
                    <g key={i}>
                      <circle cx={pt.x} cy={pt.y} r="5" fill="#111" stroke="#27ae60" strokeWidth="2" />
                      <text x={pt.x} y="190" textAnchor="middle" style={{ fontSize: '10px', fill: '#666' }}>{pt.m}</text>
                    </g>
                  ))}
                </svg>
              </div>
            </div>
          </div>
        )}

        {/* --- INBOUND REALTIME ORDERS LOG MANAGEMENT --- */}
        {activeTab === 'orders' && (
          <div>
            <h4 style={{ marginBottom: '15px' }}>Live Order Dispatches</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {orders.map(order => (
                <div key={order.orderId} style={{ border: '1px solid #eee', padding: '15px', borderRadius: '6px', background: '#fff' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', flexWrap: 'wrap', gap: '10px' }}>
                    <span>Order ID: <strong>#{order.orderId}</strong> ({order.date})</span>
                    <div>
                      <span style={{ fontSize: '0.8rem', marginRight: '8px' }}>Tracking Status:</span>
                      <select value={order.status} onChange={(e) => onUpdateStatus(order.orderId, e.target.value)} style={{ padding: '4px', background: '#fff', border: '1px solid #ccc', borderRadius: '3px', fontWeight: 'bold' }}>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </div>
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#555' }}>
                    {order.items.map((it, i) => <div key={i}>{it.name} (Size: {it.size}) x {it.quantity}</div>)}
                    <div style={{ marginTop: '8px', fontWeight: '700', color: '#111' }}>Payout Total: ₹{order.grandTotal}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;