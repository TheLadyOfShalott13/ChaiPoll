const { DataTypes } = require("sequelize");
const sequelize = require("../config/conn.js");

const Restaurant = sequelize.define("Restaurant",{
    id:         { type: DataTypes.INTEGER,  autoIncrement: true,    primaryKey: true },
    name:       { type: DataTypes.STRING,   allowNull: false },
    address:    { type: DataTypes.STRING,   allowNull: false },
    del_mins:   { type: DataTypes.INTEGER,   allowNull: false },
    landline:   { type: DataTypes.INTEGER,  allowNull: false },
    whatsapp:   { type: DataTypes.INTEGER,  allowNull: false },
    opt_mobile: { type: DataTypes.INTEGER,  allowNull: false },
});

module.exports = Restaurant;