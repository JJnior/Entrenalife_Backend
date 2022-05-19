'use strict'

const { status } = require('express/lib/response');
var client = require('../database/db');
var db = client.db('usuariosBD');

var controller = {
    //listar
    list: function(req, res){
        console.log('-----------------');
        console.log('entrando a la funcion listar');
        db.collection('usuarios').find().toArray(
            (error, datausuarios) => {
                if(error || !datausuarios) {
                    return res.status(404).send({
                        message: 'no se encontraron los datos de los usuarios'
                    });
                }
                else {
                    return res.status(200).send({
                        status: 'success',
                        usuarios: datausuarios
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
        db.collection('usuarios').find({usuarioid:parseInt(req.params.id)}).toArray(
            (error, datausuarios) => {
                if(error || !datausuarios) {
                    return res.status(404).send({
                        message: 'no se encontro el usuario'
                    });
                }
                else {
                    return res.status(200).send({
                        status: 'success',
                        usuarios: datausuarios[0]
                    });
                }
            }
        );
    },
    //guardar
    save: function(req, res){
        console.log("----------------");
        console.log('entrando a la funcion save');
        console.log(req.body);
        if(req.body.usuarioid !=0){
            console.log("entrando a nuevo");
            db.collection("usuarios").count().then(
                countUsuarios => {
                    var usuario = {}
                    usuario.usuarioid = countUsuarios +1;
                    usuario.nombre = req.body.nombre;
                    usuario.apellidos = req.body.apellidos;
                    usuario.edad = req.body.edad;
                    usuario.correo = req.body.correo;
                    usuario.contraseña = req.body.contraseña
                    db.collection('usuarios').insertOne(usuario,
                        (error, result)=>{
                            if(error){
                                return res.status(404).send({
                                    message: "no se pudo"
                                })
                            }else{
                                return res.status(200).send({
                                    message:"success",
                                    usuario:result
                                });
                            }
                        }
                    );
                }
            );
        }else{
            console.log("entrando a editar");
            var usuario = {}
            usuario.usuario = parseInt(req.body.usuarioid);
            usuario.nombre = req.body.nombre;
            usuario.apellidos = req.body.apellidos;
            usuario.edad = req.body.edad;
            usuario.correo = req.body.correo;
            usuario.contraseña = req.body.contraseña
            console.log(usuario);
            db.collection("usuarios").updateOne({
                usuario: { $eq: parseInt(req.body.usuarioid)}},
                {$set: usuario},
                (error, result)=>{
                    if(error){
                        return res.status(404).send({
                             message: "no se pudo editar"
                        });
                    }else{
                        return res.status(200).send({
                            message:"success",
                            usuario:result
                        });
                    }
                }
            )

        }
    }
}

//exportar module
module.exports = controller;