//DEPENDENCIES
const express = require('express');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const app = express();
const querystring = require('querystring');
var path = require('path');
var exphbs = require('express-handlebars');
//var session = require('express-session');
var Sequelize = require('sequelize');
var session = require('express-session');
var request = require('request');
var models = require('./models');
//require('dotenv').config();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var parseurl = require('parseurl');
pry = require('pryjs');

var sequelize = new Sequelize('mysql://vqr7tqxr8ba5rxd1:dbw35kmojsfrn4jz@gx97kbnhgjzh3efb.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/iybeq6p9pz3ehlaq');

//passport stuff
var passport = require('passport');
var util = require('util');
var GitHubStrategy = require('passport-github2').Strategy;

const keys = require('./tokens.js');

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

// Use the GitHubStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and GitHub
//   profile), and invoke a callback with a user object.
//
//passport.use(new GitHubStrategy({
//     clientID: process.env.CLIENT_ID,
//     clientSecret: process.env.CLIENT_SECRET,
//     callbackURL: "http://127.0.0.1:3000/auth/github/callback"
//   },
//   function(accessToken, refreshToken, profile, done) {
//     // asynchronous verification, for effect...
//     process.nextTick(function () {

//       // To keep the example simple, the user's GitHub profile is returned to
//       // represent the logged-in user.  In a typical application, you would want
//       // to associate the GitHub account with a user record in your database,
//       // and return that user instead.
//       return done(null, profile);
//     });
//   }
// ));

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

  passport.use(new GitHubStrategy({
    clientID: 'd34e37706529a775c0b1',//process.env.CLIENT_ID,
    clientSecret: '0bdd99451981a98386c96ebda7ef57dc5af2a0c0',//process.env.CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/github/callback"
  },
    function(accessToken, refreshToken, profile, done){
      var options = {where: {githubID: profile.id },
      defaults: { name: profile.name,
                email: profile.email,
                userName: profile.login }}
      models.Users.findOrCreate(options)
      .spread(function(user, created){
        return done(err, users);
      });
    }
  ));

// //passport-github2 CONFIGURE STRATEGY
// passport.use(new GitHubStrategy({
//     clientID: process.env.CLIENT_ID,
//     clientSecret: process.env.CLIENT_SECRET,
//     callbackURL: "http://127.0.0.1:3000/auth/github/callback"
//   }),
//   function(accessToken, refreshToken, profile, done) {
//     //RETURN USER FIND OR CREATE HERE
//   // .spread(function(user, created) {
//   //   console.log(user.get({
//   //     plain: true
//   //   }))
//   //   console.log(created)
//   var options = {where: { githubId: profile.id },
//       defaults: { name: profile.name,
//                   email: profile.email,
//                   userName: profile.login }};
//   models.Users.findOrCreate(options)
// .spread(function(user, created) {
// return done(err, user);
// })
// }
  // } name: DataTypes.STRING,
  //   email: DataTypes.STRING,
  //   githubID: DataTypes.STRING,
  //   languages: DataTypes.STRING,
  //   rating: DataTypes.INTEGER,
  //   userName: DataTypes.STRING,


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
  passport.authenticate('local', { failureRedirect: '/login' }));

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