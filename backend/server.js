const express = require('express');
const cors = require('cors');
const { client } = require('./config/database'); 
const authRoutes = require('./routes/auth');
const serviceRoutes = require('./routes/services');
const orderRoutes = require('./routes/orders');
const stripeRoutes = require('./routes/stripe');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Регистриране на маршрутите
app.use('/auth', authRoutes);
app.use('/services', serviceRoutes);
app.use('/orders', orderRoutes);
app.use('/stripe', stripeRoutes);

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});