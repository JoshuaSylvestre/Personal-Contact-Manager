var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var uri = 'mongodb://poopsquad:poopsquad@poop-cluster-shard-00-00-yv2oe.mongodb.net:27017,poop-cluster-shard-00-01-yv2oe.mongodb.net:27017,poop-cluster-shard-00-02-yv2oe.mongodb.net:27017/personal-contact-manager?ssl=true&replicaSet=POOP-Cluster-shard-0&authSource=admin';
mongoose.connect(uri);
var db = mongoose.connection;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users/index', { user : req.user });
});

router.get('/contacts', function(req, res, next) {
  //call to db to find contacts
  var allContacts = db.collection("Contacts").find({user_id:req.user._id}).toArray();
  console.log(allContacts);
  res.render('users/contacts', { title : 'Contacts', user : req.user });
});

module.exports = router;
