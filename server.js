var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var localStrategy = require('passport-local').Strategy;

var index = require('./routes/index');
var User = require('./models/user');
var register = require('./routes/register');
var login = require('./routes/login');

var app = express();


//Configs
app.use(express.static('public'));
app.use(passport.initialize());
app.use(passport.session());
app.use(session({
  secret: 'secret',
  key: 'user',
  resave: true,
  saveUninitialized: false,
  cookie: {maxAge: 600000, secure:false}
}));
app.use(bodyParser.json());


//Routes
app.use('/', index);
app.use('/register', register);
app.use('/login', login);

app.get('/', function(req, res, next){
  res.json(req.isAuthenticated());
});

//MongoDB
var mongoURI = 'mongodb://localhost:27017/prime_example_passport';
var MongoDB = mongoose.connect(mongoURI).connection;

MongoDB.on('error', function(err){
  console.log('mongodb conneciton error', err);
});

MongoDB.once('open', function(){
  console.log('mongodb connection open');
});


//Passport
passport.use('local', new localStrategy({
  passReqToCallback: true,
  usernameField: 'username'
},
  function(req, username, password, done){
    User.findOne({username: username}, function(err, user){
      if(err){
        throw err;
      };
      if(!user) {
        return done(null, false, {message: 'Incorrect username and password.'});
      }

      //test a matching password
      user.comparePassword(password, function(err, isMatch){
        if(err){
          throw err;
        }
        if(isMatch){
          return done(null, user);
        }
        else{
          done(null,false, {message: 'Incorrect username and password.'});
        }
      });
    });
}


//somehow i managed to type most of this twice

  // function(req, username, password, done){
  //   //our implementaion will go here
  // }
  // User.findOne({username: username}, function(err, user){
  //   if(err){
  //     throw err;
  //   }
  //   else{
  //     if(!user){
  //       return done(null, false);
  //     }
  //     user.comparePassword(password, function(err, isMatch){
  //       if(isMatch){
  //         return done(null, user);
  //       }
  //       else{
  //         done(null, false);
  //       }
  //     });
  //   };
  // });
));

passport.serializeUser(function(user, done){
  done(null, user.id);
});

passport.deserializeUser(function(id, done){
  User.findById(id, function(err, user){
    if(err){
      return done(err);
    }
    done(null, user);
  });
});



var server = app.listen(3000, handleServerStart);

function handleServerStart(){
  var port = server.address().port;
  console.log('Listening to port', port);
  console.log('Press Ctrl-c to quit.');
}
