const { DataTypes } = require("sequelize");
const sequelize = require("../config/conn.js");
const Order = require('./Order');
const User = require('./User');

const OrderedItems = sequelize.define("OrderedItems",{
    id:             { type: DataTypes.INTEGER,      autoIncrement: true,    primaryKey: true },
    order_id:       { type: DataTypes.INTEGER,      allowNull: false,       references: { model: Order,    key: 'id' }  },
    user:           { type: DataTypes.INTEGER,      allowNull: false,       references: { model: User,    key: 'id' }  },
    item_id:        { type: DataTypes.STRING,       allowNull: false },
    price:          { type: DataTypes.DECIMAL,      allowNull: false },
    paid_on:        { type: DataTypes.DATE,         allowNull: true }
});

module.exports = OrderedItems;
