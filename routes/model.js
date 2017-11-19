module.exports = function (app) {

    let Model = require('./../models/Model');
    let request = require('request');
    let querystring = require('querystring');


    app.post('/model/train', function (req, res) {

        let formData = querystring.stringify(req.body.modelParameters);
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


            let model = new Model({
                name: req.body.name,
                descriptionId: req.body.descriptionId,
                trainedBy: req.body.trainedBy,
                trainedOn: new Date(),
                endpoint: req.body.endpoint,
                accuracy: req.body.accuracy,
                modelParameters: req.body.modelParameters,
                model: JSON.parse(body)
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
    });

    app.post('/model/test', function (req, res) {

        Model.findById(req.body.modelId, function (err, model) {
            console.log(req.body);

            let requestedParams = [{model : model.model}, {testing_data : req.body.testing_data}];

            // requestedParams.model = model.model ;
            // requestedParams.testing_data = req.body.testing_data;
            let formData = querystring.stringify(requestedParams);
            let contentLength = formData.length;

            request({
                headers: {
                    'Content-Length': contentLength,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                uri: model.endpoint + "/test",
                body: formData,
                method: 'POST'
            }, function (err, response, body) {


                res.send(body);
            });
        });

    });


    app.get('/models/:descriptionId', function (req, res) {
        Model.find({descriptionId: req.params.descriptionId}, function (err, models) {
            res.json(models);
        });
    });

    app.get('/models/id/:modelId', function (req, res) {
        Model.findById(req.params.modelId, function (err, model) {
            res.json(model);
        });
    });

    app.get('/models', function (req, res) {
        Model.find({}, function (err, models) {
            res.json(models);
        });
    });


};