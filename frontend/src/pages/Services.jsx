import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Services() {
  const [services, setServices] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [showModal, setShowModal] = useState(false);

  const isLoggedIn = !!localStorage.getItem('token');

  // Fetch services from backend
  useEffect(() => {
    fetch('http://localhost:5000/routes/services')
      .then(res => res.json())
      .then(data => setServices(Array.isArray(data) ? data : []));
  }, []);

  // Add default services if the list is empty (frontend only, not in DB)
  useEffect(() => {
    if (services.length === 0) {
      setServices([
        { id: 1, title: 'Уеб разработка', description: 'Изработка на уеб сайтове', price: 500 },
        { id: 2, title: 'Графичен дизайн', description: 'Дизайн на лого и визитки', price: 150 },
        { id: 3, title: 'SEO оптимизация', description: 'Оптимизация за търсачки', price: 300 }
      ]);
    }
  }, [services]);

  // Add service handler
  const handleAddService = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Трябва да сте влезли в системата!');
      return;
    }
    const response = await fetch('http://localhost:5000/routes/services', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ title, description, price })
    });
    const data = await response.json();
    if (response.ok) {
      setServices([...services, data]);
      setTitle('');
      setDescription('');
      setPrice('');
      setShowModal(false);
      alert('Услугата е добавена успешно!');
    } else {
      alert(data.error || 'Грешка при добавяне на услуга.');
    }
  };

  // Buy service handler
  const handleBuy = async (serviceId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Трябва да сте влезли в системата!');
      return;
    }
    const response = await fetch('http://localhost:5000/routes/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ serviceId })
    });
    const data = await response.json();
    if (response.ok) {
      alert('Поръчката е създадена! Статус: очаква плащане.');
    } else {
      alert(data.error || 'Грешка при създаване на поръчка.');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Налични услуги</h1>
      {isLoggedIn && (
        <div className="mb-4">
          <button className="btn btn-success" onClick={() => setShowModal(true)}>
            Добави услуга
          </button>
        </div>
      )}

      {/* Modal for adding a service */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <form onSubmit={handleAddService}>
                <div className="modal-header">
                  <h5 className="modal-title">Добави услуга</h5>
                  <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                </div>
                <div className="modal-body">
                  <input className="form-control mb-2" type="text" placeholder="Заглавие" value={title} onChange={e => setTitle(e.target.value)} required />
                  <input className="form-control mb-2" type="text" placeholder="Описание" value={description} onChange={e => setDescription(e.target.value)} required />
                  <input className="form-control mb-2" type="number" placeholder="Цена" value={price} onChange={e => setPrice(e.target.value)} required />
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Затвори</button>
                  <button type="submit" className="btn btn-primary">Добави</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <div className="row">
        {(Array.isArray(services) ? services : []).map(service => (
          <div key={service.id} className="col-md-4">
            <div className="card shadow-sm p-3">
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <p><strong>Цена:</strong> ${service.price}</p>
              {isLoggedIn && (
                <button
                  className="btn btn-primary mt-2"
                  onClick={() => handleBuy(service.id)}
                >
                  Купи
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;