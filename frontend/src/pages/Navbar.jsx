// components/Navbar.js - Навигационно меню с Bootstrap стилове
import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">Услуги Платформа</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><Link className="nav-link" to="/services">Услуги</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/orders">Поръчки</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/login">Вход</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/register">Регистрация</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
