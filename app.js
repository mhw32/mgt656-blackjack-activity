// Define some libraries.
var express = require('express');
var http    = require('http');
var path    = require('path');
// Add some custom libraries.
var routes = require('./routes');
// Define an application.
var app     = express();
var port    = 3000;

// Given express, set some environments.
app.set('port', process.env.PORT || port);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
// This may need to be turned off for production.
app.use(express.errorHandler());

// Set a default route.
app.get('/', routes.dashboard);

// Initialize the HTTP on top of the port.
http.createServer(app).listen(app.get('port'), function(){
  console.log('---------------------------------------------------');
  console.log('Express server listening on port ' + app.get('port'));
  console.log('---------------------------------------------------');
});