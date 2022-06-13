'use strict'

var client = require('../database/db');
var db = client.db('monitorsbd');

var controller = {
    productosReport: function (req, res) {
        console.log("-----------------");
        console.log("entrando a la funcion")
        //contabiliza los productos por categoria
        db.collection("monitors").aggregate(
            [
                { $group: { _id: "$categoria", count: { $sum: 1 } } }
            ]
        ).toArray(
            (error, dataProductos) => {
                if (error || !dataProductos) {
                    return res.status(404).send({
                        message: "no se encontraron productos"
                    });
                } else {
                    return res.status(200).send({
                        status: "success",
                        productosReport: dataProductos
                    })
                }
            }
        );
    }
}

//exportar module
module.exports = controller;