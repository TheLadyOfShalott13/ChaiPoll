const { DataTypes } = require("sequelize");
const sequelize = require("../config/conn.js");
const Restaurant = require('./Restaurant');
const User = require('./User');

const Order = sequelize.define("Order",{
    id:             { type: DataTypes.INTEGER,      autoIncrement: true,    primaryKey: true },
    order_date:     { type: DataTypes.STRING,       allowNull: false },
    order_time:     { type: DataTypes.STRING,       allowNull: false },
    payment_method: { type: DataTypes.ENUM,         allowNull: false,       values: ['cod', 'card'], },
    paid_by:        { type: DataTypes.INTEGER,      allowNull: false,       references: { model: User,          key: 'id' } },
    restaurant:     { type: DataTypes.INTEGER,      allowNull: false,       references: { model: Restaurant,    key: 'id' } },
    status:         { type: DataTypes.ENUM,         allowNull: false,       values: ['pending', 'all-paid-up'], defaultValue: 'pending' }
});

module.exports = Order;
