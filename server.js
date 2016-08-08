//DEPENDENCIES
const express = require('express');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const app = express();

var exphbs = require('express-handlebars');
var sequelize = require('sequelize');

var models = require('./models');

//////////////////////////////////////////////
/*commented out until we implement tokens.js*/
//////////////////////////////////////////////
//const keys = require('./tokens.js');

var http = require('http').Server(app);
var io = require('socket.io')(http);
//const keys = require('./tokens.js');


//OAUTH2
/*
var oauth2 = require('simple-oauth2')({
	clientID: CLIENT_ID,
	clientSecret: CLIENT_SECRET,
	site: 'https://github.com/login',
	tokenPath: '/oauth/access_token',
	authorizationPath: '/oauth/authorize'
});

// Authorization uri definition
var authorization_uri = oauth2.authCode.authorizeURL({
	redirect_uri: 'http://localhost:3000/callback',
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
		redirect_uri: 'http://localhost:3000/callback'
	}, saveToken);

	function saveToken(error, result) {
		if (error) { console.log('Access Token Error', error.message); }
		token = oauth2.accessToken.create(result);
	}
});

app.get('/', function (req, res) {
	res.send('Hello<br><a href="/auth">Log in with Github</a>');
});
*/

//Nothing new added below

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

