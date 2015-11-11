/******* INITIALIZE *******/
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var swig = require('swig');
var fs = require('fs');
var config = require('./app/config/main');

var router = express.Router();
var app = express();


app.engine('html', swig.renderFile);

app.set('views', './app/views');
app.set('view engine', 'html');
app.set('view cache', false);

swig.setDefaults({cache: false});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'app/public')));
app.use(require('./app/routes/index')(router));

mongoose.connect(config.db);

app.set('port', 3000);
app.listen(app.get('port'), function () {
    console.log('Oc Image Manager running on port %d in %s mode', app.get('port'), 'dev');
});

module.exports = app;