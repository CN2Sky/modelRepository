module.exports = function (app) {

    let Description = require('./../models/Descriptions');


    app.post('/description/create', function (req, res) {

        let description = new Description({
            createdBy: req.body.user,
            createdOn: new Date(),
            name: req.body.name,
            docker: JSON.parse(req.body.docker),
            domain: req.body.domain,
            yaml: req.body.yaml,
            inputType: req.body.inputType,
            inputDimensions: req.body.inputDimensions,
            modelParameters: req.body.modelParameters,
            isRunning: false,
            isPublic: false
        });


        description.save(function (err) {
            if (err) {
                res.json({success: false});
            }
            else {
                res.json({success: true});
            }

        });
    });

    app.delete('/description/:id', function (req, res) {

        Description.findByIdAndRemove(req.params.id, function (err, response) {
            res.send(response);
            if (err) throw err;
        });
    });

    app.get('/description/:id', function (req, res) {

        Description.findById(req.params.id, function (err, response) {
            res.send(response);
            if (err) throw err;
        });
    });


    app.post('/descriptions/:from/:limit', function (req, res) {
        console.log(req.body);
            Description.find(req.body, function (err, models) {
                res.json(models);
            }).skip(parseInt(req.params.from)).limit(parseInt(req.params.limit));
    });

    app.post('/descriptions/running/:from/:limit', function (req, res) {
            Description.find({isRunning : true, isPublic: true}, function (err, models) {
                res.json(models);
            }).skip(parseInt(req.params.from)).limit(parseInt(req.params.limit));
    });

    app.get('/description/update/:id/:property/:change', function (req, res) {
        Description.update({_id: req.params.id}, {$set: {[req.params.property]: req.params.change}}, function (err, models) {
            res.json(models);
        });
    });
};