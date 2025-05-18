// pages/Home.js - Подобрена начална страница
import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">Добре дошли в платформата за услуги! 🚀</h1>
        <p className="home-text">
          Намерете професионалисти за вашите проекти или предложете своите умения. 
          Ние свързваме **фрийлансъри** и **клиенти** по най-лесния начин!  
        </p>
        <div className="home-buttons">
          <Link to="/services" className="btn btn-primary">Разгледай услуги</Link>
          <Link to="/register" className="btn btn-outline-light">Регистрирай се</Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
