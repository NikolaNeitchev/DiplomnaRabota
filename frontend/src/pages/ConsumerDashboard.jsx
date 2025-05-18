// pages/ConsumerDashboard.js - Стилизирана страница за потребители
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export function ConsumerDashboard() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/getservices")
      .then(res => res.json())
      .then(data => {
        setServices(data.services);
        setLoading(false);
      })
      .catch(error => console.error("Error fetching services:", error));
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center">Налични услуги</h1>
      <div className="row">
        {loading ? (
          <p className="text-center">Зареждане...</p>
        ) : services.length > 0 ? (
          services.map(service => (
            <div key={service.id} className="col-md-4">
              <div className="card shadow-sm p-3">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <p><strong>Цена:</strong> ${service.price.toFixed(2)}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">Няма налични услуги</p>
        )}
      </div>
    </div>
  );
}
