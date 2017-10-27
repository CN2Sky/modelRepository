'use strict';

var express  = require('express');
var app      = express();
var mongoose = require('mongoose');
var morgan   = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var config = require('./config/database');
var rp = require('request-promise');
var port = process.env.PORT || 9092;
var request = require('request');

var Model  = require('./models/Model');
var Description  = require('./models/Descriptions');

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());

app.use(function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

//mongoose.connect(process.env.MONGO_HOST);
mongoose.connect(config['database']);

app.set('superSecret', config.secret);
mongoose.connection.on('open', function (ref) {
    console.log('Connected to Mongo server...');
});

app.set('superSecret', config.secret);

app.listen(port);
console.log("Model Management Service is listening on: " + port);


app.post('/model/create', function(req, res) {

    var model = new Model({
        name : req.body.name,
        description : req.body.description,
        createdOn: new Date(),
        createdBy: req.body.createdBy,
        trainedOn: req.body.trainedOn,
        accuracy: req.body.accuracy,
        domain: req.body.domain,
        model: req.body.model,
        inputType:req.body.inputType,
        inputDimensions: req.body.inputDimensions,
        modelParameters:req.body.modelParameters
    });

    model.save(function(err) {
        if (err) {
            res.json({ success: false });
        }
        else{
            res.json({ success: true });
        }

    });
});

app.post('/description/create', function(req, res) {

    var description = new Description({
        createdBy: req.body.user,
        createdOn: new Date(),
        name : req.body.name,
        docker : req.body.docker,
        domain: req.body.domain,
        yaml: req.body.yaml,
        inputType:req.body.inputType,
        inputDimensions: req.body.inputDimensions,
        modelParameters:req.body.modelParameters,
        isRunning: false
    });

    description.save(function(err) {
        if (err) {
            res.json({ success: false });
        }
        else{
            res.json({ success: true });
        }

    });
});

app.get('/models', function(req, res) {
    Model.find({}, function(err, models) {
        res.json(models);
    });
});

app.get('/descriptions', function(req, res) {
    Description.find({}, function(err, models) {
        res.json(models);
    });
});


app.get('/docker/hub/:user', function(req,res){
    request({
        uri: "https://hub.docker.com/v2/repositories/" + req.params.user,
        method: "GET",
        timeout: 10000,
        followRedirect: true,
        maxRedirects: 10
    }, function(error, response, body) {
        res.json(JSON.parse(body));
    });
});