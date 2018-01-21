var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users/index', { user : req.user });
});

router.get('/contacts', function(req, res, next) {
  res.render('users/contacts', { title : 'Contacts', user : req.user });
});

module.exports = router;
