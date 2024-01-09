'use strict'

var express = require('express');
const {model} = require('mongoose');

var ReporteController = require("../controllers/reporteusuario");

var router = express.Router();

//rutas para reportes de productos

router.get('/reporteusuario/usuariosReport',ReporteController.usuariosReport);

module.exports = router