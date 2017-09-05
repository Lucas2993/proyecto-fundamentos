// router.js - en este modulo se declaran las rutas rest manejadas.
var draft = require('../json/draft.json');
var express = require('express');
var router = express.Router();

/**
 * Informacion del estado del servidor, util como ruta de testeo.
 */
router.get('/info', function(req, res) {
    var info = {version: "1.0", fecha: "septiembre 2017"};
    res.send(info);
});

/**
 * Retorna un grafo de prueba en formato Json.
 */
router.get('/api/json/draft', function(req, res) {
    res.send(draft);
});

module.exports = router;
