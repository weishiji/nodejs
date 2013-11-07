var db = require("./dbController")
var database = db.connect()
exports.login = function(req, res) {
	var username = req.body.username
	var password = req.body.password
	var query = "SELECT *FROM `user`WHERE `username` = '" + username + "' AND `password` = '" + password + "'"
	database.query(query, function(error, results) {
		if (error === null) {
			console.log(results)
			if (results.length === 0) {
				res.send({
					status: 0,
					message: "login failed!"
				})
			} else {
				if (results[0].username === username && results[0].password === password) {
					res.send({
						status: 1,
						message: "login success"
					})
					req.session.username = username
				}
			}
		} else {
			res.send({
				status: 2,
				message: "server is wrong!!"
			})
		}
	})
}
exports.reg = function(req, res) {
	var username = req.body.username
	var password = req.body.password
	//INSERT INTO `user`( `username`, `password`) VALUES ('','')
	var query = "SELECT *FROM `user`WHERE `username` = '" + username + "'"
	var query1 = "INSERT INTO `user` ( `username` , `password` ) VALUES ('" + username + "', '" + password + "')"
	database.query(query, function(error, results) {
		if (error === null) {
			if (results.length === 0) {
				database.query(query1, function(error, results) {
					if (error === null) {
						req.session.username = username
						res.send({
							status: 0,
							message: "register is success"
						})
					} else {
						res.send({
							status: 3,
							message: "register is failed"
						})
					}
				})
			} else {
				res.send({
					status: 1,
					message: "username is exsit"
				})
			}
		} else {
			res.send({
				status: 2,
				message: "server is wrong!!"
			})
		}
	})
}
exports.logout = function(req, res) {
	if (req.session) {
		req.session.auth = null;
		res.clearCookie('auth');
		req.session.destroy(function() {});
	}
}