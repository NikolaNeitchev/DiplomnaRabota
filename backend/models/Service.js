// models/Service.js - Модел за услуги
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const User = require('./User');

const Service = sequelize.define('Service', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false },
    userId: { type: DataTypes.UUID, allowNull: false, references: { model: User, key: 'id' } },
});

Service.belongsTo(User, { foreignKey: 'userId' });

module.exports = Service;
