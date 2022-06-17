'use strict'

const { reset } = require('nodemon');
var client = require("../database/db");
var db = client.db("preguntasbd");

var controller = {

    preguntasReport: function(req, res){
        console.log("=============================");
        console.log("ENTRANDO A LA FUNCION PREGUNTAS REPORT");
        //CONTABILIZAR LAS RESPUESTAS
        db.collection("preguntas").aggregate([
            {$group:{_id: "$eleccion", count:{$sum:1}}}
        ]).toArray(
            (error, dataPreguntas) => {
                if (error || !dataPreguntas){
                    return res.status(404).send({
                        message: "No se encontraron respuestas."
                    })
                } else {
                    return res.status(200).send({
                        message: "success",
                        preguntasReport: dataPreguntas
                    });
                }
            }
        );
    }
}

//EXPORTAR MODULO
module.exports = controller;