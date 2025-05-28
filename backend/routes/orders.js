const express = require('express');
const Order = require('../models/Order');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

router.post('/', authenticate, async (req, res) => {
    try {
        const { serviceId } = req.body;
        const order = await Order.create({
            serviceId,
            buyerId: req.user.id,
            status: 'очаква плащане',
            paymentIntent: null
        });
        res.json(order);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/', authenticate, async (req, res) => {
    try {
        const orders = await Order.findAllByBuyer(req.user.id);
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/:id/pay', authenticate, async (req, res) => {
    try {
        const orderId = req.params.id;
        const updated = await Order.updateStatus(orderId, 'платено');
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
