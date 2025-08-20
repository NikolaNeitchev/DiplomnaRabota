const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');          // if you have it
const servicesRoutes = require('./routes/services');
const ordersRoutes = require('./routes/orders');

const app = express();
app.use(cors());
app.use(express.json());

// mount routers
if (authRoutes) app.use('/auth', authRoutes);
app.use('/services', servicesRoutes); // GET/POST /services
app.use('/orders', ordersRoutes);     // POST /orders

const PORT = 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
