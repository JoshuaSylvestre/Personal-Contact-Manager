var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Contact = new Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    nickname: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true },
    homePhone: { type: String, required: true },
    cellPhone: { type: String, required: true }
});

var User = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    username: { type: String, required: true },
    password: String
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);
