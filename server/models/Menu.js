const { DataTypes } = require("sequelize");
const sequelize = require("../config/conn.js");
const Category = require('./Category');
const Restaurant = require('./Restaurant');

const Menu = sequelize.define("Menu",{
    id:         { type: DataTypes.INTEGER,      autoIncrement: true,    primaryKey: true },
    name:       { type: DataTypes.STRING,       allowNull: false },
    price:      { type: DataTypes.STRING,       allowNull: false },
    category:   { type: DataTypes.INTEGER,      allowNull: false,       references: { model: Category,      key: 'id' } },
    restaurant: { type: DataTypes.INTEGER,      allowNull: false,       references: { model: Restaurant,    key: 'id' } }
});

module.exports = Menu;
