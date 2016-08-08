//DEPENDENCIES
const express = require('express');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const app = express();
const querystring = require('querystring');

var exphbs = require('express-handlebars');
var sequelize = require('sequelize');

var request = require('request');

var models = require('./models');

require('dotenv').config();

var winston = require('winston');
winston.add(winston.transports.File, { filename: 'error.log' });

var http = require('http').Server(app);
var io = require('socket.io')(http);

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
	state: '3(#0/!~' //if we're not using states remove this
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
		redirect_uri: 'http://secret-garden-19417.herokuapp.com/callback'
	}, saveToken);

	function saveToken(error, result) {
		if (error) { winston.log('Access Token Error', error.message); }
		if (typeof result === 'string') {
			result = querystring.parse(result);
		}
		accessToken = oauth2.accessToken.create(result);
		// console.log(JSON.stringify(accessToken.token.access_token));
		// Find a way to save the access token from this object to use within session 

		var options = {
		  url: 'https://api.github.com/user',
		  headers: {
	  	    'User-Agent': 'request',
		    'Authorization': 'token ' + accessToken.token.access_token
		  }
		};
		request(options, function(error, response, body) {
			var info = JSON.parse(body);
			console.log(JSON.stringify(info));
			res.send(JSON.stringify(info)); 
			//this is the request we'll call to pull the information user name and avatar
		})
	}
});


app.get('/', function (req, res) {
	res.render('index');
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

