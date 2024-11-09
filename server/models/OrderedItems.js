import { DataTypes } from "sequelize";
import sequelize from "../config/conn.js";
import Order from "./Order.js";
import User from "./User.js";

const OrderedItems = sequelize.define("OrderedItems",{
    id:             { type: DataTypes.INTEGER,      autoIncrement: true,    primaryKey: true },
    order_id:       { type: DataTypes.INTEGER,      allowNull: false,       references: { model: Order,    key: 'id' }  },
    user:           { type: DataTypes.INTEGER,      allowNull: false,       references: { model: User,    key: 'id' }  },
    item_id:        { type: DataTypes.INTEGER,       allowNull: false },
    price:          { type: DataTypes.DECIMAL(7,2),      allowNull: false },
    paid_on:        { type: DataTypes.DATE,         allowNull: true }
});

export default OrderedItems;
