var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');
var Users = require('../models/user');

router.get('/', function(req, res, next){
  Users.create(req.body, function(err, post){
    if(err){
      next(err);
    }
    else{
      //we registered the user, but they haven't logged n yet.
      //redirect them to the login page
      res.redirect('/');
    }
  });
});

module.exports = router;
