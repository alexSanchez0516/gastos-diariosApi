const {response} = require("express");
const jwt = require('jsonwebtoken');


/**
 * 
 */
validaToken = (req, res = response, next) => {

    const token = req.header('x-token');
    if ( !token ) {
        return res.status('401').json({
            ok: false,
            msg: 'Error en el token'
        });
    }

    try {

        const {uid, name } = jwt.verify( token, process.env.SECRET_JWT_SEED );

        req.uid = uid;
        req.username = name;

    } catch (error) {
        console.log('error: ' , error);
        return res.status(401).json({
            ok: false,
            msg: 'Token inválido'
        })
    }

    next();
}

module.exports = {
    validaToken
}
