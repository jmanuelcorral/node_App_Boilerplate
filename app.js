
/**
 * Module dependencies.
 */
var express = require('express');
var exphbs  = require('express3-handlebars');
var stylus = require('stylus');
var http = require('http');
var path = require('path');
var fs = require('fs');
var app = express();
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

app.configure(function(){
	app.use(stylus.middleware({ src: path.join(__dirname, 'stylus'),
								dest: path.join(__dirname, 'public/stylesheets'),
								debug: true,
								force: true
	}));
});

app.get('/', function (req, res, next) {
    res.render('home', {title: "hello"});
});


var controllerFiles = fs.readdirSync(path.join(__dirname, 'controllers'));

controllerFiles.forEach(function (controllerFile) { 
	if (controllerFile.indexOf('.js') === -1) {                      
		return;                                                           } 
	else {                                                      
		controllerFile = controllerFile.replace('.js', '');             
		var controller = require('./controllers/' + controllerFile); 
		controller.setup(controllerFile, app);                                                 
	}
});


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


http.createServer(app).listen(app.get('port'), function(){
	console.log('Server listening on port ' + app.get('port'));
});
