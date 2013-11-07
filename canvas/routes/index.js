
/*
 * GET home page.
 */
module.exports = function(app){
	app.get("/",function(req,res){
		res.render("index",{
			"title" : "canvas",
		})
	})
	app.get("/video",function(req,res){
		res.render("video",{
			"title" : "video and canvas"
		})
	})
}
