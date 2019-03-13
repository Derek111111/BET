
var connection = require("../config/connection");
var orm = require("./../config/orm");
var bet = require("../models/bet.js");

//GET for logging in users
var myroute= function(app){
    app.get("/log_in",function(req,result){
    
        var condition = " WHERE email_id =  '" + req.query.email +  "' AND password = '" + req.query.password +"'";
    
    //check database for the inserted username and email before creating(no copies)
    bet.alluser(condition,function(res) {
    
        console.log(res);

        if(res === null || res === undefined || res.length < 1){//found no user, no login allowed

            result.status(404).send({data:"NotValid"});

        }else{//ookk user found, log in
            
            //calling the query to log the user in
            userId = res[0].id;

           // app.use(session({userId:res[0].id,userName: res[0].user_name}));

            req.session.userId=res[0].id;
            req.session.userName=res[0].user_name;
            
            console.log(req.session.userId);
            result.redirect("/userDashboard");
            logInFlag(req,result,userId) ; 
        }

    });

       
    });   

//POST for user register checking and creation
app.post("/api/register_user",function(req, result){

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
}

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

        //result.json({action: "login", userId: userId});

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

module.exports = myroute;