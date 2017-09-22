/**
 * Modulo principal de la aplicacion.
 */
var appPort = require('./config/app.json').appPort;
var appHost = require('./config/app.json').appHost;

var index = require('./router/index');
var router = require('./router/router');
var logger = require('./commons/logger');

// creo la aplicacion con Express.
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

// configuro los entornos.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get(index);
app.use(router);

// archivos estaticos.
app.use(express.static(path.join(__dirname, 'public')));

// seteo el puerto y el host.
app.set('host', appHost || "localhost");
app.set('port', appPort || 8000);

// aplicacion en escucha...
app.listen(app.get('port'), function() {
    logger.info('[*] - Aplicación iniciada en %s:%s', app.get('host'), app.get('port'));
});
