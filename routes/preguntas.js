'use strict'

var express = require('express');
const { model } = require('mongoose');

var PreguntasController = require('../controllers/preguntas');

var router = express.Router();

//RUTA PARA PREGUNTAS
router.get('/preguntas', PreguntasController.list);

//BUSCAR
router.get('/preguntas/:id', PreguntasController.find);

//GUARDAR
router.post('/preguntas/save', PreguntasController.save);

//EXPORTAR MODULO
module.exports = router;