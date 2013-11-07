
exports.init = function(io){
	var SerialPort = require("serialport").SerialPort
	var portName = "/dev/ttyACM0"
	var sp = new SerialPort(portName,{
		baudRate: 9600 // this is synced to what was set for the Arduino Code
	    //dataBits: 8, // this is the default for Arduino serial communication
	    //parity: 'none', // this is the default for Arduino serial communication
	    //stopBits: 1, // this is the default for Arduino serial communication
	    //flowControl: false // this is the default for Arduino serial communication
	})
	
	sp.open(function(){
		console.log("port is open")
	})
	sp.on("data",function(data){
		console.log(data.toString())
	})
	io.set('log level', 1)
	io.sockets.on('connection', function (socket) {
		var bool = 0
		socket.on("message",function(msg){
			//var newMsg = "a" + msg + "b"
			
			var newMsg = msg + "a"
			if(bool === 0){
				sp.write(newMsg,function(err,results){
					bool = 0
					//console.log(err)
					//console.log(results)
				})
				bool = 1
			}
			
			
		})
		socket.on('disconnect',function(){
		
		})
	})
	
}
