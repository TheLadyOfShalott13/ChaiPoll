import OrderedItems from "../models/OrderedItems.js";

export const getAllOrderedItems = async (req, res) => {
    const orderId = req.params.id;
    try {
        const orderedItems = await OrderedItems.find({ orderId: orderId});
        res.status(200).json(orderedItems);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createOrderItems = async (req, res, next) => {
    const orderedItems = new OrderedItems(req.body)
    try {
        const savedorderedItems = await orderedItems.save();
        res.status(200).json(savedorderedItems);
    }
    catch (err) {
        next(err)
    }
}

export const updatePaid = async (req, res, next) => {
    try {
        const orderedItems = await OrderedItems.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(orderedItems);
    } catch (err) {
        next(err);
    }
}