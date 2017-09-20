// run.js - configure and start the application.
var appPort = require('./config/app.json').appPort;
var appHost = require('./config/app.json').appHost;

var index = require('./router/index');
var router = require('./router/router');

// create our app with express.
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

// configure all environments.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get(index);
app.use(router);

// static files.
app.use(express.static(path.join(__dirname, 'public')));

// set host and port
app.set('host', appHost || "localhost");
app.set('port', appPort || 8000);

// listening application.
app.listen(app.get('port'), function() {
    console.log('[*] - App started in %s:%s', app.get('host'), app.get('port'));
});
