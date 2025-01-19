import { DataTypes } from "sequelize";
import sequelize from "../config/conn.js";
import Order from "./Order.js";
import User from "./User.js";
import Menu from "./Menu.js";

const OrderedItems = sequelize.define("OrderedItems",{
    id:             { type: DataTypes.INTEGER,      autoIncrement: true,    primaryKey: true },
    order_id:       { type: DataTypes.INTEGER,      allowNull: false,       references: { model: Order,    key: 'id' }  },
    user:           { type: DataTypes.INTEGER,      allowNull: false,       references: { model: User,    key: 'id' }  },
    item_id:        { type: DataTypes.INTEGER,      allowNull: false,       references: { model: Menu,    key: 'id' }   },
    price:          { type: DataTypes.DECIMAL(7,2),      allowNull: false },
    paid_on:        { type: DataTypes.DATE,         allowNull: true }
});

OrderedItems.belongsTo(Order, { foreignKey: 'order_id' });
OrderedItems.belongsTo(Menu, { foreignKey: 'item_id' });
OrderedItems.belongsTo(User, { foreignKey: 'user' });

export default OrderedItems;
