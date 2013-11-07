var config = require("../control/config.js")
var db = config.server("blog")
//route
var route = (function(){
	//登录
	function login(app){
		app.get("/",function(req,res,next){
			var stauts = config.url(req.url)
			res.render("index",{
				"title" : "welcome!",
				"data" : stauts
			})
		})
        app.post("/",function(req,res){
            var username = req.body.user, password = req.body.pass
            db.collection("users").find({"name" : username,"pass" : password}).toArray(function(err,item){
                if(err){
                    return res.redirect("/?status=0")
                }
                if(item.length !== 0){
                    req.session.user = username
                    return res.redirect("/home")
                }else{
                    //帐号和密码不匹配
                    return res.redirect("/?status=-1")
                }
            })
        })
	}
	//登录
	function home(app){
		app.post("/home",function(req,res){
            res.render("home",{
                "title" : "个人主页",
                "data" : "ite"
            })
		})
        app.get("/home",function(req,res){
            var username = req.session.user
            if(username){
                res.render("home",{
                    "title" : "个人主页",
                    "data" : username
                })
            }else{
                res.redirect("/?status=-1")
            }

        })
	}
    //注册
    function register(app){
        app.get("/reg",function(req,res){
            res.render("register",{
                "title" : "注册"
            })
        })
    }
    //找回密码
    function findPass(app){

    }

	return function(app) {
		login(app)
		home(app)
        register(app)
        findPass(app)
	}

})()

module.exports = route
