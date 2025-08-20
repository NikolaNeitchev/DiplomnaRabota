const express = require('express');
const { authenticate } = require('../middleware/auth');
const Service = require('../models/Service');
const Order = require('../models/Order');
const { sendMail } = require('../mailer');
const { client } = require('../config/database');

const router = express.Router();

/**
 * POST /orders
 * body: { serviceId, email, message }
 * - loads service + provider (freelancer) email
 * - creates a minimal order
 * - emails the freelancer (with buyer’s message + contact)
 * - (optional) emails the buyer a confirmation
 */
router.post('/', authenticate, async (req, res) => {
  try {
    const { serviceId, email, message } = req.body;
    if (!serviceId || !email || !message) {
      return res.status(400).json({ error: 'serviceId, email и message са задължителни.' });
    }

    const service = await Service.findById(Number(serviceId));
    if (!service) return res.status(404).json({ error: 'Услугата не е намерена.' });

    // find freelancer (owner of the service)
    const { rows: ownerRows } = await client.query(
      'SELECT id, username, email FROM users WHERE id = $1',
      [service.userId]
    );
    const owner = ownerRows[0];
    if (!owner || !owner.email) {
      return res.status(400).json({ error: 'Собственикът на услугата няма зададен имейл.' });
    }

    // create minimal order
    const amount = Number(service.price);
    const order = await Order.create({
      buyerId: req.user.id,
      serviceId: service.id,
      amount,
      currency: 'usd',
    });

    // email to freelancer
    const subjectToFreelancer = `Нова заявка №${order.id} за "${service.title}"`;
    const htmlToFreelancer = `
      <div>
        <h2>Нова заявка за услуга</h2>
        <p><b>Заявка №:</b> ${order.id}</p>
        <p><b>Услуга:</b> ${service.title}</p>
        <p><b>Цена:</b> ${amount.toFixed(2)} USD</p>
        <hr/>
        <p><b>Съобщение от клиент:</b></p>
        <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
        <hr/>
        <p><b>Имейл за контакт:</b> ${email}</p>
      </div>
    `;

    try {
      await sendMail(owner.email, subjectToFreelancer, htmlToFreelancer);
    } catch (e) {
      console.error('Email to freelancer failed:', e?.message || e);
      // if you want to hard-fail on email errors, uncomment:
      // return res.status(500).json({ error: 'Неуспешно изпращане на имейл към изпълнителя.' });
    }

    // (optional) confirmation to buyer
    const subjectToBuyer = `Потвърждение на заявка №${order.id} – ${service.title}`;
    const htmlToBuyer = `
      <div>
        <p>Благодарим за вашата заявка № <b>${order.id}</b>.</p>
        <p>Изпратихме съобщението ви до изпълнителя (<b>${owner.username}</b>).</p>
        <p>Ще се свърже с вас на имейла: <b>${email}</b>.</p>
      </div>
    `;
    try {
      await sendMail(email, subjectToBuyer, htmlToBuyer);
    } catch (e) {
      console.error('Email to buyer failed (non-blocking):', e?.message || e);
    }

    return res.status(201).json({ orderId: order.id, message: 'Имейлът е изпратен до изпълнителя.' });
  } catch (err) {
    console.error('POST /orders error:', err);
    return res.status(500).json({ error: 'Сървърна грешка.' });
  }
});

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

module.exports = router;
