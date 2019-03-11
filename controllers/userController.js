var express = require("express");

var router = express.Router();

var connection = require("../config/connection");
var orm = require("./../config/orm");
var usersTable = "users";

//GET for logging in users
router.get("/api/log_in",function(req,res){
    ///res.render("index1");
    userValidate(req,res);

});


//POST for user register checking and creation
router.post("/api/register_user",function(req, result){

    console.log(req.body);

    var queryString = "SELECT * FROM users ";
    queryString += "WHERE user_name = ? ";
    queryString += "AND email_id = ?";

    var solutionsObj = [req.body.username,req.body.email];

    console.log(queryString);

    //check database for the inserted username and email before creating(no copies)
    connection.query(queryString,solutionsObj,function(err,res){

        if(err){throw err};

        console.log(res);

        if(res === null || res === undefined || res.length < 1){//no user with this info found, create the account

            //inser this data into the database as a new user
            newUser(req,result);

        }else{//okay these users have been used before, see if they are a current user trying to log in

            //searching username, email and password all in one to see if they are logging in
            result.status(404).send({data:"NotValid"});//sends it to the fail method in bet1 for register POST

        }

    });


});

function logInFlag(req,result,userId){

    console.log("you pass this time idiot, you can log in.");

    //UPDATE QUERY FOR LOGIN FLAG
    var updateQuery = "UPDATE users ";
    updateQuery += "SET logged_in = true ";
    updateQuery += "WHERE user_name = ? AND email_id = ? AND password = ?";

    var solutionsObj = [req.body.username, req.body.email, req.body.password];
    //RUN THE LOGIN FLAG( LOGIN QUERY )
    connection.query(updateQuery, solutionsObj, function(err,res){

        if(err){throw err};

        console.log(res);

        console.log("Successfully logged them in!");

        result.json({action: "login", userId: userId});

    }); 

}

function userValidate(req,result){

    console.log("logging you in");
    var solutionsObj = [
        req.query.email,
        req.query.password
    ];
    
    //checking if its a real user
    connection.query("SELECT * FROM users WHERE email_id = ? AND password = ?", solutionsObj, function(err,res){

        if(err){throw err};
        console.log(res);

        if(res === null || res === undefined || res.length < 1){//found no user, no login allowed

            result.status(404).send({data:"NotValid"});

        }else{//ookk user found, log in
            
            //calling the query to log the user in
            userId = res[0].id;
           logInFlag(req,result,userId);

        }

    });

}

function newUser(req,result){

    console.log("this user is not taken, create a new account");

    //set up the query
    var queryString = "INSERT INTO users (";
    queryString += "user_name, email_id, password" + ") ";
    queryString += "VALUES ?";

    console.log(queryString);
    
    //get the data to insert
    var values = [
        [req.body.username,req.body.email,req.body.password]
    ];

    //query for inserting new user
    connection.query(queryString,[values],function(err,res){

        if(err){throw err};
        console.log("successfully made user");
        console.log(res);
        result.json({action: "newuser"});//send them to login screen after making new user

    });

}

module.exports = router;