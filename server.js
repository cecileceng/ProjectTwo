//DEPENDENCIES
const express = require('express');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const app = express();
const querystring = require('querystring');
var path = require('path');
var exphbs = require('express-handlebars');
//var session = require('express-session');
//var Sequelize = require('sequelize');
var session = require('express-session');
var request = require('request');
var models = require('./models');
//require('dotenv').config();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var parseurl = require('parseurl');
pry = require('pryjs');

//passport stuff
var passport = require('passport');
var util = require('util');
var GitHubStrategy = require('passport-github2').Strategy;

//const keys = require('./tokens.js');


app.use(require('serve-static')(__dirname + '/../../public'));
//app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
//app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

//passport-github strategy
app.get('/auth/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }));

app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

var partials = require('express-partials');

// Passport session setup SERIALIZE/DESERIALIZE
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


//passport-github2 CONFIGURE STRATEGY
  passport.use(new GitHubStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "https://secret-garden-19417.herokuapp.com/auth/github/callback"
  },
    function(accessToken, refreshToken, user, done){
      // var js = JSON.parse(user);
      // console.log(js.name);
      console.log(user);
      console.log(user.displayName);
      // console.log(user.email);
      // console.log(user.login);
      var profile = user._json;
      console.log(profile);
      var options = {where: {githubID: user.id},
      defaults: { githubID: user.id,
                name: profile.name,
                email: profile.email,
                userName: profile.login }}
      models.Users.findOrCreate(options)
      .spread(function(user, created){
        var err = undefined;
        return done(err, user);
      });
    }
  ));

// configure Express
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(partials());
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//app.use(methodOverride());
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());
//app.use(express.static(__dirname + '/public'));

//AUTHENTICATE REQUESTS
app.get('/auth/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }));


app.post('/login', 
  passport.authenticate('github', { failureRedirect: '/login' }));
  // function(req, res) {
  //   // Successful authentication, redirect home.
  //   res.redirect('/');
  // });


app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

// app.get('/auth/github/callback',
//   passport.authenticate('github', { failureRedirect: '/login' }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     res.redirect('/');
//   }));



// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}

//  session stuff
// app.use(session({
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: true
// }));

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

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

//listen on port, if undefined, use 3000

http.listen(process.env.PORT || 3000,function(){
  process.env.PORT == undefined? console.log("App listening on PORT 3000"):console.log("App listening on PORT" + process.env.PORT);
});