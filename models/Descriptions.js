/**
 * Created by AlexAdamenko.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Description = new Schema({
    name : { type: String, unique: true },
    docker : { type: String},
    domain: { type: String},
    yaml: { type: String}
});

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Description', Description);