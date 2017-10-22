// server.js

var express  = require('express');
var app      = express();
var mongoose = require('mongoose');
var morgan   = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var config = require('./config/database');
var port = process.env.PORT || 8085;

var Model  = require('./models/Model');
var Description  = require('./models/Descriptions');

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());

//mongoose.connect(process.env.MONGO_HOST);
mongoose.connect(config['database']);

app.set('superSecret', config.secret);
mongoose.connection.on('open', function (ref) {
    console.log('Connected to Mongo server...');
});

app.set('superSecret', config.secret);

app.listen(port);
console.log("Model Management Service is listening on: " + port);


app.post('/models', function(req, res) {

    var model = new Model({
        name : req.body.name,
        description : req.body.description,
        createdOn: req.body.createdOn,
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

app.post('/descriptions', function(req, res) {

    var description = new Description({
        name : req.body.name,
        docker : req.body.description,
        domain: req.body.createdOn,
        yaml: req.body.yaml
    });

    console.log('everything is fine')

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