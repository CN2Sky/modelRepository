var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Model = new Schema({
    name : { type: String, unique: true },
    description : { type: String},
    createdOn: { type: String},
    createdBy: { type: String},
    trainedOn: { type: String},
    accuracy: { type: String},
    domain: { type: String},
    model: { type: String},
    inputType:{type:String},
    inputDimensions: {type:String},
    modelParameters:[{parameter:String, defaultValue:String}]
});

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Model', Model);