import Category from "../models/Category.js";

export const createCategory = async (req, res, next) => {
    const newCategory = new Category(req.body)

    try {
        const savedCategory = await newCategory.save();
        res.status(200).json(savedCategory);
    }
    catch (err) {
        next(err)
    }
}

export const deleteCategory = async (req, res, next) => {
    try {
        await Category.findByIdAndDelete(req.params.id);
        res.status(200).json("The selected category has been deleted");
    } catch (err) {
        next(err);
    }
};

export const getAllCategory = async (req, res, next) => {
    try {
        const category = await Category.findAll();
        res.status(200).json(category);
    } catch (err) {
        next(err)
    }
}

export const getOneCategory = async (req, res, next) => {
    const categoryId = req.params.id;

    try {
        const category = await Category.find({id:categoryId});
        res.status(200).json(category);
    } catch (err) {
        next(err)
    }
}

export const updateCategory = async (req, res, next) => {
    try {
        const category = await Category.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(category);
    } catch (err) {
        next(err);
    }
}