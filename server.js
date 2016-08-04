//dependencies. Done as const just because I can
const express = require('express');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const app = express();

//serve up public folder and all content as static files to server.
app.use(express.static('public'));
//use bodyParser, do not encode url
app.use(bodyParser.urlencoded({
	extended: false
}));
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));
//require handlebars
var exphbs = require('express-handlebars');
//use handlebars engine as template engine, use 'main' as our base file
app.engine('handlebars', exphbs({
	defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

//link to main controller, set as default page"/"
var routes = require('./controllers/main_controller.js');
app.use('/', routes);
//listen on port, if undefined, use 3000
app.listen(process.env.PORT || 3000);