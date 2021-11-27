const {Router} = require('express');
const { check } = require('express-validator');
const { getEvents, registerEvent, updateEvent, deleteEvent } = require('../controllers/events');
const { validarJWT } = require('../middlewares/validar-jwt');
const { fieldsValidator } = require('../middlewares/fields-validator');
const { isDate } = require('../helpers/isDate');
// Events route /api/events

const router = Router();

router.use(validarJWT);

// Todas las rutas de eventos deben ser validadas con el middleware de validaciones
// Obtener todos los eventos
router.get('/',  getEvents) // getEvents es una funcion que se encuentra en el archivo events.js

// Crear un nuevo evento
router.post(
  '/', 
  [
    check('title', 'El título es obligatorio').not().isEmpty(),
    check('start', 'La fecha de inicio es obligatoria').custom( isDate ),
    check('end', 'La fecha de finalización es obligatoria').custom( isDate ),
    fieldsValidator
  ], 
  registerEvent)

// Actualizar un evento
router.put('/:id', updateEvent)

// Eliminar un evento
router.delete('/:id', deleteEvent)

module.exports = router;