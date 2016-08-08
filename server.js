//DEPENDENCIES
const express = require('express');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const app = express();

var exphbs = require('express-handlebars');
var sequelize = require('sequelize');

var models = require('./models');

require('dotenv').config();

var http = require('http').Server(app);

var winston = require('winston');
winston.add(winston.transports.File, { filename: 'error.log' });

//var io = require('socket.io')(http);

//OAUTH2
var oauth2 = require('simple-oauth2')({
	clientID: process.env.CLIENT_ID,
	clientSecret: process.env.CLIENT_SECRET,
	site: 'https://github.com/login',
	tokenPath: '/oauth/access_token',
	authorizationPath: '/oauth/authorize'
});

// Authorization uri definition
var authorization_uri = oauth2.authCode.authorizeURL({
	redirect_uri: 'http://secret-garden-19417.herokuapp.com/callback',
	scope: 'notifications',
	state: '3(#0/!~'
});

// Initial page redirecting to Github
app.get('/auth', function (req, res) {
	res.redirect(authorization_uri);
});

// Callback service parsing the authorization token and asking for the access token
app.get('/callback', function (req, res) {
	var code = req.query.code;

	oauth2.authCode.getToken({
		code: code,
		redirect_uri: 'http://secret-garden-19417.herokuapp.com//callback'
	}, saveToken);

	function saveToken(error, result) {
		if (error) { winston.info('Access Token Error', error.message); }
		winston.info(result);
		result.expires_in = 2592000; // 30 days in seconds
		token = oauth2.accessToken.create(result);
		winston.info(token);
	}
});

app.get('/', function (req, res) {
	res.send('Hello<br><a href="/auth">Log in with Github</a>');
});

// Sample of a JSON access token (you got it through previous steps)
// var token = {
//   'access_token': '<access-token>',
//   'refresh_token': '<refresh-token>',
//   'expires_in': '7200'
// };

// Check if the token is expired. If expired it is refreshed.
// if (token.expired()) {
//   // Callbacks
//   token.refresh(function(error, result) {
//     token = result;
//   })

//   // Promises
//   token.refresh().then(function saveToken(result) {
//     token = result;
//   });
// }

// Callbacks
// Revoke only the access token
// token.revoke('access_token', function(error) {
//   // Session ended. But the refresh_token is still valid.

//   // Revoke the refresh_token
//   token.revoke('refresh_token', function(error) {
//     console.log('token revoked.');
//   });
// });

// Promises
// Revoke only the access token
// token.revoke('access_token')
//   .then(function revokeRefresh() {
//     // Revoke the refresh token
//     return token.revoke('refresh_token');
//   })
//   .then(function tokenRevoked() {
//     console.log('Token revoked');
//   })
//   .catch(function logError(error) {
//     console.log('Error revoking token.', error.message);
//   });

/////

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
/*
io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});*/

//listen on port, if undefined, use 3000

http.listen(process.env.PORT || 3000,function(){
	process.env.PORT == undefined? winston.info("App listening on PORT 3000"):console.log("App listening on PORT" + process.env.PORT);
});
