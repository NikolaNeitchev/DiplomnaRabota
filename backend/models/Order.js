const { client } = require('../config/database');

const Order = {
  async create({ serviceId, buyerId, status, paymentIntent }) {
    const result = await client.query(
      'INSERT INTO "Orders" ("serviceId", "buyerId", status, "paymentIntent") VALUES ($1, $2, $3, $4) RETURNING *',
      [serviceId, buyerId, status, paymentIntent]
    );
    return result.rows[0];
  },

  async findAllByBuyer(buyerId) {
    const result = await client.query(
      `SELECT o.*, s.title AS service_title, s.price AS service_price, u.username AS buyer_username
       FROM "Orders" o
       JOIN "Services" s ON o."serviceId" = s.id
       JOIN "Users" u ON o."buyerId" = u.id
       WHERE o."buyerId" = $1`,
      [buyerId]
    );
    return result.rows;
  },

  async updateStatus(orderId, status) {
    const result = await client.query(
      'UPDATE "Orders" SET status = $1 WHERE id = $2 RETURNING *',
      [status, orderId]
    );
    return result.rows[0];
  },

};

module.exports = Order;