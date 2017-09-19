/**
 * Modulo de conexion a mongo db.
 */
var mongoose = require('mongoose');
var url = require('../config/database').url;


// realiza la conexion...
var connection = mongoose.connect(url, {
    useMongoClient: true
});

mongoose.connection.on('connected', function () {  
    console.log('Mongoose conectado en: ', url);
}); 
  
mongoose.connection.on('error',function (err) {
    console.log('Mongoose error de conexion: ' + err);
}); 

module.exports = connection;
