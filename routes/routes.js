let appRouter = function (app){


	app.get("/", function(req, res) {
    res.send("Hello World");
	});

	app.get('/list', function(req, res){
		
	})
}
module.exports = appRouter; 