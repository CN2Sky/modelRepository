var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var modelParameters = new Schema({
    parameter: String,
    defaultValue: String
});

var Description = new Schema({
    createdBy: { type: String},
    createdOn: { type: Date},
    name:  {type: String, unique: true },
    docker: { type: String},
    domain: { type: String},
    yaml: { type: String},
    inputType: { type: String},
    inputDimensions: { type: String},
    modelParameters: [modelParameters],
    isRunning: { type: Boolean }
});

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Description', Description);