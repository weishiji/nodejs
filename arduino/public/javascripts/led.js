var socket = io.connect(window.location.href);
socket.on('connect', function () {
	socket.send('A client connected.');
});
socket.on('sendMsg', function (msg) {
	//console.log(msg+"111")
});
socket.on('disconnect', function () {
	//console.log('disconnected');
});
$(document).ready(function(){
	$("#on").bind("click",function(){
		socket.send("0")	
	})
	$("#off").bind("click",function(){
		socket.send("1")
	})
	$("#sl").slider().on("slide",function(){
		var val = $(this).val()
		socket.send(val)
	})
})
