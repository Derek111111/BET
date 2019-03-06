
module.exports = function(sequelize, DataTypes) {
    var Bill = sequelize.define("Bill", {
    amount:{
            type:DataTypes.DECIMAL,
            allowNull: false,
            
    },
        category:{
            type: DataTypes.STRING,
            len: [1]
        },
        spentAt:{
            type:DataTypes.STRING,
            len: [1]
        } ,
        remarks:{
            type: DataTypes.STRING,
            len: [1]
        },
        paymentMode:{
            type:DataTypes.STRING,
            len: [1]
        },
        billDate:{
            type:DataTypes.DATE,
            defaultValue:DataTypes.NOW 
            
        }
    });
    return Bill;
  };