import Menu from "../models/Menu.js";
import Restaurant from "../models/Restaurant.js";
import Category from "../models/Category.js";

export const createMenu = async (req, res, next) => {
    const newMenu = new Menu(req.body)

    try {
        const savedMenu = await newMenu.save();
        res.status(200).json(savedMenu);
    }
    catch (err) {
        next(err)
    }
}

export const deleteMenu = async (req, res, next) => {
    try {
        await Menu.destroy( { where: { id: req.params.id } });
        res.status(200).json("The selected menu item has been deleted");
    } catch (err) {
        next(err);
    }
};

export const getMenu = async (req, res, next) => {
    const restoId = req.params.id;
    try {
        const menu = await Menu.findAll({
            where: { restaurant: restoId },
            include: [
                { model: Restaurant, attributes: ['name','address'] },
                { model: Category, attributes: ['name'] },
            ] });

        const modifiedMenu = menu.map(ele => ({
            ...ele.get({ plain: true }), // Spread all properties of the original object
            restaurant_name: ele.Restaurant.name,
            restaurant_address: ele.Restaurant.address,
            category_name: ele.Category.name
        }));

        res.status(200).json(modifiedMenu);
    } catch (err) {
        next(err)
    }
}

export const getOneMenu = async (req, res, next) => {
    const menuId = req.params.id;

    try {
        const menu = await Menu.findAll({
            where: { id: menuId },
            include: [
                { model: Category, attributes: ['name'] },
            ]
        });
        const modifiedMenu = menu.map(ele => ({
            ...ele.get({ plain: true }), // Spread all properties of the original object
            category_name: ele.Category.name
        }));

        res.status(200).json(modifiedMenu);
    } catch (err) {
        next(err)
    }
}

export const updateMenu = async (req, res, next) => {
    try {
        const menu = await Menu.update(
            req.body, { where: {id: req.params.id} }
        );
        res.status(200).json(menu);
    } catch (err) {
        next(err);
    }
}