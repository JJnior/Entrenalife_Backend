'use strict'

var express = require('express');
const {model} = require('mongoose');

var ReporteController = require("../controllers/reporteprocesador");

var router = express.Router();

//rutas para reportes de productos

router.get('/reporteprocesador/productosReport',ReporteController.productosReport);

module.exports = router