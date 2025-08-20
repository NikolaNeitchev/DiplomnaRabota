const { client } = require('../config/database');

const Service = {
  async create({ title, description, price, userId }) {
    const { rows } = await client.query(
      'INSERT INTO "Services" (title, description, price, "userId") VALUES ($1, $2, $3, $4) RETURNING *',
      [title, description, price, userId]
    );
    return rows[0];
  },

  async findAll() {
    const { rows } = await client.query('SELECT * FROM "Services" ORDER BY id ASC');
    return rows;
  },

  async findById(id) {
    const { rows } = await client.query('SELECT * FROM "Services" WHERE id = $1', [id]);
    return rows[0];
  },
};

module.exports = Service;
