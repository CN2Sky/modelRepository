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
            isRunning: false
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


    app.get('/descriptions/:user/:usertype', function (req, res) {
        if(req.params.usertype === "admin") {
            Description.find({}, function (err, models) {
                res.json(models);
            });
        } else {
            Description.find({createdBy: req.params.user}, function (err, models) {
                res.json(models);
            });
        }
    });

    app.get('/description/update/:id/:property/:change', function (req, res) {
        Description.update({_id: req.params.id}, {$set: {[req.params.property]: req.params.change}}, function (err, models) {
            res.json(models);
        });
    });
};