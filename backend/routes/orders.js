// routes/orders.js - Управление на поръчки
const express = require('express');
const { Order } = require('../models/Order');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// Създаване на нова поръчка
router.post('/', authenticate, async (req, res) => {
    try {
        const { serviceId, paymentIntent } = req.body;
        const order = await Order.create({
            serviceId,
            buyerId: req.user.id,
            status: 'pending',
            paymentIntent
        });
        res.json(order);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Извличане на поръчки на потребителя
router.get('/', authenticate, async (req, res) => {
    try {
        const orders = await Order.findAll({ where: { buyerId: req.user.id } });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
