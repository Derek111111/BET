var express = require("express");
var session = require('express-session');
var cookieParser = require('cookie-parser');

var PORT = process.env.PORT || 3000;

var app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));
app.use(cookieParser());
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Set Handlebars.
var exphbs = require("express-handlebars");
app.use(session({resave:false,secret: '123456' , saveUninitialized: true}));
//var sess;
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


//var routes = require("./controllers/expenseController.js");
//var routes2 = require("./controllers/userController.js");

require("./controllers/expenseController.js")(app);
require("./controllers/userController.js")(app);

//app.use(routes);
//app.use(routes2);


app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
