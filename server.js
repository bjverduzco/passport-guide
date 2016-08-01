var express = require('express');
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
  res.sendFile(path.resolve(__dirname, '../public/views/login.html'));
});


//Passport
passport.use('local', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password'
}, function(username, password, done) {
  User.findAndComparePassword(username, password, function(err, isMatch, user){
      if (err) {
        return done(err);
      }

      if (isMatch) {
        // successfully auth the user
        return done(null, user);
      } else {
        done(null, false);
      }
  });
}));


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
