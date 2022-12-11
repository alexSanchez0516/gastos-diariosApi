const { Router } = require('express');
const {
        register,
        login,
        renewToken,
        getUser,
        getUsers,
        updateUser
      } = require("../controllers/auth");
const {check} = require("express-validator");
const {validaCampos} = require("../Middlewares/validar-campos");
const { validaToken } = require('../Middlewares/renew-token');

const router = Router();


router.post('/new', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña debe tener mínimo  carácteres').isLength({min:6}),
    check('username', 'El nombre de usuario no puede ir vacío').not().isEmpty(),
    validaCampos
] ,register);

router.post('/update', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña debe tener mínimo  carácteres').isLength({min:6}),
    check('username', 'El nombre de usuario no puede ir vacío').not().isEmpty(),
    validaCampos
] ,updateUser);


// Login usuario
router.post('/', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').isLength({min:6}),
    validaCampos
] ,login);



// Validar Token
router.get('/renew', validaToken,renewToken);


// Ver usuario
router.get('/user/:id',getUser)


// Ver usuarios
router.get('/users',getUsers)

module.exports = router;
