var CONFIG =(function(){
	var mongo = require("mongoskin")
		,url = require("url")
	return {
		"server" : function(dbname){
			var db = mongo.db('localhost:27017/'+ dbname +'?auto_reconnect=true')
			return db
		},
		"url" : function(_url){
			var argument = url.parse(_url, true).query
			return argument
		}
	}
})()

module.exports = CONFIG
