
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    user_name:{
      type: DataTypes.STRING,
      len: [1]
  },
    email_id: {
      type: DataTypes.STRING,
      len: [1]
  },
    password:{
      type: DataTypes.STRING,
      len: [1]
  }
  
  });
  return User;
};
