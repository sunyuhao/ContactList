var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var contactSchema = new Schema ({
	name : String,
	number : String
});

module.exports = mongoose.model('Contact', contactSchema);