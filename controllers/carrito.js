'use strict'
const res = require('express/lib/response');
var client = require('../database/db');
const { save } = require('./monitor');
var db = client.db('carritodb')

var controller = {
//LISTAR
  list:  function(req,res){
      console.log('-----------------');
      console.log('entrando a la funcion listar');
      db.collection('carrito').find().toArray(
(error,datacarrito)=> {
    if(error||!datacarrito){
        return res.status(404).send({
            message: "No se encontraron los productos"
        });
    } else{
        return res.status(200).send({
            status:'success',
            carrito: datacarrito
        });

        
    }
}


      );

  },
  //BUSCAR
  find: function(req,res){
console.log("-------------------");
console.log("ENTRANDO A LA FUNCION FIND");
console.log("id:"+ req.params.id);
db.collection('carrito').find({productoId:parseInt( req.params.id)}).toArray(
    (error, datacarrito) =>{
        if(error|| !datacarrito){
            return res.status(404).send({
                message:"No se  encontro el producto"
            });

        }else{
            return res.status(200).send({
                status:'success',
                carrito: datacarrito[0]
            });
    
            
        }
       
    }
);

  },


  //GUARDAR
  save: function(req,res){
      console.log("--------------");
      console.log("ENTRANDO A LA FUNCION SAVE");
      console.log(req.body );
      if(req.body.productoId= "0"){
          console.log("ENTRANDO A NUEVO");
          db.collection('carrito').count().then(
              countcarrito => {
                  var carrito = {}
                   carrito.productoId =countcarrito + 1;
                   carrito.descripcion = req.body.descripcion;
                   carrito.precio = req.body.precio;
                   db.collection('carrito').insertOne(carrito,
                    (error,result)=>{
                        if(error){
                            return res.status(404).send({
                                message :" No se pudo registrar el prducto"
                            });

                        }else{
                            return res.status(200).send({
                                message:"success",
                                carrito:result
                            });
                        }
                    });
              }
          );
      }
      else{
        console.log("ENTRANDO A EDITAR");
        var carrito = {}
                   carrito.productoId =parseInt(req.body.productoId);
                   carrito.descripcion = req.body.descripcion;
                   carrito.precio = req.body.precio;
                   console.log(carrito);
                   db.collection('carrito').updateOne({productoId:{$eq:parseInt(req.body.productoId)}},
                   {$set:carrito},
                   (error,result)=>{
                    if(error){
                        return res.status(404).send({
                            message :" No se pudo editar el prducto"
                        });

                    }else{
                        return res.status(200).send({
                            message:"success",
                            carrito:result
                        });
                    }
                }

                   
                   )

      }
  }
    
    
  }
// EXPORTAR MODULO
module.exports = controller;