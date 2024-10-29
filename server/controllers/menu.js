import Menu from "../models/Menu.js";

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
        await Menu.findByIdAndDelete(req.params.id);
        res.status(200).json("The selected menu item has been deleted");
    } catch (err) {
        next(err);
    }
};

export const getMenu = async (req, res, next) => {
    const restoId = req.params.id;
    try {
        const menu = await Menu.find({ "restaurant": restoId }); //menu is an array/list
        res.status(200).json(menu);
    } catch (err) {
        next(err)
    }
}

export const getOneMenu = async (req, res, next) => {
    const menuId = req.params.id;

    try {
        const menu = await Menu.find({id:menuId}); //menu is an array/list
        res.status(200).json(menu);
    } catch (err) {
        next(err)
    }
}

export const updateMenu = async (req, res, next) => {
    try {
        const menu = await Menu.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(menu);
    } catch (err) {
        next(err);
    }
}