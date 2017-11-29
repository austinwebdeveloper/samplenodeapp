var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SampleSchema = new Schema({
 sampleText: String
});

module.exports = mongoose.model('sampleText', SampleSchema);