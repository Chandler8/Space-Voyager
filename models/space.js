// Creating our User model
module.exports = function(sequelize, DataTypes) {
  let Users = sequelize.define("Users", {
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
      // Add an email field
      // Update user route
    
  });
  return Users;
};
