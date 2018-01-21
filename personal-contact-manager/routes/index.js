var express = require('express');
var passport = require('passport');
var User = require('../models/user');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Personal Contact Manager', user : req.user });
});

/* GET Register page. */
router.get('/register', function(req, res) {
  res.render('register', { title: 'Register' });
});

/* GET Login page. */
router.get('/login', function(req, res) {
  res.render('login', { title: 'Login', user : req.body.username });
});

/* POST to Register */
router.post('/register', function(req, res) {

  User.register(new User({
      firstName : req.body.firstName,
      lastName : req.body.lastName,
      email : req.body.email,
      username : req.body.username }), req.body.password, function(err, account) {
    if (err) {
        return res.render('register', { account : account });
    }

    passport.authenticate('local')(req, res, function () {
        res.redirect('/');
    });
  });
    // // Set our internal DB variable
    // var db = req.db;
    //
    // // Get our form values. These rely on the "name" attributes
    // var firstName = req.body.firstName;
    // var lastName = req.body.lastName;
    // var email = req.body.email;
    // var username = req.body.username;
    // var password = req.body.password;
    //
    // // Set our collection
    // var collection = db.get('users');
    //
    // // Submit to the DB
    // collection.insert({
    //     "firstName" : firstName,
    //     "lastName" : lastName,
    //     "email" : email,
    //     "username" : username,
    //     "password" : password
    // }, function (err, doc) {
    //     if (err) {
    //         res.redirect('error');
    //     }
    //     else {
    //         res.render('register', { user : username });
    //     }
    // });
});

// /* POST to Login */
// router.post('/users', function(req, res) {
//
//     // Set our internal DB variable
//     var db = req.db;
//
//     // Get our form values. These rely on the "name" attributes
//     var username = req.body.username;
//     var password = req.body.password;
//
//     // Set our collection
//     var collection = db.get('users');
//
//     collection.find({
//       "username" : username,
//       "password" : password
//     }, function (err, doc) {
//       if (err) {
//           res.redirect('error');
//       }
//       else {
//           res.render('users', { user : username });
//       }
//     });
//
// });

router.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/');
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/ping', function(req, res){
    res.status(200).send("pong!");
});

module.exports = router;
