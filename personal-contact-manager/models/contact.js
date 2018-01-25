var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var Contact = new Schema({
    user_id: { type : ObjectId, ref: 'User' },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    nickname: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true },
    homePhone: { type: String, required: true },
    cellPhone: { type: String, required: true }
});

Contact.set('collection', 'Contacts');

module.exports = mongoose.model('Contact', Contact);
