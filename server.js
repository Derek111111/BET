var express = require("express");

var PORT = process.env.PORT || 3000;

var app = express();

// Requiring our models for syncing
//var db = require("./models");

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//require("./routes/expense-api-routes.js")(app);
//require("./routes/html-routes.js")(app);
var routes = require("./controllers/expenseController.js");
var routes2 = require("./controllers/userController.js");

app.use(routes);
app.use(routes2);


app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
//db.sequelize.sync({ }).then(function() {
 // app.listen(PORT, function() {
   // console.log("App listening on PORT " + PORT);
  //});
//});
