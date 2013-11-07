/*
 * GET home page.
 */

var ajax = require("../control/ajaxController")

module.exports = function(app) {
	app.get('/', function(req, res) {
		console.log(req.session)
		if(req.session.username === undefined){
			res.render('login', {
				title: '登录'
			})
			return
		}
		res.render('index', {
			title: '主页',
			username:req.session.username
		});
	})
	/****************register****************/
	app.get('/reg', function(req, res) {
		res.render('reg', {
			title: '注册'
		})
	})
	app.post('/ajax/register',ajax.reg)

	/*******************login*****************/
	app.get('/login', function(req, res) {
		res.render('login', {
			title: '登录'
		})
	})
	app.post("/ajax/login", ajax.login)

	app.get('/logout', function(req, res) {});
	app.get('/post', function(req, res) {
		res.render('post', {
			title: '发表'
		});
	});
	app.post('/post', function(req, res) {});

	app.get('/family', function(req, res) {
		res.render('family', {
			title: '家族树'
		});
	});
};