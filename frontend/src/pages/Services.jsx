// pages/Services.js - Хардкоднати услуги (без бекенд)
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const services = [
  { id: 1, title: 'Уеб разработка', description: 'Създаване на уебсайт от нулата.', price: 500 },
  { id: 2, title: 'Графичен дизайн', description: 'Дизайн на лого и банери.', price: 150 },
  { id: 3, title: 'SEO оптимизация', description: 'Подобряване на уебсайт за Google търсачката.', price: 300 },
];

function Services() {
  return (
    <div className="container mt-5">
      <h1 className="text-center">Налични услуги</h1>
      <div className="row">
        {services.map(service => (
          <div key={service.id} className="col-md-4">
            <div className="card shadow-sm p-3">
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <p><strong>Цена:</strong> ${service.price}</p>
              <button className="btn btn-primary w-100">Купи</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;
