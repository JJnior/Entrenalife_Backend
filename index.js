'use strict'

//requerimientos
var mongoose = require('mongoose');
var app = require('./app')

//puerto de servidor
var port = process.env.port || 3999;


//pruebas de conexion
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://procerr:procerr709@cluster0.1nq16.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
                {useNewUrlParser: true}
)
.then(
    ()=>{
        console.log('la conexion fue correcta');
        //crear un servidor
        app.listen(port, ()=>{
            console.log('el servidor http://localhost:3999 esta funcionando.');
        })
    }
)
.catch(error => console.log(error));