var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
    username    : {type: String, required: true},
    password    : {type: String, required: true},
    profession  : {type: String, required: false},
    age			: {type: String, required: false}
});

module.exports = mongoose.model('user', User);