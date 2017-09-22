/**
 * Modulo de conexion a mongo db.
 */
var mongoose = require('mongoose');
var url = require('../config/database').url;
var logger = require('../commons/logger');

// realiza la conexion...
var connection = mongoose.connect(url, {
    useMongoClient: true
});

mongoose.connection.on('connected', function () {  
    logger.info('Mongoose conectado en:', url);
}); 
  
mongoose.connection.on('error',function (err) {
    logger.error('Mongoose error de conexion:', err);
}); 

module.exports = connection;
