// App.js - Основен компонент на фронтенда (React.js)

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './pages/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Services from './pages/Services';
import Orders from './pages/Orders';
import Checkout from './pages/Checkout';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/services' element={<Services />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/checkout/:id' element={<Checkout />} />
      </Routes>
    </Router>
  );
}

export default App;
