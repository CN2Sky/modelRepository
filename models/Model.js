let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let Model = new Schema({
    name : String,
    descriptionId : String,
    trainedBy: String,
    trainedOn: Date,
    accuracy: String,
    model: {},
    endpoint: String,
    modelParameters: {}
});

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Model', Model);