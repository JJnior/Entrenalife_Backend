'use strict'

var client = require('../database/db');
var db = client.db('usuariosBD');

var controller = {
    usuariosReport: function (req, res) {
        console.log("-----------------");
        console.log("entrando a la funcion")
        //contabiliza los usuarios por categoria
        db.collection("usuarios").aggregate(
            [
                { $group: { _id: "$sexo", count: { $sum: 1 } } }
            ]
        ).toArray(
            (error, dataUsuarios) => {
                if (error || !dataUsuarios) {
                    return res.status(404).send({
                        message: "no se encontraron usuarios"
                    });
                } else {
                    return res.status(200).send({
                        status: "success",
                        usuariosReport: dataUsuarios
                    })
                }
            }
        );
    }
}

//exportar module
module.exports = controller;