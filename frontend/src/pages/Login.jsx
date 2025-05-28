// pages/Login.js - Вход за потребители
import React, { useState } from 'react';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();
    if (response.ok && data.token) {
      alert('Успешен вход!');
      // Save token for authenticated requests
      localStorage.setItem('token', data.token);
      window.location.href = '/';
    } else {
      alert(data.error || 'Грешка при вход.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-sm">
        <h2 className="text-center">Вход</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Потребителско име</label>
            <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Парола</label>
            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-primary w-100">Вход</button>
        </form>
      </div>
    </div>
  );
}

export default Login;