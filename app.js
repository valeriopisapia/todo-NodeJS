var express = require('express');
var app = express();
var mongoose = require('mongoose');
var config = require('./config');
var setupController = require('./controllers/setupController');
var apiController = require('./controllers/apiController');

var port = process.env.PORT || 3000;

mongoose.connect(config.getDbConnectionString());
setupController(app);
apiController(app);

console.log('App ready');

app.listen(port);