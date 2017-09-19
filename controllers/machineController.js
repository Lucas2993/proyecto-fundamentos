var mongoose = require('mongoose');
var connection = require('../database/connection');

var Machine = require('../models/machine');

/**
 * Busca todos los automatas registrados.
 */
exports.findAll = function(callback) {
	Machine.find({}, function(error, all) {
		if (error)
			return callback(error);

		return callback(false, all);
	});
};

/**
 * Busca un automata por ID.
 */
exports.findById = function(id, callback) {
	Machine.findById(id, function(error, found) {
		if (error)
			return callback(error);

		return callback(false, found);
	});
};

/**
 * Persiste un nuevo automata en la base de datos.
 */
exports.save = function(params, callback) {
	var machine = new Machine(params);

	machine.save(function(error) {
		if (error)
			return callback(error);

		return callback(false, 'Guardado con exito');
	});
};
