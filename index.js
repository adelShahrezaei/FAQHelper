const express = require("express")
const bodyParser = require("body-parser")

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

var routes =require("./routes/routes.js")(app);

const PORT = process.env.PORT || 8080;

var server = app.listen(PORT, function(){
	console.log("listen on port %s...", server.address().port);
})