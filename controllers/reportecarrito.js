'use strict'
const res = require('express/lib/response');
var client = require('../database/db');
const { save } = require('./monitor');
var db = client.db('carritodb');


var controller = {

carritoReport: function(req,res){
    console.log("--------------------------");
    console.log("entrando en la funcion productos report");
    db.collection("carrito").aggregate([
        {$group:{_id:"$categoria", count:{$sum:1}}}
    ]).toArray(
        (error,dataCarrito)=>{
            if(error || !dataCarrito){
                return res.status(404).send({
                    message: "No se encontraron productos"
                });
            }else{
                return res.status(200).send({
                    status:"success",
                    carritoReport: dataCarrito
                });
            }
        }
     );
  } 
}

module.exports = controller;
