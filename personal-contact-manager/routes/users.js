var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user')
var Contact = require('../models/contact');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Types.ObjectId;

var uri = 'mongodb://poopsquad:poopsquad@poop-cluster-shard-00-00-yv2oe.mongodb.net:27017,poop-cluster-shard-00-01-yv2oe.mongodb.net:27017,poop-cluster-shard-00-02-yv2oe.mongodb.net:27017/personal-contact-manager?ssl=true&replicaSet=POOP-Cluster-shard-0&authSource=admin';
mongoose.connect(uri);
var db = mongoose.connection;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users/index', { user : req.user });
});

router.get('/users', function(req, res, next) {
  res.render('users/index', { user : req.user });
});

router.get('/contacts', function(req, res, next) {
  var id = new ObjectId(req.user._id);
  var query = Contact.find({});
  query.where('user_id', id);

  query.exec(function(err, contact) {
    if(err)
      console.log(err);
    else {
      res.render('users/contacts', { title : 'Contacts', user : req.user, contactsList : contact });
    }});
});

router.get('/logout', function(req, res) {
    req.logout();
    res.render('index', { title : 'Personal Contact Manager' });
});

module.exports = router;
