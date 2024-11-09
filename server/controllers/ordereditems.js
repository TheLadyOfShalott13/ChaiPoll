import OrderedItems from "../models/OrderedItems.js";

export const getAllOrderedItems = async (req, res) => {
    const orderId = req.params.id;
    try {
        const orderedItems = await OrderedItems.findAll({ where: { order_id: orderId } });
        res.status(200).json(orderedItems);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createOrderItems = async (req, res, next) => {
    try {
        const savedorderedItems = await OrderedItems.bulkCreate(req.body, { validate: true });
        res.status(200).json(savedorderedItems);
    }
    catch (err) {
        next(err)
    }
}

export const updatePaid = async (req, res, next) => {
    try {
        const orderedItems = await OrderedItems.update(
            req.body, {where: {id: req.params.id}}
        );
        res.status(200).json(orderedItems);
    } catch (err) {
        next(err);
    }
}