const {validationResult} = require("express-validator");
const {response} = require("express");


/**
 *
 * @param req
 * @param resp
 * @param next
 * @returns {e.Response<any, Record<string, any>>}
 */
const validaCampos = (req, resp = response, next) => {
    const errors = validationResult( req );
    if (!errors.isEmpty()) {
        return resp.status(400).json({
            ok: false,
            errors: errors.mapped()
        })
    }

    next();
}

module.exports = {
    validaCampos
}
