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

/* POST new Contact */
router.post('/contacts', function(req, res) { 
  if (!req.body.firstName || !req.body.lastName || !req.body.nickname || !req.body.address || !req.body.email || !req.body.homePhone || !req.body.cellPhone)
    res.render('contacts', {title: 'Add Contact', success : false});

  // create Contact object for new contact
  var new_contact = new Contact({
    user_id: new ObjectId(req.user._id),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    nickname: req.body.nickname,
    address: req.body.address,
    email: req.body.email,
    homePhone: req.body.homePhone,
    cellPhone: req.body.cellPhone
  });

  // save new contact to the db
  new_contact.save(function(err) {
    if(err)
      console.log(err);
  });

  // refresh list to show new contact
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

router.get('/about', function(req, res, next) {
  res.render('users/about', { user : req.user });
});

router.get('/logout', function(req, res) {
    req.logout();
    res.render('index', { title : 'Personal Contact Manager' });
});

module.exports = router;
