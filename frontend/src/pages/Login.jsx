// pages/Register.js - Регистрация за потребители
import React, { useState } from 'react';

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
    <div>
      <h1>Регистрация</h1>
      <form onSubmit={handleRegister}>
        <input type="text" placeholder="Потребителско име" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Парола" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Регистрация</button>
      </form>
    </div>
  );
}

export default Register;
