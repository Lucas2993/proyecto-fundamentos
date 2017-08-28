// router.js - en este modulo se declaran las rutas manejadas.
var express = require('express');
var router = express.Router();

// Ruta principal de la aplicacion.
router.get('/hola', function(req, res) {
    res.send('aplicacion inicializada');
});

module.exports = router;
