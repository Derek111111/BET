var bet = require("../models/bet.js");
var moment = require("moment");

// Create all our routes and set up logic within those routes where required.
var expenseRoute=function(app){
  app.get("/", function(req, res) {
  
  res.render("index");
     
});

app.get("/dash", function(req, res) {

    console.log("session: "+req);
    var condition = " WHERE Uid = " + req.session.userId;
    console.log("condition"+condition);
    bet.all(condition,function(data) {
    
      var hbsObject = {
        user: data,
        hbdashboard:true,
        uName :req.session.userName
    };
    res.render("index1", hbsObject);
 
  });
 
     
});

  
app.get("/userDashboard", function(req, res) {
   
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
 
app.get("/expense", function(req, res) {
    
  bet.allCategory(function(data) {
    var hbsObject = {
      user: data,
      uName :req.session.userName,
      hbexpense:true
    };
    
    res.render("index1", hbsObject);
 
  });
});


app.get("/reports", function(req, res) {
  
    var hbsObject = {
      hbreportsform:true,
      uName :req.session.userName
    };
    console.log(hbsObject);
    res.render("index1",hbsObject);
    
});


app.post("/reports", function(req, res) {
  console.log("session: "+req.session.userId);
  var condition =  " WHERE billDate between  '" + req.body.firstDate + "' and '" + req.body.secondDate + "' and Uid= " + req.session.userId + " group By category";
  
  var columns = " category,sum(amount) as sumAmount,spentAt";
  bet.findOne(columns,condition,function(data) {
      res.json({data});
   
    });
});

app.post("/expense", function(req, res) {
  //var createdAt = new Date();
  //createdAt = moment(createdAt).format('YYYY-MM-DD');
  bet.create(["amount", "category","spentAt", "remarks","paymentMode", "billDate","Uid"], [req.body.amount, req.body.category,req.body.spentAt, req.body.remarks,req.body.paymentMode,req.body.date1 ,req.session.userId], function(result) {
    // Send back the ID 
    res.json({ id: result.insertId });
  });
});

app.get('/logout',function(req,res){
  req.session.destroy(function(err) {
    if(err) {
      console.log(err);
    } else {
      res.redirect('/');
      //connection.end();
    }
  });
});
}
// Export routes for server.js to use.
module.exports = expenseRoute;
