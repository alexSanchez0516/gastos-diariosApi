const { response } = require('express');
const Usuario = require('../models/Usuario');
const brcrypt = require('bcryptjs');
const {generarJWT} = require("../helpers/jwt");


/**
 *
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const register = async (req, res) => {

    const {email, username, password} = req.body;

    try {

        // Email unique
        const usuario = await Usuario.findOne({ email });

        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe ese email'
            })
        }

        // Crear user con el modelo
        const dbUser = new Usuario(req.body);

        // Hash password
        const salt = brcrypt.genSaltSync(10);
        dbUser.password = brcrypt.hashSync(password,salt);

        // Generar JWT
        const token = await generarJWT(dbUser.id, dbUser.username)

        // Crear user en DB
        await dbUser.save();


        // Generar Response
        return res.status(201).json({
            ok: true,
            uid: dbUser._id.valueOf(),
            username,
            token
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Algo salio mal'
        });
    }


}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
 const updateUser = async (req, res) =>  {
    const user = await Usuario.findByIdAndUpdate(req.body._id, req.body);
    return res.json({ data: user, status: "success" });
}

/**
 *
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const login = async (req, res) => {

    const {email, password} = req.body;

    const Dbusuario = await Usuario.findOne({email});

    try {

        if (!Dbusuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Credenciales incorrectas'
            })
        }

        const validaPassword = brcrypt.compareSync(password,Dbusuario.password);

        if (!validaPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Credenciales incorrectas'
            })
        }

        const token = await generarJWT(Dbusuario.id, Dbusuario.username)

        return res.json({
            ok: true,
            uid: Dbusuario._id.valueOf(),
            username: Dbusuario.username,
            token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Algo salio mal'
        });
    }

}

/**
 *
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const renewToken = async (req, res) => {

    const {uid, username} = req;


    const token = await generarJWT(uid, username);
    return res.json({
        ok: true,
        uid,
        username,
        token
    });
}


/**
 *
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const getUser = async (req, res) => {
    return res.json({
        ok: true,
        msg: 'Get user'
    })
}


/**
 *
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const getUsers = async (req, res) => {

    for await ( const user of Usuario.find()) {
        console.log(user);
    }

    return res.json({
        ok: true,
        msg: 'Get users'
    })
}


module.exports = {
    register,
    login,
    renewToken,
    getUser,
    getUsers,
    updateUser
}


