// server.js - Основен входен файл на бекенда
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { sequelize } = require('./config/database');
const authRoutes = require('./routes/auth');
const serviceRoutes = require('./routes/services');
const orderRoutes = require('./routes/orders');
const stripeRoutes = require('./routes/stripe');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Регистриране на маршрутите
app.use('/auth', authRoutes);
app.use('/services', serviceRoutes);
app.use('/orders', orderRoutes);
app.use('/stripe', stripeRoutes);

// Middleware за обработка на грешки
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(err => console.error('Database connection error:', err));
