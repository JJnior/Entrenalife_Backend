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

//export module
module.exports = app;
