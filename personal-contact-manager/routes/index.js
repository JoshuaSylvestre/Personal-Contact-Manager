var express = require('express');
var passport = require('passport');
var User = require('../models/user');
var router = express.Router();
var title = 'Personal Contact Manager'

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: title, user : req.user });
});

/* GET Register page. */
router.get('/register', function(req, res) {
  res.render('register', { title: 'Register' });
});

/* GET Login page. */
router.get('/login', function(req, res) {
  res.render('login', { title: 'Login', user : req.user });
});

/* GET Users page. */
router.get('/users', function(req, res, next) {
  res.render('users/index', { user : req.user });
});

/* POST to Register */
router.post('/register', function(req, res) {

  User.register(new User({
      firstName : req.body.firstName,
      lastName : req.body.lastName,
      email : req.body.email,
      username : req.body.username }), req.body.password, function(err, user) {
    if (err) {
        return res.render('error', { user : user });
    }

    passport.authenticate('local')(req, res, function () {
        res.render('/users');
    });
  });
});

/* POST to Login. */
router.post('/login', passport.authenticate('local'), function(req, res) {
    res.render('users', { user : req.user});
});

router.get('/logout', function(req, res) {
    req.logout();
    res.render('index', { title : title });
});

router.get('/ping', function(req, res){
    res.status(200).send("pong!");
});

module.exports = router;
