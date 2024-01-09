'use strict'

var express = require('express');
const { model } = require('mongoose');

var ReporteController = require("../controllers/reportepreguntas");

var router = express.Router();

//RUTAS PARA REPORTE DE PREGUNTAS POR ELECCION
router.get('/reportes/preguntasReport', ReporteController.preguntasReport);

//EXPORTAR RUTA
module.exports = router;