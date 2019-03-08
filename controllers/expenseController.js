var express = require("express");

var router = express.Router();
var connection = require("../config/connection.js");
var bet = require("../models/bet.js");

var reportdata;

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {

     var hbsObject = {
      hbhome:true
    };
     res.render("index", hbsObject);
});

router.get("/expense", function(req, res) {
  connection.query("SELECT * FROM category;", function(err, data) {
    if (err) {
      return res.status(500).end();
    }
    var hbsObject = {
      expense: data,
      hbexpense:true
    };
    res.render("index", hbsObject);
  });
});

router.get("/income", function(req, res) {
  
    var hbsObject = {
      //income: data,
      hbincome:true
    };
    res.render("index", hbsObject);
 
});

router.get("/reports", function(req, res) {
  
    var hbsObject = {
      hbreportsform:true
    };
    console.log(hbsObject);
    res.render("index",hbsObject);
    
});


router.post("/reports", function(req, res) {

  var condition =  " WHERE createdAt between  '" + req.body.firstDate + "' and '" + req.body.secondDate + "' and Uid= " + req.body.id + " Order By category desc";
  
  //var condition =  " WHERE createdAt between  '2019-03-06 16:01:47' and '2019-03-07 16:01:47' and Uid= 2 Order By category desc";
  
  bet.all(condition,function(data) {
    /*var hbsObject = {
      reports: data,
      hbreports:true
      
    };*/
    //reportdata=data;
    //res.setHeader('Content-type', 'text/html');
    //console.log(hbsObject);
    //res.redirect("/reports/user");
    //res.render("reports",hbsObject);
    res.json({data});
   //  res.json({ id: data.insertId });
    console.log("*********");
    });
});

router.post("/expense", function(req, res) {
  var createdAt = new Date();
  var updatedAt = new Date();
  bet.create(["amount", "category","spentAt", "remarks","paymentMode", "billDate","createdAt","updatedAt"], [req.body.amount, req.body.category,req.body.spentAt, req.body.remarks,req.body.paymentMode,req.body.date1 ,createdAt,updatedAt], function(result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

router.put("/api/cats/:id", function(req, res) {
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
