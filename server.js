//DEPENDENCIES
const express = require('express');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const app = module.exports = express();
const querystring = require('querystring');
var exphbs = require('express-handlebars');
var session = require('express-session');
var sequelize = require('sequelize');
var request = require('request');
var models = require('./models');
require('dotenv').config();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var parseurl = require('parseurl')
pry = require('pryjs')

app.use(function (req, res, next) {
  var ses = req.session.ses

  if (!ses) {
    ses = req.session.ses = {}
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

//link to authentic controller, set as default page"/"
var auth = require('./controllers/auth_controller.js');
app.use('/auth/github', routes);

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

//listen on port, if undefined, use 3000

http.listen(process.env.PORT || 3000,function(){
	process.env.PORT == undefined? console.log("App listening on PORT 3000"):console.log("App listening on PORT" + process.env.PORT);
});