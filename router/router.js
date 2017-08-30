// router.js - en este modulo se declaran las rutas manejadas.
var express = require('express');
var router = express.Router();

/**
 * Informacion del estado del servidor, solo es una ruta de testeo.
 */
router.get('/info', function(req, res) {
    res.send('aplicacion inicializada');
});

module.exports = router;
