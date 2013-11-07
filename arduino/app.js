var socket = require('socket.io')
var express = require('express')
var routes = require('./routes')
var user = require('./routes/user')
var http = require('http')
var path = require('path')
var socketManage = require('./control/socketController')

//var serialport = require('serialport2').SerialPort;


var app = express()
app.configure(function() {
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

app.configure('development', function() {
  app.use(express.errorHandler());
})

var server = http.createServer(app);

server.listen(app.get('port'), function() {
  console.log("Express server listening on port " + app.get('port'));
})


routes(app)

var io = socket.listen(server);
socketManage.init(io)






