'use strict'

//requerimientos
var express = require('express')
var bodyParser = require('body-parser')

//usando la dependencia express
var app = express();

//cargar de archivos de rutas
var producto_routes = require('./routes/producto');
var monitor_routes = require('./routes/monitor');
var usuario_routes = require('./routes/usuario');
var carrito_routes = require('./routes/carrito');
var procesador_routes = require('./routes/procesador');
var reporte_routes = require('./routes/reportemonitor');
var reporte_routes2 = require('./routes/reporteprocesador');
var reporte_routes3 = require('./routes/reporteusuario');
var pregunta_routes = require('./routes/preguntas');
var reporte_routes4 = require('./routes/reportepreguntas');
var reportecarrito_routes = require('./routes/reportecarrito');

//middleware
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

//configuracio de cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With,Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// reescribir rutas
app.use('/api/', producto_routes);
app.use('/api/', monitor_routes);
app.use('/api/', usuario_routes);
app.use('/api/', carrito_routes);
app.use('/api/', procesador_routes);
app.use('/api/',reporte_routes);
app.use('/api/',reporte_routes2);
app.use('/api/',reporte_routes3);
app.use('/api/',pregunta_routes);
app.use('/api/',reporte_routes4);
app.use('/api/',reportecarrito_routes);

//export module
module.exports = app;
