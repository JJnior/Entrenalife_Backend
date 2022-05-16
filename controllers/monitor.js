'use strict'

var client = require('../database/db');
var db = client.db('monitorsbd');

var controller = {
    //listar
    list: function(req, res){
        console.log('-----------------');
        console.log('entrando a la funcion listar');
        db.collection('monitors').find().toArray(
            (error, datamonitor) => {
                if(error || !datamonitor) {
                    return res.status(404).send({
                        message: 'no se encontraron los monitores'
                    });
                }
                else {
                    return res.status(200).send({
                        status: 'success',
                        monitors: datamonitor
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
        db.collection('monitors').find({cantidad:parseInt(req.params.id)}).toArray(
            (error, datamonitors) => {
                if(error || !datamonitors) {
                    return res.status(404).send({
                        message: 'no se encontro el monitor'
                    });
                }
                else {
                    return res.status(200).send({
                        status: 'success',
                        monitors: datamonitors[0]
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
            db.collection("monitors").count().then(
                countMonitors => {
                    var monitor = {}
                    monitor.idd = countMonitors +1;
                    monitor.descripcion = req.body.descripcion;
                    monitor.precio = req.body.precio;
                    db.collection('monitors').insertOne(monitor,
                        (error, result)=>{
                            if(error){
                                return res.status(404).send({
                                    message: "no se pudo"
                                })
                            }else{
                                return res.status(200).send({
                                    message:"success",
                                    monitor:result
                                });
                            }
                        }
                    );
                }
            );
        }else{
            console.log("entrando a editar");
            var monitor = {}
            monitor.idd = parseInt(req.body.idd);
            monitor.descripcion = req.body.descripcion;
            monitor.precio = req.body.precio;
            console.log(monitor);
            db.collection("monitors").updateOne({
                idd: { $eq: parseInt(req.body.idd)}},
                {$set: monitor},
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