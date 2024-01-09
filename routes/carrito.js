'use strict'

var express = require('express');
const {model} = require('mongoose');

var carritocontroller = require('../controllers/carrito');
var router = express.Router();

// RUTAS
router.get('/carrito',carritocontroller.list);

router.get('/carrito/:id',carritocontroller.find);
router.post('/carrito/save',carritocontroller.save);


//EXPORTAR
module.exports = router;