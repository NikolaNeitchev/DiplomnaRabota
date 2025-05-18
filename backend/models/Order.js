// models/Order.js - Модел за поръчки
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const User = require('./User');
const Service = require('./Service');

const Order = sequelize.define('Order', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    serviceId: { type: DataTypes.UUID, allowNull: false, references: { model: Service, key: 'id' } },
    buyerId: { type: DataTypes.UUID, allowNull: false, references: { model: User, key: 'id' } },
    status: { type: DataTypes.STRING, allowNull: false, defaultValue: 'pending' },
    paymentIntent: { type: DataTypes.STRING, allowNull: false }
});

Order.belongsTo(User, { foreignKey: 'buyerId' });
Order.belongsTo(Service, { foreignKey: 'serviceId' });

module.exports = Order;
