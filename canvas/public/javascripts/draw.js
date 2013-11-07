$(document).ready(function(){
	new weishiji.drawFun()
})
var weishiji = window.weishiji || {}
weishiji.drawFun = (function(){
	var boxW = $(window).width(), boxH = $(window).height()
	function draw(){
		this.cvs = document.getElementById("cvs")
		this.ctx = this.cvs.getContext("2d")
		this.cvs.width = boxW
		this.cvs.height = boxH
		this.tool = {
			"startBool" : false,
			"points" : []
		}
		this.connect()
		this.createMemory()
	}
	draw.prototype.connect = function(){
		var that = this
		that.socket = io.connect(window.location.href)
		that.socket.on("connect",function(){
			that.bindEvt()
		})
		that.socket.on("point",function(pos){
			if(pos === "false"){
				that._end()
				return
			}
			var temp = pos.split(",")
			that.tool.points.push({
				"_x" : parseInt(temp[0]),
				"_y" : parseInt(temp[1])
			})
			that.drawLine()
		})
	}
	draw.prototype.bindEvt = function(){
		var that = this
		that.cvs.addEventListener("mousedown",function(ev){
			that._start(ev)
		},false)	
		that.cvs.addEventListener("mousemove",function(ev){
			that._move(ev)
		},false)
		that.cvs.addEventListener("mouseup",function(){
			that.socket.send(false)
			that._end()
		},false)
	}
	draw.prototype._start = function(ev){
		var that = this
		that.tool.startBool = true	
	}
	draw.prototype._move = function(ev){
		var that = this
		if(!that.tool.startBool) return
		var x = ev.pageX,y = ev.pageY
		that.socket.send([x,y])
		
	
	}
	draw.prototype._end = function(ev){
		var that = this
		that.tool.startBool = false

		that.clear(that.mermory.ctx)
		that.mermory.ctx.drawImage(that.cvs,0,0)
		
		that.tool.points = []
	}
	draw.prototype.clear = function(ctx){
		var that = this
		ctx.clearRect(0,0,boxW,boxH)
	}
	draw.prototype.drawLine = function(){
		var that = this, ctx = that.ctx ,poArr = that.tool.points
		ctx.lineWidth = 2
		ctx.lineJoin = 'round'
		ctx.lineCap = 'round'

		that.clear(that.ctx)
		that.ctx.drawImage(that.mermory.cvs,0,0)
		
		if(poArr.length < 6) return
		if(poArr.length < 6){
			var b = poArr[0]
			ctx.beginPath(), ctx.arc(b._x, b._y, ctx.lineWidth / 2, 0, Math.PI * 2, !0), ctx.closePath(), ctx.fill()
			return
		}
		ctx.beginPath()
		ctx.moveTo(poArr[0]._x, poArr[0]._y)
		for (i = 1; i < poArr.length - 2; i++) {
			var c = (poArr[i]._x + poArr[i + 1]._x) / 2,
			d = (poArr[i]._y + poArr[i + 1]._y) / 2
			ctx.quadraticCurveTo(poArr[i]._x, poArr[i]._y, c, d)
		}
		ctx.quadraticCurveTo(poArr[i]._x, poArr[i]._y, poArr[i + 1]._x, poArr[i + 1]._y), ctx.stroke()
	
	}
	draw.prototype.createMemory = function(){
		var that = this, 
			memW = that.cvs.getAttribute("width"),
			memH = that.cvs.getAttribute("height"),
			cvs = document.createElement('canvas')
		cvs.width = memW
		cvs.height = memH
		
		ctx = cvs.getContext("2d")
		that.mermory = {
			"cvs" : cvs,
			"ctx" : ctx
		}
	}
	return draw
})()
