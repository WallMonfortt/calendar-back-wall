// const express = require('express');
// const router = express.Router();

// Rutas de usuario /auth
// host + api/auth

const {Router} = require('express');
const {check} = require('express-validator');
const {createUser, userLogin, renewToken} = require('../controllers/auth.js');
const {fieldsValidator} = require('../middlewares/fields-validator.js');
const {validarJWT} = require('../middlewares/validar-jwt.js');

const router = Router();

router.post(
  '/new',
  [ // Validaciones
    check('name', 'El nombre es obligatorio').not().isEmpty(), // not() es para que no sea vacio
    check('email', 'El email es obligatorio').isEmail(),// isEmail() es para que sea un email
    check('password', 'La contraseña debe tener minimo 6 caracteres').isLength({min: 6}),// isLength() es para que tenga minimo 6 caracteres
    fieldsValidator
  ],
createUser);

router.post(
  '/',
  [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña debe tener minimo 6 caracteres').isLength({min: 6}),
    fieldsValidator
  ],
userLogin );

router.get('/renew', validarJWT, renewToken);

module.exports = router;