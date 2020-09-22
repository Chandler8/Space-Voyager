// Creating our User model
module.exports = function(sequelize, DataTypes) {
  let SpaceVisitors = sequelize.define("SpaceVisitors", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
          len: [1,20],
          notEmpty: {
          args: true,
          msg: "Please provide your first name"
          },
      }
    },

    lastname: {
     type: DataTypes.STRING,
     allowNull: false,
     validate: {
       len: [1, 20],
       notEmpty: {
         args: true,
         msg: "Please provide your lastname"
       },
     }
    } 
      
    
  });
  return SpaceVisitors;
};
