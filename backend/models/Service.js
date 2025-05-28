const { client } = require('../config/database');

const Service = {
  async create({ title, description, price, userId }) {
    const result = await client.query(
      'INSERT INTO "Services" (title, description, price, "userId") VALUES ($1, $2, $3, $4) RETURNING *',
      [title, description, price, userId]
    );
    return result.rows[0];
  },
  async findAll() {
    const result = await client.query('SELECT * FROM "Services"');
    return result.rows;
  }
};

module.exports = Service;