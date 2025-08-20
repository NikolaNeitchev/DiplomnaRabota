// ...imports unchanged
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Services() {
  const [services, setServices] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // buy modal state
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [buyEmail, setBuyEmail] = useState('');
  const [buyMessage, setBuyMessage] = useState('');
  const [selectedService, setSelectedService] = useState(null);
  const [isBusy, setIsBusy] = useState(false);

  const isLoggedIn = !!localStorage.getItem('token');

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('http://localhost:5000/services');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setServices(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Failed to load services:', err);
        setServices([]);
      }
    };
    load();
  }, []);

  const handleAddService = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) return alert('Трябва да сте влезли в системата!');
    try {
      const res = await fetch('http://localhost:5000/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ title, description, price: Number(price) })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Грешка при добавяне на услуга.');
      setServices(prev => [...prev, data]);
      setTitle(''); setDescription(''); setPrice('');
      setShowCreateModal(false);
      alert('Услугата е добавена успешно!');
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const openBuyModal = (service) => {
    setSelectedService(service);
    setBuyEmail('');
    setBuyMessage('');
    setShowBuyModal(true);
  };

  const handleSendEmail = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) return alert('Трябва да сте влезли в системата!');
    if (!buyEmail || !buyMessage) return alert('Моля, въведете имейл и съобщение.');

    try {
      setIsBusy(true);
      const res = await fetch('http://localhost:5000/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({
          serviceId: selectedService.id,
          email: buyEmail,
          message: buyMessage
        })
      });
      const data = await res.json();
      setIsBusy(false);
      if (!res.ok) throw new Error(data.error || 'Грешка при изпращане на имейл.');

      alert(`Заявка №${data.orderId}: имейлът е изпратен до изпълнителя.`);
      setShowBuyModal(false);
    } catch (err) {
      setIsBusy(false);
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Налични услуги</h1>

      {isLoggedIn && (
        <div className="mb-4">
          <button className="btn btn-success" onClick={() => setShowCreateModal(true)}>Добави услуга</button>
        </div>
      )}

      {/* Create Service Modal (unchanged) */}
      {showCreateModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <form onSubmit={handleAddService}>
                <div className="modal-header">
                  <h5 className="modal-title">Добави услуга</h5>
                  <button type="button" className="btn-close" onClick={() => setShowCreateModal(false)}></button>
                </div>
                <div className="modal-body">
                  <input className="form-control mb-2" type="text" placeholder="Заглавие" value={title} onChange={e => setTitle(e.target.value)} required />
                  <input className="form-control mb-2" type="text" placeholder="Описание" value={description} onChange={e => setDescription(e.target.value)} required />
                  <input className="form-control mb-2" type="number" placeholder="Цена" value={price} onChange={e => setPrice(e.target.value)} required />
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowCreateModal(false)}>Затвори</button>
                  <button type="submit" className="btn btn-primary">Добави</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Buy Modal (email + message, no Stripe) */}
      {showBuyModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <form onSubmit={handleSendEmail}>
                <div className="modal-header">
                  <h5 className="modal-title">Свържете се с изпълнителя</h5>
                  <button type="button" className="btn-close" onClick={() => setShowBuyModal(false)}></button>
                </div>
                <div className="modal-body">
                  <p className="mb-2">
                    Услуга: <strong>{selectedService?.title}</strong>
                  </p>
                  <p className="mb-3">
                    Цена: <strong>${selectedService ? Number(selectedService.price).toFixed(2) : ''}</strong>
                  </p>
                  <input
                    className="form-control mb-2"
                    type="email"
                    placeholder="Вашият имейл"
                    value={buyEmail}
                    onChange={e => setBuyEmail(e.target.value)}
                    required
                  />
                  <textarea
                    className="form-control"
                    rows="5"
                    placeholder="Напишете съобщение към изпълнителя..."
                    value={buyMessage}
                    onChange={e => setBuyMessage(e.target.value)}
                    required
                  />
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowBuyModal(false)}>Затвори</button>
                  <button type="submit" className="btn btn-primary" disabled={isBusy}>
                    {isBusy ? 'Изпращане...' : 'Продължи'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <div className="row">
        {(Array.isArray(services) ? services : []).map(service => (
          <div key={service.id} className="col-md-4">
            <div className="card shadow-sm p-3 h-100">
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <p><strong>Цена:</strong> ${Number(service.price).toFixed(2)}</p>
              {isLoggedIn && (
                <button className="btn btn-primary mt-2" onClick={() => openBuyModal(service)}>
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
