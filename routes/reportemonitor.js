'use strict'

var express = require('express');
const {model} = require('mongoose');

var ReporteController = require("../controllers/reportemonitor");

var router = express.Router();

//rutas para reportes de productos

router.get('/reportemonitor/productosReport',ReporteController.productosReport);

module.exports = router

