// run.js - configure and start the application.
var router = require('./router/router');
var appPort = require('./config/app.json').appPort;
var appHost = require('./config/app.json').appHost;

// create our app with express.
var express = require('express');
var bodyParser = require('body-parser')
var app = express();

// configure all environments.
app.use(router);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// static files.
app.use(express.static(__dirname + '/public'));

app.get('*', function(req, res){
    res.sendfile('public/index.html');
});

app.set('host', appHost || "localhost");
app.set('port', appPort || 8000);

// listening application.
app.listen(app.get('port'), function() {
    console.log('[*] - App started in %s:%s', app.get('host'), app.get('port'));
});
