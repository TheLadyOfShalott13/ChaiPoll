const { DataTypes } = require("sequelize");
const sequelize = require("../config/conn.js");

const User = sequelize.define("User",{
    id:         { type: DataTypes.INTEGER,  autoIncrement: true,    primaryKey: true },
    name:       { type: DataTypes.STRING,   allowNull: false },
    username:   { type: DataTypes.STRING,   allowNull: false },
    password:   { type: DataTypes.STRING,   allowNull: false },
    email:      { type: DataTypes.STRING,   allowNull: false },
    phone:      { type: DataTypes.INTEGER,  allowNull: false },
    department: { type: DataTypes.ENUM,     allowNull: false }
});

module.exports = User;
