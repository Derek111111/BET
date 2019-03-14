
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

    var condition= " WHERE user_name = '" + req.body.username + "' AND email_id = '" + req.body.email + "'";
    
    
    console.log(condition);

    //check database for the inserted username and email before creating(no copies)
    

        if(req.body.email.includes("@") && req.body.email.includes(".")){//validate the email

        bet.alluser(condition,function(res) {

                console.log(res);
            if(res === null || res === undefined || res.length < 1){//check to make sure they are not a user

                //insert this data into the database as a new user
                newUser(req,res);
                result.redirect("/");

            }else{//uhoh this email was already used

                console.log("this email was already used");
                result.status(404).send({data:"NotValid"});//sends it to the fail method in bet1 for register POST

            } 
        });
        }else{

            console.log("not a valid email grrr");
            result.status(404).send({data:"EmailNotValid"});//let the user know to give a proper email

        }

    });


}


function logInFlag(req,result,userId){

    console.log("you pass this time, you can log in.");

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

    //query for inserting new user
    bet.createUser(["user_name", "email_id","password"], [req.body.username, req.body.email,req.body.password], function(result) {

        console.log("successfully made user");
        console.log(result);
        //result.json({action: "newuser"});//send them to login screen after making new user
        //req.session.userId=result.insertId;
        //console.log("Inserted id:"+result.insertId);
        //req.session.userName=req.body.username;
            
        //console.log(req.session.userName);

    });

}

module.exports = myroute;