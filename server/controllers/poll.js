import Poll from "../models/Poll.js";
import Menu from "../models/Menu.js";
import Restaurant from "../models/Restaurant.js";
import {literal, Op} from "sequelize";

export const createPoll = async (req, res, next) => {
    const newPoll = new Poll(req.body)

    try {
        const savedPoll = await newPoll.save();
        res.status(200).json(savedPoll);
    }
    catch (err) {
        next(err)
    }
}

export const deletePoll = async (req, res, next) => {
    try {
        await Poll.destroy( { where: { id: req.params.id } });
        res.status(200).json("The selected poll has been deleted");
    } catch (err) {
        next(err);
    }
};

export const getAllPoll = async (req, res, next) => {
    try {
        const poll = await Poll.findAll({
            attributes: { include: [ [literal('IF(pollEnd IS NULL, "running", "ended")'), 'status'] ] },
            include: [ { model: Restaurant, attributes: ['name','address'] }]
        });

        const modifiedPoll = poll.map(ele => ({
            ...ele.get({ plain: true }), // Spread all properties of the original object
            restaurant_name: ele.Restaurant.name,
            restaurant_address: ele.Restaurant.address
        }));

        res.status(200).json(modifiedPoll);
    } catch (err) {
        next(err)
    }
}

export const getOnePoll = async (req, res, next) => {
    const pollId = req.params.id;

    try {
        const poll = await Poll.findAll({ where: { id: pollId } });
        res.status(200).json(poll);
    } catch (err) {
        next(err)
    }
}

export const getRunningPoll = async (req, res, next) => {

    try {
        const poll = await Poll.findAll({
            where: { pollEnd: { [Op.is]: null } },
            include: [ { model: Restaurant, attributes: ['name','address'] }],
            order: [ ['id', 'DESC'] ],
            limit: 1
        });

        const runningPoll = poll.map(ele => ({
            ...ele.get({ plain: true }), // Spread all properties of the original object
            restaurant_name: ele.Restaurant.name,
            restaurant_address: ele.Restaurant.address
        }));

        res.status(200).json(runningPoll);
    } catch (err) {
        next(err)
    }
}

export const getInitialPollData = async (req, res, next) => {

    try {
        const currentPoll = await Poll.findAll({
            where: { pollEnd: { [Op.is]: null } },
            order: [ ['id', 'DESC'] ],
            limit: 1
        });

        let modifiedMenu = {};

        if (currentPoll.length > 0) {
            const menu = await Menu.findAll({
                where: { restaurant: currentPoll[0].restoId },
            });

            menu.map(function (ele) {
                modifiedMenu[ele.id] = {voters: [], label: ele.name};
            })
        }

        res.status(200).json(modifiedMenu);
    } catch (err) {
        next(err)
    }
}

export const updatePoll = async (req, res, next) => {
    try {
        const poll = await Poll.update( req.body, {where: {id: req.params.id}} );
        res.status(200).json(poll);
    } catch (err) {
        next(err);
    }
}