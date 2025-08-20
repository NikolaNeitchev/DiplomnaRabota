import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Orders() {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) return;
    fetch('http://localhost:5000/orders', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setOrders(Array.isArray(data) ? data : []));
  }, [token]);

  const handlePay = async (orderId) => {
    if (!token) return;
    const response = await fetch(`http://localhost:5000/orders/${orderId}/pay`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await response.json();
    if (response.ok) {
      setOrders(orders =>
        orders.map(order =>
          order.id === orderId ? { ...order, status: 'платено' } : order
        )
      );
      alert('Поръчката е платена!');
    } else {
      alert(data.error || 'Грешка при плащане.');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Моите поръчки</h1>
      <div className="row">
        {orders.map(order => (
          <div key={order.id} className="col-md-4">
            <div className="card shadow-sm p-3" style={{ position: 'relative', minHeight: 180 }}>
              <h3>{order.service_title || `Услуга ID: ${order.service_id}`}</h3>
              <p><strong>Статус:</strong> {order.status}</p>
              <p><strong>Цена:</strong> {order.service_price ? `\$${order.service_price}` : '---'}</p>

              {order.status !== 'платено' && (
                <button
                  className="btn btn-success btn-sm"
                  style={{ position: 'absolute', bottom: 10, left: 15, fontSize: 13, padding: '4px 12px' }}
                  onClick={() => handlePay(order.id)}
                >
                  PAY
                </button>
              )}
              <div style={{ position: 'absolute', bottom: 10, right: 15, fontSize: 13, color: '#888' }}>
                Поръчано от: {order.buyer_username}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
