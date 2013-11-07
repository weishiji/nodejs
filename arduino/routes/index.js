


module.exports = function(app){
	app.get("/",function(req,res){
		res.render("keydown",{
			"title" : "键盘控制LED"
		})
	})
}