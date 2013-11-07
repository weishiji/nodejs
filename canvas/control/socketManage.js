exports.init = function(io){
	weishiji.SOCKET.init(io)
}
var weishiji = {}
weishiji.SOCKET = (function(){
	function sk(io){
		this.io = io
		this.test()
	}
	sk.prototype.test = function(){
		var that = this
		that.io.sockets.on('connection', function (socket) {
			socket.on('message', function (data) {
				that.io.sockets.emit('point',data)   // 所有客户端都接收数据
				//socket.broadcast.emit("point",data)  除了自己以外的所有用户接收数据
			})
		})
	}
	return {
		init : function(io){
			var temp = new sk(io)
			return temp
		}
	}
})()
