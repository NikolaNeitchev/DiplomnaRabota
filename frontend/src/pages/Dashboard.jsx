import React, { useState, useEffect } from "react";
import "./styles.css";

export function Dashboard() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        // Assuming the user ID is stored in localStorage after login
        const userId = localStorage.getItem("userId");

        const response = await fetch(`http://localhost:5000/api/services/${userId}`);
        const data = await response.json();

        if (response.ok) {
          setServices(data.services);
        } else {
          console.error("Error fetching services:", data.message);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="container">
      <h1>Freelancer Dashboard</h1>
      <button onClick={() => (window.location.href = "/post-service")}>
        Post a New Service
      </button>
      <div className="mt-6">
        <h2>Your Posted Services</h2>
        <div className="form-container">
          {loading ? (
            <p>Loading your services...</p>
          ) : services.length > 0 ? (
            services.map((service) => (
              <div key={service.id} className="service-card">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <p><strong>Price:</strong> ${service.price.toFixed(2)}</p>
              </div>
            ))
          ) : (
            <p>No services posted yet. Start by posting one!</p>
          )}
        </div>
      </div>
    </div>
  );
}
