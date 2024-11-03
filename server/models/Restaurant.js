import { DataTypes } from "sequelize";
import sequelize from "../config/conn.js";

const Restaurant = sequelize.define("Restaurant",{
    id:         { type: DataTypes.INTEGER,  autoIncrement: true,    primaryKey: true },
    name:       { type: DataTypes.STRING,   allowNull: false },
    address:    { type: DataTypes.STRING,   allowNull: false },
    del_mins:   { type: DataTypes.INTEGER,  allowNull: false },
    landline:   { type: DataTypes.STRING,   allowNull: false },
    whatsapp:   { type: DataTypes.STRING,   allowNull: false },
    opt_mobile: { type: DataTypes.STRING,   allowNull: false },
});

export default Restaurant;
