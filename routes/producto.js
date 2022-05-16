'use strict'

var express = require('express');
const {model} = require('mongoose');


var productoscontroller = require('../controllers/producto');

var router = express.Router();

router.get('/productos', productoscontroller.list);
router.get('/productos/:id', productoscontroller.find);
router.post('/productos/save', productoscontroller.save);
//falta buscar
//falta guardar

//exportar ruta
module.exports = router