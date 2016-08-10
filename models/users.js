'use strict';
module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define('Users', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    githubID: DataTypes.STRING,
    languages: DataTypes.STRING,
    rating: DataTypes.INTEGER,
    userName: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Users;
};