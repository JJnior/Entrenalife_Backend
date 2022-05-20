'use strict'

var express = require('express');
const {model} = require('mongoose');


var procesadorscontroller = require('../controllers/procesador');

var router = express.Router();

router.get('/procesadors', procesadorscontroller.list);
router.get('/procesadors/:id', procesadorscontroller.find);
router.post('/procesadors/save', procesadorscontroller.save);
//falta buscar
//falta guardar

//exportar ruta
module.exports = router