'use strict';

var express = require('express');
var morgan = require('morgan');
var compression = require('compression');
var bodyParser = require('body-parser');
var port = process.env.PORT || 9000;
var app = express();

app.use(morgan('dev'));
app.use(compression());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ 'extended': 'true' }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

require('./backend/routes/coreRoute')(app);
require('./backend/routes/supportRoute')(app);

app.get('/*', function (req, res) {
    res.redirect('/');
});

app.listen(port);
console.log('Server started: ' + port);