const {Router} = require("express");
const {
    getSpentsById, getEntrancesById,
    createSpent, createEntrance,
    deleteSpent,
    deleteEntrance,
    updateSpent,
    updateEntrance,
    getSpentsByUser,
    getEntrancesByUser,
    getSpentsAndEntrances
    } = require("../controllers/GastosAppController");
const {check} = require("express-validator");
const {validaCampos} = require("../Middlewares/validar-campos");

const router = Router();


////////////////////////////////////////////////////////////////////////////////////////////////
//// READ
////////////////////////////////////////////////////////////////////////////////////////////////

router.get('/all-amounts/:id',[] ,getSpentsAndEntrances);



router.get('/spents/:id',[] ,getSpentsById);
router.get('/entrances/:id', [],getEntrancesById);

router.get('/spents/user/:id',[] ,getSpentsByUser);
router.get('/entrances/user/:id', [],getEntrancesByUser);


////////////////////////////////////////////////////////////////////////////////////////////////
//// CREATE
////////////////////////////////////////////////////////////////////////////////////////////////

router.post('/create-spent', [
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('user','El usuario es obligatorio').not().isEmpty(),
    check('quantity','El importe es obligatorio').not().isEmpty(),
    check('category','La categoría es obligatoria').not().isEmpty(),
    validaCampos
] ,createSpent);
router.post('/create-entrance', [
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('user','El usuario es obligatorio').not().isEmpty(),
    check('quantity','El importe es obligatorio').not().isEmpty(),
    check('category','La categoría es obligatoria').not().isEmpty(),
    validaCampos
] ,createEntrance);



////////////////////////////////////////////////////////////////////////////////////////////////
//// UPDATE
////////////////////////////////////////////////////////////////////////////////////////////////

router.post('/update-spent', [
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('user','El usuario es obligatorio').not().isEmpty(),
    check('quantity','El importe es obligatorio').not().isEmpty(),
    check('category','La categoría es obligatoria').not().isEmpty(),
    validaCampos
] ,updateSpent);


router.post('/update-entrance', [
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('user','El usuario es obligatorio').not().isEmpty(),
    check('quantity','El importe es obligatorio').not().isEmpty(),
    check('category','La categoría es obligatoria').not().isEmpty(),
    validaCampos
] ,updateEntrance);


////////////////////////////////////////////////////////////////////////////////////////////////
//// DELETE
////////////////////////////////////////////////////////////////////////////////////////////////
router.delete('/delete-spent/:id', deleteSpent);
router.delete('/delete-entrance/:id', deleteEntrance);

module.exports = router;
