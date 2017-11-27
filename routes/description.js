module.exports = function (app) {

    let Description = require('./../models/Descriptions');
    let UserReferecedDescription = require('./../models/UserReferecedDescription');

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
            isPublic: false,
            isCopy: false,
            endpoint: null,
            isCloudify: false,
            copiedFromDescriptionId: null,
            copiedBy: null
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

    app.post('/description/copy', function (req, res) {

        UserReferecedDescription.find({user: req.body.user}, function (err, refDesc) {
            if (refDesc.length === 0) {
                let arr = [req.body._id];
                let userReferencedDescription = new UserReferecedDescription({
                    user: req.body.user,
                    descriptionsId: arr
                });

                userReferencedDescription.save(function (err) {
                    if (err) {
                        res.json({success: false});
                    }
                    else {
                        res.json({success: true});
                    }

                });
            } else {
                UserReferecedDescription.findOneAndUpdate({user: req.body.user}, {$push: {descriptionsId: req.body._id}}, function (err, doc) {
                    if (err) {
                        res.json({success: false});
                    }
                    else {
                        res.json({success: true});
                    }
                });
            }
        });
    });

    app.post('/description/run/instance/:id', function (req, res) {
        // CLOUDIFY DEPLOYMENT !!!!!!!
        Description.update({_id: req.params.id}, {$set: req.body}, function (err, models) {
            res.json(models);
        });

    });


    app.get('/description/remove/copy/:user/:descriptionsId', function (req, res) {

        UserReferecedDescription.update({user: req.params.user}, {$pull: {descriptionsId: req.params.descriptionsId}}, function (err, doc) {
            if (err) {
                res.json({success: false});
            }
            else {
                res.json({success: true});
            }
        });

    });


    app.get('/description/references/:user', function (req, res) {

        UserReferecedDescription.findOne({user: req.params.user}, function (err, response) {
            res.send(response);
            if (err) throw err;
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

    app.post('/description/update/:id', function (req, res) {
        Description.update({_id: req.params.id}, {$set: req.body}, function (err, models) {
            res.json(models);
        });
    });
};