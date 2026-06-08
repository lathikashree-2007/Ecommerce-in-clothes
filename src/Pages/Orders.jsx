import React, { useState, useEffect } from 'react';

export default function Orders() {
  const [ordersList, setOrdersList] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null); 
  const [cancelReason, setCancelReason] = useState("");         
  const [customReason, setCustomReason] = useState("");         
  const [showReasonModal, setShowReasonModal] = useState(false); 

  // Synchronizes directly with the application's core database key name
  const syncOrderHistory = () => {
    const saved = localStorage.getItem('userOrders');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setOrdersList(parsed);
        }
      } catch (e) {
        setOrdersList([]);
      }
    } else {
      setOrdersList([]);
    }
  };

  useEffect(() => {
    syncOrderHistory();
    window.addEventListener('storage', syncOrderHistory);
    return () => window.removeEventListener('storage', syncOrderHistory);
  }, []);

  const initiateCancelOrder = (orderId) => {
    setSelectedOrderId(orderId);
    setCancelReason("");
    setCustomReason("");
    setShowReasonModal(true);
  };

  const handleConfirmCancellation = (e) => {
    e.preventDefault();
    const finalReason = cancelReason === "Other" ? customReason.trim() : cancelReason;

    if (!finalReason) {
      alert("Please choose a valid cancellation reason.");
      return;
    }

    const updated = ordersList.map(order => {
      if (order.orderId === selectedOrderId) {
        return { ...order, status: "Canceled", cancellationReason: finalReason };
      }
      return order;
    });

    setOrdersList(updated);
    localStorage.setItem('userOrders', JSON.stringify(updated));
    setShowReasonModal(false);
    setSelectedOrderId(null);
    alert("Order successfully canceled.");
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Your Purchase History</h2>
      
      {ordersList.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '50px 20px', color: '#666' }}>
          <h3>No matching orders found.</h3>
          <p>Please place an item in your active bag and complete the checkout sequence!</p>
        </div>
      ) : (
        <div style={styles.ordersGrid}>
          {ordersList.map((order) => (
            <div key={order.orderId} style={styles.orderCard}>
              <div style={styles.orderHeader}>
                <div><span style={styles.metaLabel}>ORDER ID:</span> #{order.orderId}</div>
                <div><span style={styles.metaLabel}>PLACED ON:</span> {order.date}</div>
                <div>
                  <span style={{ 
                    ...styles.statusBadge, 
                    backgroundColor: order.status === "Canceled" ? "#ffeef0" : order.status === "Delivered" ? "#e6f9ed" : "#fff8e6",
                    color: order.status === "Canceled" ? "#dc3545" : order.status === "Delivered" ? "#28a745" : "#ffc107"
                  }}>
                    {order.status}
                  </span>
                </div>
              </div>

              {order.items && order.items.map((item, idx) => (
                <div key={idx} style={styles.itemRow}>
                  <img src={item.img} alt={item.name} style={styles.itemImg} />
                  <div style={styles.itemDetails}>
                    <h4 style={styles.itemName}>{item.name}</h4>
                    <p style={styles.itemMeta}>Qty: {item.quantity || 1} | Price: ₹{item.price}</p>
                  </div>
                </div>
              ))}

              <div style={styles.orderFooter}>
                <div style={styles.totalText}>Grand Total: <strong>₹{order.grandTotal || order.total}</strong></div>
                
                <button
                  style={{
                    ...styles.cancelButton,
                    backgroundColor: (order.status === "Canceled" || order.status === "Delivered") ? "#f8f9fa" : "#dc3545",
                    color: (order.status === "Canceled" || order.status === "Delivered") ? "#6c757d" : "#fff",
                    cursor: (order.status === "Canceled" || order.status === "Delivered") ? "not-allowed" : "pointer"
                  }}
                  onClick={() => initiateCancelOrder(order.orderId)}
                  disabled={order.status === "Canceled" || order.status === "Delivered"}
                >
                  {order.status === "Canceled" ? "Canceled" : order.status === "Delivered" ? "Delivered" : "Cancel Order"}
                </button>
              </div>
              
              {order.status === "Canceled" && order.cancellationReason && (
                <div style={styles.reasonNote}>
                  <strong>Cancellation Reason:</strong> "{order.cancellationReason}"
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {showReasonModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h3 style={styles.modalTitle}>Cancel Order #{selectedOrderId}</h3>
            <form onSubmit={handleConfirmCancellation}>
              <select value={cancelReason} onChange={(e) => setCancelReason(e.target.value)} style={styles.dropdown} required>
                <option value="">-- Choose an option --</option>
                <option value="Changed my mind / Want to reorder">Changed my mind / Want to reorder</option>
                <option value="Found a better deal somewhere else">Found a better deal somewhere else</option>
                <option value="Other">Other Reason</option>
              </select>
              {cancelReason === "Other" && (
                <textarea placeholder="Specify custom reason..." value={customReason} onChange={(e) => setCustomReason(e.target.value)} style={styles.textarea} rows="3" required />
              )}
              <div style={styles.modalActions}>
                <button type="button" onClick={() => setShowReasonModal(false)} style={styles.backButton}>Keep Order</button>
                <button type="submit" style={styles.confirmButton}>Confirm Cancellation</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { maxWidth: '850px', margin: '40px auto', padding: '0 20px', fontFamily: 'sans-serif' },
  heading: { fontSize: '24px', fontWeight: 'bold', borderBottom: '2px solid #f0f0f0', paddingBottom: '12px', marginBottom: '24px' },
  ordersGrid: { display: 'flex', flexDirection: 'column', gap: '25px' },
  orderCard: { border: '1px solid #e2e8f0', borderRadius: '8px', padding: '24px', backgroundColor: '#fff' },
  orderHeader: { display: 'flex', justifyContent: 'space-between', paddingBottom: '16px', borderBottom: '1px solid #edf2f7', fontSize: '14px' },
  metaLabel: { color: '#718096', fontWeight: 'bold' },
  statusBadge: { padding: '4px 12px', borderRadius: '20px', fontWeight: 'bold', fontSize: '12px' },
  itemRow: { display: 'flex', gap: '20px', padding: '16px 0', borderBottom: '1px solid #f7fafc', alignItems: 'center' },
  itemImg: { width: '65px', height: '65px', objectFit: 'cover', borderRadius: '6px' },
  itemDetails: { flex: 1 },
  itemName: { margin: '0 0 4px 0', fontSize: '16px', fontWeight: '600' },
  itemMeta: { margin: 0, color: '#4a5568', fontSize: '13px' },
  orderFooter: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px' },
  totalText: { fontSize: '16px' },
  cancelButton: { padding: '10px 20px', border: 'none', borderRadius: '4px', fontWeight: 'bold', fontSize: '13px' },
  reasonNote: { marginTop: '15px', padding: '12px', backgroundColor: '#f7fafc', borderRadius: '4px', fontSize: '13px', borderLeft: '4px solid #dc3545' },
  modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 999 },
  modalContent: { backgroundColor: '#fff', padding: '30px', borderRadius: '6px', width: '90%', maxWidth: '450px' },
  modalTitle: { margin: '0 0 20px 0', fontSize: '18px', fontWeight: 'bold' },
  dropdown: { width: '100%', padding: '10px', marginBottom: '15px' },
  textarea: { width: '100%', padding: '10px', boxSizing: 'border-box' },
  modalActions: { display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' },
  backButton: { padding: '8px 16px', backgroundColor: '#e2e8f0', border: 'none', borderRadius: '4px' },
  confirmButton: { padding: '8px 16px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px' }
};