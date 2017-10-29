module.exports = function (app) {

    let Model = require('./../models/Model');
    let request = require('request');
    let querystring = require('querystring');


    app.post('/model/create', function (req, res) {

        let model = new Model({
            name: req.body.name,
            description: req.body.description,
            createdOn: new Date(),
            createdBy: req.body.createdBy,
            trainedOn: req.body.trainedOn,
            accuracy: req.body.accuracy,
            domain: req.body.domain,
            model: req.body.model,
            inputType: req.body.inputType,
            inputDimensions: req.body.inputDimensions,
            modelParameters: req.body.modelParameters
        });

        model.save(function (err) {
            if (err) {
                res.json({success: false});
            }
            else {
                res.json({success: true});
            }

        });
    });

    app.post('/model/train', function (req, res) {

        let form = {
            training_data: req.body.modelParameters.training_data.toString(),
            epoche: req.body.modelParameters.epoche.toString(),
            target_data: req.body.modelParameters.target_data.toString()
        };

        let formData = querystring.stringify(form);
        let contentLength = formData.length;


        request({
            headers: {
                'Content-Length': contentLength,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            uri: req.body.endpoint + "/train",
            body: formData,
            method: 'POST'
        }, function (err, response, body) {
            res.send(body);
        });
    });

    app.get('/models', function (req, res) {
        Model.find({}, function (err, models) {
            res.json(models);
        });
    });


};