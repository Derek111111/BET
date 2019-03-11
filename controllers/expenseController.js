var express = require("express");

var router = express.Router();
var router = express.Router();

var connection = require("../config/connection.js");
var bet = require("../models/bet.js");
var moment = require("moment");


// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  res.render("index");
     
});

router.get("/api/dash", function(req, res) {
 /* var condition = " WHERE Uid = 1";
  bet.all(condition,function(data) {
    
    var hbsObject = {
      user: data,
      hbdashboard:true
    };
    //res.render("index", hbsObject);
    res.json(data);
 
  });*/
  var hbsObject = {
      hbhome:true
    };
     res.render("index1", hbsObject);
});

router.get("/dashboard", function(req, res) {

   var condition = " WHERE Uid = 1";
   bet.all(condition,function(data) {
     
     var hbsObject = {
       user: data,
       hbdashboard:true
     };
     
     res.render("index1", hbsObject);  
   });
    
 });
 
router.get("/expense", function(req, res) {
  /*connection.query("SELECT * FROM category;", function(err, data) {
    if (err) {
      return res.status(500).end();
    }
    var hbsObject = {
      expense: data,
      hbexpense:true
    };
    res.render("index", hbsObject);
  });*/
  
  bet.allCategory(function(data) {
    var hbsObject = {
      expense: data,
      hbexpense:true
    };
    //console.log(JSON.stringify(data));
    res.render("index1", hbsObject);
 
  });
});

router.get("/income", function(req, res) {
  
    var hbsObject = {
      //income: data,
      hbincome:true
    };
    res.render("index1", hbsObject);
 
});

router.get("/reports", function(req, res) {
  
    var hbsObject = {
      hbreportsform:true
    };
    console.log(hbsObject);
    res.render("index1",hbsObject);
    
});


router.post("/reports", function(req, res) {

  var condition =  " WHERE createdAt between  '" + req.body.firstDate + "' and '" + req.body.secondDate + "' and Uid= " + req.body.id + " group By category";
  
  var columns = " category,sum(amount) as sumAmount,spentAt";
  bet.findOne(columns,condition,function(data) {
      res.json({data});
   
    });
});

router.post("/expense", function(req, res) {
  var createdAt = new Date();
  createdAt = moment(createdAt).format('YYYY-MM-DD');
  bet.create(["amount", "category","spentAt", "remarks","paymentMode", "billDate","createdAt","Uid"], [req.body.amount, req.body.category,req.body.spentAt, req.body.remarks,req.body.paymentMode,req.body.date1 ,createdAt,2], function(result) {
    // Send back the ID 
    res.json({ id: result.insertId });
  });
});

router.put("/api/expense/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  bet.update(
    {
      sleepy: req.body.sleepy
    },
    condition,
    function(result) {
      if (result.changedRows === 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      }
      res.status(200).end();

    }
  );
});


/*router.get("/reports/user", function(req, res) {
  console.log(req.query);
  var hbsObject = {
    reports: req.query.data[0],
    hbreports:true
    
  };
  console.log(hbsObject);
  res.render("index",hbsObject);
  
});*/

// Export routes for server.js to use.
module.exports = router;
