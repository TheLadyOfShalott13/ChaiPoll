import Order from "../models/Order.js";
import Restaurant from "../models/Restaurant.js";
import User from "../models/User.js";

export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.findAll({
            include: [ { model: Restaurant, attributes: ['name','address'] }]
        });

        const modifiedOrders = orders.map(ele => ({
            ...ele.get({ plain: true }), // Spread all properties of the original object
            restaurant_name: ele.Restaurant.name,
            restaurant_address: ele.Restaurant.address
        }));

        res.status(200).json(modifiedOrders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getOneOrder = async (req, res) => {
    const orderId = req.params.id;
    try {
        const order = await Order.findAll({
            where: { id: orderId },
            include: [
                { model: Restaurant, attributes: ['name','address'] },
                { model: User, attributes: ['name','department'] }
            ]
        });

        const modifiedOrder = order.map(ele => ({
            ...ele.get({ plain: true }), // Spread all properties of the original object
            restaurant_name: ele.Restaurant.name,
            restaurant_address: ele.Restaurant.address,
            user_who_paid: ele.User.name,
            user_dept: ele.User.department
        }));

        res.status(200).json(modifiedOrder);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createOrder = async (req, res, next) => {
    const newOrder = new Order(req.body)
    try {
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
    }
    catch (err) {
        next(err)
    }
}

export const updatePaid = async (req, res, next) => {
    try {
        const order = await Order.update(
            req.body, {where: {id: req.params.id}}
        );
        res.status(200).json(order);
    } catch (err) {
        next(err);
    }
}
