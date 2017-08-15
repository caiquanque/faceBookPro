var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');


app.use(bodyParser.json({limit: '0.5mb'}));
app.use(bodyParser.urlencoded({limit: '0.5mb', extended: true}));
app.use(bodyParser.urlencoded({ extended: true }));


//var queryFacebook = require('./service.js');//require queryFacebook
var kqVonglap = require('./routes/index.js');
app.use(kqVonglap); //router queryFacebook

app.listen(4000); //port 3000
module.exports = app;
