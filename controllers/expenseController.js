var express = require("express");

var router = express.Router();
var connection = require("../config/connection.js");
var bet = require("../models/bet.js");



// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
 /* bet.all(function(data) {
    var hbsObject = {
      cats: data
    };
    console.log(hbsObject);
     });*/
     res.render("dashboard");
});

router.get("/expense", function(req, res) {
  connection.query("SELECT * FROM category;", function(err, data) {
    if (err) {
      return res.status(500).end();
    }

    res.render("index", { categories: data });
  });
});

router.get("/reports", function(req, res) {
  //var condition = "id = " + req.params.id;
  var condition = " 1";
  //console.log("condition" +condition);
  bet.all(condition,function(data) {
    var hbsObject = {
      reports: data
    };
    console.log(hbsObject);
    res.render("reports",hbsObject);
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

// Export routes for server.js to use.
module.exports = router;
