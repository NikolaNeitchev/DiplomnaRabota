const { client } = require('../config/database');

const Order = {
  async create({ buyerId, serviceId, amount, currency }) {
    const { rows } = await client.query(
      `INSERT INTO "Orders" ("buyerId","serviceId",amount,currency,status)
       VALUES ($1,$2,$3,$4,'pending') RETURNING *`,
      [buyerId, serviceId, amount, currency]
    );
    return rows[0];
  },

  async setPaymentIntent(id, paymentIntentId, status) {
    const { rows } = await client.query(
      `UPDATE "Orders" SET "paymentIntentId"=$2, status=$3 WHERE id=$1 RETURNING *`,
      [id, paymentIntentId, status]
    );
    return rows[0];
  },
};

module.exports = Order;
