module.exports = function (app) {

    let VINNSL_Description_NN = require('./../models/VINNSL_Description_NN');

    app.post('/vinnsl/description/create', function (req, res) {

        let hiddenLayer = [];
        req.body.structure.hiddenLayer.result.dimensions.map(l => {
            l.amount = l.nodesId.length;
            hiddenLayer.push(l)
        });


        let description = new VINNSL_Description_NN({
            metadata: {
                name: req.body.metadata.name,
                description: req.body.metadata.description,
                paradigm: req.body.metadata.paradigm,
                version: {
                    major: null,
                    minor: null
                }
            },
            creator: {
                name: req.body.creator.name,
                contact: req.body.creator.contact
            },
            problemDomain: {
                propagationType: {
                    propType: req.body.problemDomain.propagationType.value,
                    learningType: req.body.problemDomain.propagationType.learningType.value
                },
                applicationField: [req.body.problemDomain.applicationField.value],
                problemType: req.body.problemDomain.problemType.value,
                networkType: req.body.problemDomain.networkType
            },
            endpoints: req.body.endpoints,
            structure: {
                inputLayer: {
                    nodesId: req.body.structure.inputLayer.result.nodesId,
                    amount: req.body.structure.inputLayer.result.nodesId.length
                },
                hiddenLayer: hiddenLayer,
                outputLayer: {
                    nodesId: req.body.structure.outputLayer.result.nodesId,
                    amount: req.body.structure.outputLayer.result.nodesId.length
                }
            },
            connections: {
                fullyConnected: {
                    isConnected: req.body.structure.connections.fullyConnected.isConnected
                },
                shortcuts: {
                    isConnected: req.body.structure.connections.shortcuts.isConnected,
                    connections: req.body.structure.connections.shortcuts.connections
                }
            },
            parameters: {
                input: req.body.parameters.input
            },
            data: {
                description: req.body.data.description,
                tableDescription: req.body.data.tableDescription,
                fileDescription: req.body.data.fileDescription
            },
            executionEnvironment: {
                lastRun: req.body.executionEnvironment.lastRun,
                isRunning: false,
                hardware: req.body.executionEnvironment.hardware,
                isPublic: req.body.executionEnvironment.isPublic
            }
        });

        console.log(description);


        description.save(function (err, obj) {
            console.log(obj);
            if (err) {
                res.json({success: false, id: obj._id});
            }
            else {
                res.json({success: true, id: obj._id});
            }

        });
    });

    app.post('/vinnsl/descriptions/:from/:limit', function (req, res) {


        let filters = {};

        if (req.body.filters) {
            for (let [key, value] of Object.entries(req.body.filters)) {
                console.log(typeof(value));

                if (value && typeof(value) !== "boolean") {
                    filters[key] = {$regex: ".*" + value + ".*"};
                }
                if (typeof(value) === "boolean" && value) {
                    filters[key] = value;
                }

            }
        }

        Object.assign(filters, req.body.static_filters);

        console.log(filters);

        VINNSL_Description_NN.find(filters, function (err, models) {
            console.log(models);
            res.json(models);
        }).skip(parseInt(req.params.from)).limit(parseInt(req.params.limit));
    });

    app.get('/vinnsl/description/:id', function (req, res) {

        VINNSL_Description_NN.findById(req.params.id, function (err, response) {
            res.send(response);
            if (err) throw err;
        });
    });
};
