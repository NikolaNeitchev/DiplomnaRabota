const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');          
const servicesRoutes = require('./routes/services');
const ordersRoutes = require('./routes/orders');

const app = express();
app.use(cors());
app.use(express.json());


if (authRoutes) app.use('/auth', authRoutes);
app.use('/services', servicesRoutes); 
app.use('/orders', ordersRoutes);     

const PORT = 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

