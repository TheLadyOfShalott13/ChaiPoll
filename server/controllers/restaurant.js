import Restaurant from "../models/Restaurant.js";

export const createRestaurant = async (req, res, next) => {
    const newRestaurant = new Restaurant(req.body)

    try {
        const savedRestaurant = await newRestaurant.save();
        res.status(200).json(savedRestaurant);
    }
    catch (err) {
        next(err)
    }
}

export const deleteRestaurant = async (req, res, next) => {
    try {
        await Restaurant.findByIdAndDelete(req.params.id);
        res.status(200).json("The selected restaurant has been deleted");
    } catch (err) {
        next(err);
    }
};

export const getAllRestaurant = async (req, res, next) => {
    try {
        const restaurant = await Restaurant.findAll();
        res.status(200).json(restaurant);
    } catch (err) {
        next(err)
    }
}

export const getOneRestaurant = async (req, res, next) => {
    const restaurantId = req.params.id;

    try {
        const restaurant = await Restaurant.find({id:restaurantId});
        res.status(200).json(restaurant);
    } catch (err) {
        next(err)
    }
}

export const updateRestaurant = async (req, res, next) => {
    try {
        const restaurant = await Restaurant.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(restaurant);
    } catch (err) {
        next(err);
    }
}