$(function(){

    //Event listener for when the user tries to submit a login
    $("#register-submit").on("click",function(){
        console.log("aaaaaaaaaaaa");
        //retrieve their inputs to pass to the database/check database with
        var newUser = {

            username: $("#username").val().trim(),
            email: $("#email").val().trim(),
            password: $("#password").val().trim()

        };

        //send post to server with userdata to check if exists
        $.ajax("/api/register_user", {

            type:"POST",
            data: newUser

        }).done(function(result){//data was validated, log them in

            console.log(result.action);
        }).fail(function(){//server found a problem with data

            console.log("ERROR: server could not validate data");

        });

    });

    //logging in button event listener
    $("#log-in").on("click", function(event){
        event.preventDefault();
        console.log("login tried");
        //object to pass to server to actually validate with
        var userToCheck = {

            //username: $("#username-login").val().trim(),
            email: $("#email-login").val().trim(),
            password: $("#password-login").val().trim()

        };
       
        console.log("===="+userToCheck);
        $.ajax("/log_in", {

            type: "GET",
            data: userToCheck//send data to check if the user exists

        }).done(function(){

            console.log("successful login");
            window.location.assign("/userDashboard");
            
        }).fail(function(){

            console.log("Something went wrong, maybe this user does not exist");

        });


    });

    $("#password-login").keyup(function(){
        $("#log-in").prop('disabled',false);
        
    });
    $(".login").on("click",function(){
        $("#log-in").prop('disabled', true);
    })
   
});