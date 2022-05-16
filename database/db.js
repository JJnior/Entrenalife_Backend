const { response } = require("express");
const {MongoClient} = require("mongodb");
const client = new MongoClient("mongodb+srv://procerr:procerr709@cluster0.1nq16.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");

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