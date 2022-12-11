const { response } = require('express');
const Usuario = require('../models/Usuario');
const Spent = require('../models/Spent');
const Entrance = require('../models/Entrance');



const getSpentsAndEntrances = async (req, res) => {
    try {
        const spents = await Spent.find({user: req.params.id});
        const entrances = await Entrance.find({user: req.params.id});
        return res.status(200).json({
            spents,
            entrances
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'user_id is invalid',
        });
    }
}


const getSpentsByUser = async (req, res) => {
    try {
        const spents = await Spent.find({user: req.params.id});
        return res.status(200).json({
            spents
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'user_id is invalid',
        });
    }
}

const getEntrancesByUser = async (req, res) => {

    try {
        const entrances = await Entrance.find({user: req.params.id});
        return res.status(200).json({
            entrances
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'user_id is invalid',
        });
    }
}



/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const getSpentsById = async (req, res) => {
    try {
        const spent = await Spent.findById(req.params.id);
        return res.status(200).json({
            spent
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'id is invalid',
        });
    }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const getEntrancesById = async (req, res) => {

    try {
        const entrance = await Entrance.findById(req.params.id);
        return res.status(200).json({
            entrance
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'id is invalid',
        });
    }

}

/**
 *
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const createSpent = async (req, res) => {

    const { name, quantity, user, category, create_at } = req.body;

    try {
        const usuario = await Usuario.findOne({ uid: user });

        const spentDB = new Spent(req.body);

        if (!usuario) {
            return res.status(404).json({
                ok: false,
                msg: 'User not found'
            });
        }

        spentDB.save();

        return res.status(200).json({
            name,
            quantity,
            user,
            category,
            create_at
        });

    } catch (e) {
        console.log(e);
        return res.status(500).json({
            ok: false,
            msg: 'error not found'
        });

    }

}

/**
 *
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const createEntrance = async (req, res) => {

    const { name, quantity, user, category, create_at } = req.body;

    try {
        const usuario = await Usuario.findOne({ uid: user });

        const entranceDB = new Entrance(req.body);

        if (!usuario) {
            return res.status(404).json({
                ok: false,
                msg: 'User not found'
            });
        }

        entranceDB.save();

        return res.status(200).json({
            name,
            quantity,
            user,
            category,
            create_at
        });

    } catch (e) {
        console.log(e);
        return res.status(500).json({
            ok: false,
            msg: 'error not found'
        });

    }

}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const updateSpent = async (req, res) => {

    try {
        console.log(req.body);

        if (req.body.date_paid == undefined) {
            req.body.date_paid = null;
            console.log('no hay fecha ');
        }

        const spentUpdate = await Spent.findByIdAndUpdate(req.body._id, req.body);
        return res.json({ data: spentUpdate, status: "success" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'error not found'
        });
    }

}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const updateEntrance = async (req, res) => {
    try {
        if (req.body.date_paid == undefined) {
            req.body.date_paid = null;
            console.log('no hay fecha ');
        }
       
        const entranceUpdate = await Entrance.findByIdAndUpdate(req.body._id, req.body);
        return res.json({ data: entranceUpdate, status: "success" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'error not found'
        });
    }

}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const deleteSpent = async (req, res) => {
    console.log(req.params.id);

    try {
        const spentDelete = await Spent.findByIdAndDelete(req.params.id);
        res.json({ data: spentDelete, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }

}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const deleteEntrance = async (req, res) => {

    console.log(req.params.id);

    try {
        const entranceDelete = await Entrance.findByIdAndDelete(req.params.id);
        res.json({ data: entranceDelete, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }

}


module.exports = {
    getSpentsById,
    getEntrancesById,
    createEntrance,
    createSpent,
    updateSpent,
    updateEntrance,
    deleteEntrance,
    deleteSpent,
    getEntrancesByUser,
    getSpentsByUser,
    getSpentsAndEntrances
}
