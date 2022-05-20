'use strict'

var client = require('../database/db');
var db = client.db('procesadorsbd');

var controller = {
    //listar
    list: function(req, res){
        console.log('-----------------');
        console.log('entrando a la funcion listar');
        db.collection('procesadors').find().toArray(
            (error, dataprocesador) => {
                if(error || !dataprocesador) {
                    return res.status(404).send({
                        message: 'no se encontraron los procesadores'
                    });
                }
                else {
                    return res.status(200).send({
                        status: 'success',
                        procesadors: dataprocesador
                    });
                }
            }
        );
    },
    //buscar
    find: function(req, res){
        console.log("----------------");
        console.log('entrnado a la funcion find');
        console.log('id'+ req.params.id);
        db.collection('procesadors').find({cantidad:parseInt(req.params.id)}).toArray(
            (error, dataprocesadors) => {
                if(error || !dataprocesadors) {
                    return res.status(404).send({
                        message: 'no se encontro el prosedador'
                    });
                }
                else {
                    return res.status(200).send({
                        status: 'success',
                        procesadors: dataprocesadors[0]
                    });
                }
            }
        );
    },
    //guardar
    save: function(req, res){
        console.log("----------------");
        console.log('entrnado a la funcion save');
        console.log(req.body);
        if(req.body.idd == "0"){
            console.log("entrando a nuevo");
            db.collection("procesadors").count().then(
                countProcesadors => {
                    var procesador = {}
                    procesador.idd = countProcesadors +1;
                    procesador.descripcion = req.body.descripcion;
                    procesador.precio = req.body.precio;
                    db.collection('procesadors').insertOne(procesador,
                        (error, result)=>{
                            if(error){
                                return res.status(404).send({
                                    message: "no se pudo"
                                })
                            }else{
                                return res.status(200).send({
                                    message:"success",
                                    procesador:result
                                });
                            }
                        }
                    );
                }
            );
        }else{
            console.log("entrando a editar");
            var procesador = {}
            procesador.idd = parseInt(req.body.idd);
            procesador.descripcion = req.body.descripcion;
            procesador.precio = req.body.precio;
            console.log(procesador);
            db.collection("procesadors").updateOne({
                idd: { $eq: parseInt(req.body.idd)}},
                {$set: procesador},
                (error, result)=>{
                    if(error){
                        return res.status(404).send({
                             message: "no se pudo editar"
                        });
                    }else{
                        return res.status(200).send({
                            message:"success",
                            producto:result
                        });
                    }
                }
            )

        }
    }
}

//exportar module
module.exports = controller;