var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
    username    : {type: String, required: true},
    password    : {type: String, required: true},
    profession  : {type: String, required: false},
    age			: {type: String, required: false}
});

var UserSchema   = new Schema({
    email:  {type: String, required: true},
    username:  {type: String, required: true},
    password:  {type: String, required: true},
    phone:  {type: String, required: false},
    profession:  {type: String, required: false},
    age:  {type: Number, required: false},
    token: String
});

var User = mongoose.model('user', User);
var AuthUser = mongoose.model('authUser', UserSchema);

module.exports = {
  User: User,
  AuthUser : AuthUser
}