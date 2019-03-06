
module.exports = function(sequelize, DataTypes) {
    var Category = sequelize.define("Category", {
        category_name: {
            type: DataTypes.STRING,
            len: [1]
        }
        
    });
    return Category;
  };