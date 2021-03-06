var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');
var Users = require('../models/user');

//posts the username and password to be registered
router.post('/', function(req, res, next){
  // console.log(req.body);

  //creates the username and password based on the input fields
  Users.create(req.body, function(err, post){
    if(err){
      console.log('errror creating user', err);
      next(err);
    }
    else{
      console.log('redirecting to /');
      //we registered the user, but they haven't logged n yet.
      //redirect them to the login page
      res.redirect('/');
    }
  });
});

module.exports = router;
