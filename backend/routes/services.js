const express = require('express');
const Service = require('../models/Service');
const { authenticate } = require('../middleware/auth'); // <-- fixed

const router = express.Router();

// GET /services  -> returns an array of services
router.get('/', async (req, res) => {
  try {
    const services = await Service.findAll();
    return res.json(services); // array
  } catch (err) {
    console.error('Error fetching services:', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

// POST /services -> create service (auth required)
router.post('/', authenticate, async (req, res) => {
  try {
    const { title, description, price } = req.body;
    if (!title || !description || price == null) {
      return res.status(400).json({ error: 'title, description and price are required' });
    }
    const created = await Service.create({
      title,
      description,
      price: Number(price),
      userId: req.user.id, // from JWT
    });
    return res.status(201).json(created);
  } catch (err) {
    console.error('Error creating service:', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
