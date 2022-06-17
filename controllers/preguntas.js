'use strict'

var client = require("../database/db");
var db = client.db("preguntasbd");

var controller = {
    //LISTAR
    list: function(req, res){
        console.log("===================");
        console.log("ENTRANDO A LA FUNCION LISTAR");
        db.collection("preguntas").find().toArray(
            (error, dataPreguntas) => {
                if (error || !dataPreguntas) {
                    return res.status(404).send({
                        message: "No se encontraron las respuestas"
                    });
                } else {
                    return res.status(200).send({
                        status: "success",
                        preguntas: dataPreguntas
                    });
                }
            }
        );
    },

    //BUSCAR
    find: function(req, res) {
        console.log("===================");
        console.log("ENTRANDO A LA FUNCION FIND");
        console.log("id:" + req.params.id);
        db.collection("preguntas").find({preguntaId: parseInt(req.params.id)}).toArray(
            (error, dataPreguntas) => {
                if (error || !dataPreguntas) {
                    return res.status(404).send({
                        message: "No se encontraron la respuesta"
                    });
                } else {
                    return res.status(200).send({
                        status: "success",
                        pregunta: dataPreguntas[0]
                    });
                }
            }
        );
    },

    //GUARDAR
    save: function(req, res) {
        console.log("====================");
        console.log("ENTRANDO A LA FUNCION SAVE");
        console.log(req.body);
        if (req.body.preguntaId == "0"){ //SI ES NUEVO
            console.log("ENTRANDO A NUEVO");
            db.collection("preguntas").count().then(
                countPreguntas => {
                    var preguntas = {}
                    preguntas.preguntaId = countPreguntas + 1;
                    preguntas.eleccion = req.body.eleccion;
                    db.collection('preguntas').insertOne(preguntas,
                        (error, result) => {
                            if (error) {
                                return res.status(404).send({
                                    message: "No se pudo registrar la respuesta"
                                });
                            } else {
                                return res.status(200).send({
                                    message: "success",
                                    preguntas: result
                                });
                            }
                        }
                    );
                }
            )
        }
    }
}

//EXPORTAR MODULE
module.exports = controller;