'use strict'

var express = require('express');
const {model} = require('mongoose');


var monitorscontroller = require('../controllers/monitor');

var router = express.Router();

router.get('/monitors', monitorscontroller.list);
router.get('/monitors/:id', monitorscontroller.find);
router.post('/monitors/save', monitorscontroller.save);
//falta buscar
//falta guardar

//exportar ruta
module.exports = router