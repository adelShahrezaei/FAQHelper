const express = require("express")
const bodyParser = require("body-parser")

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

var routes =require("./routes/routes.js")(app);

var server = app.listen(3000, function(){
	console.log("listen on port %s...", server.address().port);
})