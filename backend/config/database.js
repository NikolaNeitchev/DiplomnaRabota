// config/database.js - Конфигурация на базата данни
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false,
});

sequelize.authenticate()
    .then(() => console.log('Connected to PostgreSQL database successfully.'))
    .catch(err => console.error('Database connection failed:', err));

module.exports = { sequelize };
