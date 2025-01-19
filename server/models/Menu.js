import { DataTypes } from "sequelize";
import sequelize from "../config/conn.js";
import Category from "./Category.js";
import Restaurant from "./Restaurant.js";

const Menu = sequelize.define("Menu",{
    id:         { type: DataTypes.INTEGER,      autoIncrement: true,    primaryKey: true },
    name:       { type: DataTypes.STRING,       allowNull: false },
    price:      { type: DataTypes.STRING,       allowNull: false },
    category:   { type: DataTypes.INTEGER,      allowNull: false,       references: { model: Category,      key: 'id' } },
    restaurant: { type: DataTypes.INTEGER,      allowNull: false,       references: { model: Restaurant,    key: 'id' } }
});

//Define Associations
Menu.belongsTo(Category, { foreignKey: 'category' });
Menu.belongsTo(Restaurant, { foreignKey: 'restaurant' });

export default Menu;
