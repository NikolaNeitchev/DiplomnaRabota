// pages/Orders.js - Хардкоднати поръчки (без бекенд)
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const orders = [
  { id: 1, service: 'Уеб разработка', status: 'Завършена', price: 500 },
  { id: 2, service: 'Графичен дизайн', status: 'В процес', price: 150 },
  { id: 3, service: 'SEO оптимизация', status: 'Очаква плащане', price: 300 },
];

function Orders() {
  return (
    <div className="container mt-5">
      <h1 className="text-center">Моите поръчки</h1>
      <div className="row">
        {orders.map(order => (
          <div key={order.id} className="col-md-4">
            <div className="card shadow-sm p-3">
              <h3>{order.service}</h3>
              <p><strong>Статус:</strong> {order.status}</p>
              <p><strong>Цена:</strong> ${order.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
