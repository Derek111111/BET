var express = require("express");
var session = require('express-session');


var router = express.Router();
var router = express.Router();

var connection = require("../config/connection.js");
var bet = require("../models/bet.js");
var moment = require("moment");


// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  
  res.render("index");
     
});

router.get("/dash", function(req, res) {

  //if (req == null || res  == null || req.session == null)
  //{
    console.log("session: "+JSON.stringify( req.session));
    var condition = " WHERE Uid = " + req.session.userId;
  //}
  
  bet.all(condition,function(data) {
    
    var hbsObject = {
      user: data,
      hbdashboard:true,
      uName :req.session.userName
    };
    res.render("index1", hbsObject);
 
  });
 
     
});

/*router.get("/dash/?:id", function(req, res) {
  sess=req.session;
  var condition = " WHERE Uid = " + req.params.id;
  console.log("id"+req.params.id);
  connection.query("select * from users where id=" + req.params.id,function(err, result) {
    if (err) {
      throw err;
    }
    bet.all(condition,function(data) {
      console.log("Name:"+sess.userName);
      //var uName=sess.userName;
      res.render("index1");
      //res.json(data);
   
    });
    
  });*/
  
router.get("/userDashboard", function(req, res) {
   
   var condition = " WHERE Uid = " + req.session.userId;
   bet.all(condition,function(data) {
     
     var hbsObject = {
       user: data,
       uName :req.session.userName,
       hbdashboard:true
     };
     
     res.render("index1", hbsObject);  
   });
    
 });
 
router.get("/expense", function(req, res) {
    
  bet.allCategory(function(data) {
    var hbsObject = {
      user: data,
      uName :req.session.userName,
      hbexpense:true
    };
    
    res.render("index1", hbsObject);
 
  });
});


router.get("/reports", function(req, res) {
  
    var hbsObject = {
      hbreportsform:true,
      uName :req.session.userName
    };
    console.log(hbsObject);
    res.render("index1",hbsObject);
    
});


router.post("/reports", function(req, res) {

  var condition =  " WHERE billDate between  '" + req.body.firstDate + "' and '" + req.body.secondDate + "' and Uid= " + req.session.userId + " group By category";
  
  var columns = " category,sum(amount) as sumAmount,spentAt";
  bet.findOne(columns,condition,function(data) {
      res.json({data});
   
    });
});

router.post("/expense", function(req, res) {
  var createdAt = new Date();
  createdAt = moment(createdAt).format('MM-DD-YYYY');
  bet.create(["amount", "category","spentAt", "remarks","paymentMode", "billDate","createdAt","Uid"], [req.body.amount, req.body.category,req.body.spentAt, req.body.remarks,req.body.paymentMode,req.body.date1 ,createdAt,req.session.userId], function(result) {
    // Send back the ID 
    res.json({ id: result.insertId });
  });
});

router.get('/logout',function(req,res){
  req.session.destroy(function(err) {
    if(err) {
      console.log(err);
    } else {
      res.redirect('/');
      //connection.end();
    }
  });
});

// Export routes for server.js to use.
module.exports = router;
