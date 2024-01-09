'use strict'

var express = require('express');
const {model} = require('mongoose');


var usuarioscontroller = require('../controllers/usuario');

var router = express.Router();

router.get('/usuarios', usuarioscontroller.list);
router.get('/usuarios/:id', usuarioscontroller.find);
router.post('/usuarios/save', usuarioscontroller.save);
//falta buscar
//falta guardar

//exportar ruta
module.exports = router