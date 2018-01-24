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
  res.render('register', { title: 'Register', success : true });
});

/* GET Login page. */
router.get('/login', function(req, res) {
  res.render('login', { title: 'Login', user : req.user, success : true });
});

/* GET Users page. */
router.get('/users', function(req, res, next) {
  res.render('users/index', { user : req.user });
});

/* POST to Register */
router.post('/register', function(req, res) {

  if(!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.username || !req.body.password)
    res.render('register', { title : 'Register', success : false });

  User.register(new User({
      firstName : req.body.firstName,
      lastName : req.body.lastName,
      email : req.body.email,
      username : req.body.username
      }), req.body.password, function(err, user) {
      if (err) {
          return res.render('error', { user : user });
      }

    passport.authenticate('local')(req, res, function () {
        res.render('users', { user : user });
    });
  });
});

/* POST to Login. */
router.post('/users', function(req, res) {
  passport.authenticate('local', function(err, user, info){
    if(err)
      res.render('error');

    if(!user)
      res.render('login', { title : 'Login', success : false });

    passport.authenticate('local')(req, res, function () {
        res.render('users', { user : user });
    });
  })(req, res);
});

router.get('/logout', function(req, res) {
    req.logout();
    res.render('index', { title : title });
});

module.exports = router;
