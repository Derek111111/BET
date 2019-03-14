// Set up MySQL connection.
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "p1us8ottbqwio8hv.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
  port: 3306,
  user: "y54zw1dxwm24yri8",
  password: "eqe98wz92ng8uhz7",
  database: "a1vmxm3ork5u6cdd"
  
});

// Make connection.
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// Export connection for our ORM to use.
module.exports = connection;
