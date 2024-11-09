import OrderedItems from "../models/OrderedItems.js";
import Menu from "../models/Menu.js";
import User from "../models/User.js";

export const getAllOrderedItems = async (req, res) => {
    const orderId = req.params.id;
    try {
        const orderedItems = await OrderedItems.findAll({
            where: { order_id: orderId },
            include: [
                { model: Menu, attributes: ['name'] },
                { model: User, attributes: ['name','department'] },
            ]
        });

        const modifiedItems = orderedItems.map(ele => ({
            ...ele.get({ plain: true }), // Spread all properties of the original object
            menu_item_name      : ele.Menu.name,
            user_who_ordered    : ele.User.name,
            user_dept           : ele.User.department
        }));

        res.status(200).json(modifiedItems);
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