
/**
 * Module dependencies.
 */
var socket = require('socket.io');
var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var sk = require('./control/socketManage')

var app = express();

// all environments
app.configure(function(){
	app.set('port', process.env.PORT || 3000);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'ejs');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));
})

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

var server = http.createServer(app);
var io = socket.listen(server);

server.listen(app.get('port'),function(){
	console.log('Express server listening on port ' + app.get('port'));
})
//路由器
routes(app);

sk.init(io)

