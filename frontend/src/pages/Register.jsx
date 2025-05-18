// pages/Register.js - Регистрация с по-красив UI
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();
    if (data.user) {
      alert('Регистрацията е успешна! Влезте в системата.');
      window.location.href = "/login";
    } else {
      alert('Грешка при регистрация.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-sm">
        <h2 className="text-center">Регистрация</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label className="form-label">Потребителско име</label>
            <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Парола</label>
            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-primary w-100">Регистрация</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
