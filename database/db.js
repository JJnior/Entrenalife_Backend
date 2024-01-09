const { response } = require("express");
const {MongoClient} = require("mongodb");
const client = new MongoClient("mongodb+srv://julio:cabello@cluster0.6umiiuw.mongodb.net/?retryWrites=true&w=majority");

client.connect().then(
    (response) => {
        console.log('la conexion a la bd es correcta -url:'+ response.url);
    },
    (error) => {
        console.log('error:' +error);
    }
)

//exportar
module.exports = client;