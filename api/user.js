var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
 username: String,
 password: String,
 email: String,
 phone: Number
});

module.exports = mongoose.model('Users', UserSchema);