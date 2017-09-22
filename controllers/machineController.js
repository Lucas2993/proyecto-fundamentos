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

		return callback(false, machine);
	});
};

/**
 * Actualiza un automata en la base de datos.
 */
exports.update = function(id, machine, callback) {
	Machine.findByIdAndUpdate(id, machine, { new: true }, function(error, model) {
		if (error)
			return callback(error);

		return callback(false, model);
	});
};

/**
 * Elimina un automata.
 */
exports.delete = function(id, callback) {
	Machine.remove({ _id: id }, function(error) {
		if (error)
			return callback(error);

		return callback(false, true);
	});
};