var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');

//this was just used to test the authenitcation
// router.get('/', function(req, res, next){
//   res.json(req.isAuthenticated());
// });

//post method to the server and the db
router.post('/', passport.authenticate('local'), function(req, res) {
  res.sendStatus(200);
});

module.exports = router;
