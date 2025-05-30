const { client } = require('../config/database');

const User = {
  async create({ username, password }) {
    const result = await client.query(
      'INSERT INTO "Users" (username, password) VALUES ($1, $2) RETURNING *',
      [username, password]
    );
    return result.rows[0];
  },

  async findOneByUsername(username) {
    const result = await client.query(
      'SELECT * FROM "Users" WHERE username = $1',
      [username]
    );
    return result.rows[0];
  },
};

module.exports = User;