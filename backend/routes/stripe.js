require('dotenv').config();
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET);
const { Order } = require('../models/Order');

const router = express.Router();

router.post('/create-payment-intent', async (req, res) => {
    try {
        const { amount, currency, orderId } = req.body;
        const paymentIntent = await stripe.paymentIntents.create({ amount, currency });
        res.json({ clientSecret: paymentIntent.client_secret });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/check-payment-status/:paymentIntent', async (req, res) => {
    try {
        const paymentIntent = await stripe.paymentIntents.retrieve(req.params.paymentIntent);

        if (paymentIntent.status === 'succeeded') {
            await Order.update({ status: 'completed' }, { where: { paymentIntent: paymentIntent.id } });
            res.json({ status: 'completed' });
        } else {
            res.json({ status: paymentIntent.status });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
