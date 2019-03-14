// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js");

var bet = {
  all: function(condition,cb) {
    orm.all("bills",condition, function(res) {
      cb(res);
    });
  },
  allCategory: function(cb) {
    orm.allCategory("category", function(res) {
      cb(res);
    });
  },
  findOne: function(columns,condition,cb) {
    orm.findOne("bills",columns,condition, function(res) {
      cb(res);
    });
  },
  // The variables cols and vals are arrays.
  create: function(cols, vals, cb) {
    orm.create("bills", cols, vals, function(res) {
      cb(res);
    });
  },
  createUser: function(cols, vals, cb) {
    orm.createUser("users", cols, vals, function(res) {
      cb(res);
    });
  },
  update: function(objColVals, condition, cb) {
    orm.update("bills", objColVals, condition, function(res) {
      cb(res);
    });
  },
  delete: function(condition, cb) {
    orm.delete("bills", condition, function(res) {
      cb(res);
    });
  },
  alluser: function(condition,cb) {
    orm.alluser("users",condition, function(res) {
      cb(res);
    });
  },
};
// Export the database functions for the controller (expenseController.js).
module.exports = bet;

