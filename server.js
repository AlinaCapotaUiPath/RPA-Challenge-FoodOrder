'use strict';

var express = require('express');
var path = require('path');

var app = express();

var port = process.env.PORT || 3000;

// Serve the contents of /public as static files
app.use(express.static('public'));

// Return index.html for default route
app.get('/', function (request, response) {
    response.sendFile(path.join(__dirname, 'public', 'index.html')); 
});

app.get('/shortestpath', function (request, response) {
    response.sendFile(path.join(__dirname, 'public', 'shortestpath.html')); 
});

app.get('/order', function (request, response) {
    response.sendFile(path.join(__dirname, 'public', 'order.html')); 
});

app.get('/login', function (request, response) {
    response.sendFile(path.join(__dirname, 'public', 'login.html')); 
});

// Start the server
app.listen(port, function () {
    console.log('UiPath Automation Challenge server listening at port ' + port);
});
