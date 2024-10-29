import Order from "../models/Order.js";

export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({ status: "all-paid-for"});
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getOneOrder = async (req, res) => {
    const orderId = req.params.orderId;
    try {
        const order = await Order.find({ id: orderId });
        res.status(200).json(order);
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
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(order);
    } catch (err) {
        next(err);
    }
}
