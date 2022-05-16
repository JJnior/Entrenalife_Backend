'use strict'

var client = require('../database/db');
var db = client.db('productosbd');

var controller = {
    //listar
    list: function(req, res){
        console.log('-----------------');
        console.log('entrando a la funcion listar');
        db.collection('productos').find().toArray(
            (error, dataproductos) => {
                if(error || !dataproductos) {
                    return res.status(404).send({
                        message: 'no se encontraron los productos'
                    });
                }
                else {
                    return res.status(200).send({
                        status: 'success',
                        productos: dataproductos
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
        db.collection('productos').find({cantidad:parseInt(req.params.id)}).toArray(
            (error, dataproductos) => {
                if(error || !dataproductos) {
                    return res.status(404).send({
                        message: 'no se encontro el producto'
                    });
                }
                else {
                    return res.status(200).send({
                        status: 'success',
                        productos: dataproductos[0]
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
        if(req.body.cantidad == "0"){
            console.log("entrando a nuevo");
            db.collection("productos").count().then(
                countProductos => {
                    var producto = {}
                    producto.cantidad = countProductos +1;
                    producto.producto = req.body.producto;
                    producto.precio = req.body.precio;
                    db.collection('productos').insertOne(producto,
                        (error, result)=>{
                            if(error){
                                return res.status(404).send({
                                    message: "no se pudo"
                                })
                            }else{
                                return res.status(200).send({
                                    message:"success",
                                    producto:result
                                });
                            }
                        }
                    );
                }
            );
        }else{
            console.log("entrando a editar");
            var producto = {}
            producto.cantidad = parseInt(req.body.cantidad);
            producto.producto = req.body.producto;
            producto.precio = req.body.precio;
            console.log(producto);
            db.collection("productos").updateOne({
                cantidad: { $eq: parseInt(req.body.cantidad)}},
                {$set: producto},
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