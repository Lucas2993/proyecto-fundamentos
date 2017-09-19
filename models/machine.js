/**
 * Esquema de una maquina en mongodb, sirve como modelo para que mongo
 * pueda mapearlo a la base de datos.
 */
var mongoose = require('mongoose');

var schema = mongoose.Schema({ 
    name: String,
    description: String,
    graph: String 
});

var Machine = mongoose.model('machine', schema);

module.exports = Machine;
