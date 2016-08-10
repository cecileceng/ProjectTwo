//DEPENDENCIES
const express = require('express');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const app = express();
const querystring = require('querystring');
var exphbs = require('express-handlebars');
var session = require('express-sessions');
var sequelize = require('sequelize');
var request = require('request');
var models = require('./models');
require('dotenv').config();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var parseurl = require('parseurl')
var passport = require('passport');
var util = require('util');
var GitHubStrategy = require('passport-github2').Strategy;
var partials = require('express-partials');

app.get('/', function (req, res) {
	res.render('index');
});

//trying this out

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete GitHub profile is serialized
//   and deserialized.
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});


// Use the GitHubStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and GitHub
//   profile), and invoke a callback with a user object.
passport.use(new GitHubStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      
      // To keep the example simple, the user's GitHub profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the GitHub account with a user record in your database,
      // and return that user instead.
      return done(null, profile);
    });
  }
));

// configure Express
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(partials());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));


app.get('/', function(req, res){
  res.render('index', { user: req.user });
});

app.get('/account', ensureAuthenticated, function(req, res){
  res.render('account', { user: req.user });
});

app.get('/login', function(req, res){
  res.render('login', { user: req.user });
});

// GET /auth/github
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in GitHub authentication will involve redirecting
//   the user to github.com.  After authorization, GitHub will redirect the user
//   back to this application at /auth/github/callback
app.get('/auth/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }),
  function(req, res){
    // The request will be redirected to GitHub for authentication, so this
    // function will not be called.
  });

// GET /auth/github/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function will be called,
//   which, in this example, will redirect the user to the home page.
app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
};

  //session stuff

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

var sessionVar = session({ secret: 'keyboard cat', resave: false, saveUninitialized: false });
console.log(typeof sessionVar);
console.log(typeof partials());

app.use(function (req, res, next) {
  var views = req.session.views

  if (!views) {
    views = req.session.views = {}
  }

  // get the url pathname
  var pathname = parseurl(req).pathname

  // count the views
  views[pathname] = (views[pathname] || 0) + 1

  next()
});

app.get('/foo', function (req, res, next) {
  res.send('you viewed this page ' + req.session.views['/foo'] + ' times')
});

app.get('/bar', function (req, res, next) {
  res.send('you viewed this page ' + req.session.views['/bar'] + ' times')
});

////

//serve up public folder and all content as static files to server.
app.use(express.static('public'));
//use bodyParser, do not encode url
app.use(bodyParser.urlencoded({
  extended: false
}));
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));
//use handlebars engine as template engine, use 'main' as our base file
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

//link to main controller, set as default page"/"
var routes = require('./controllers/main_controller.js');
app.use('/', routes);

// //link to authentication controller, set as default page"/auth"
// var routes = require('./controllers/auth_controller.js');
// app.use('/', routes);

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

//listen on port, if undefined, use 3000

http.listen(process.env.PORT || 3000,function(){
	process.env.PORT == undefined? console.log("App listening on PORT 3000"):console.log("App listening on PORT" + process.env.PORT);
});