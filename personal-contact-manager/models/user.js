var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, require: true }
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);
