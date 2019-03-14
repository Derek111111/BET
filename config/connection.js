
var mysql = require("mysql");
require("dotenv").config();

var connection;
if (process.env.JAWSDB_URL) {
    // Database is JawsDB on Heroku
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    // Database is local
    connection = mysql.createConnection({
        port: 3306,
        host: 'localhost',
        user: 'root',
        password: "Min143Sag",
        database: 'bet_db'
    })
};
connection.connect();

module.exports = connection;