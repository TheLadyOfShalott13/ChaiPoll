import {DataTypes, literal} from "sequelize";
import sequelize from "../config/conn.js";
import Restaurant from "./Restaurant.js";
import User from "./User.js";

const Order = sequelize.define("Order",{
    id:             { type: DataTypes.INTEGER,      autoIncrement: true,    primaryKey: true },
    order_datetime: { type: DataTypes.DATE,         allowNull: false,       defaultValue: literal('CURRENT_TIMESTAMP') },
    payment_method: { type: DataTypes.ENUM,         allowNull: true,       values: ['cod', 'card'], },
    paid_by:        { type: DataTypes.INTEGER,      allowNull: true,       references: { model: User,          key: 'id' } },
    restaurant:     { type: DataTypes.INTEGER,      allowNull: false,       references: { model: Restaurant,    key: 'id' } },
    status:         { type: DataTypes.ENUM,         allowNull: false,       values: ['pending', 'all-paid-up'], defaultValue: 'pending' }
});

Order.belongsTo(Restaurant, { foreignKey: 'restaurant' });
Order.belongsTo(User, { foreignKey: 'paid_by' });

export default Order;
