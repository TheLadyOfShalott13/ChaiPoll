import { DataTypes, literal } from "sequelize";
import sequelize from "../config/conn.js";
import Restaurant from "./Restaurant.js";

const Poll = sequelize.define("Poll",{
    id:         { type: DataTypes.INTEGER,  autoIncrement: true,    primaryKey: true },
    restoId:    { type: DataTypes.INTEGER,  allowNull: false,       references: { model: Restaurant,    key: 'id' } },
    pollStart:  { type: DataTypes.DATE,     allowNull: false,       defaultValue: literal('CURRENT_TIMESTAMP') },
    pollEnd:    { type: DataTypes.DATE,     allowNull: true }
});

// Define associations
Poll.belongsTo(Restaurant, { foreignKey: 'restoId' });

export default Poll;
