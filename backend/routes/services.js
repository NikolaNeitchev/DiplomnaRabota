// routes/services.js - Управление на услуги
const express = require('express');
const { Service } = require('../models/Service');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// Създаване на нова услуга
router.post('/', authenticate, async (req, res) => {
    try {
        const { title, description, price } = req.body;
        const service = await Service.create({ title, description, price, userId: req.user.id });
        res.json(service);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Извличане на всички услуги
router.get('/', async (req, res) => {
    try {
        const services = await Service.findAll();
        res.json(services);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
