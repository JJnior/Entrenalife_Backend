'use strict'

var express = require('express');
const {model} = require('mongoose');

var carritoReportController = require('../controllers/reportecarrito');

var router = express.Router();


router.get('/reportecarrito/carritoReport',carritoReportController.carritoReport);

module.exports = router;