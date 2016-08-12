'use strict';
module.exports = function(sequelize, DataTypes) {
  var Markers = sequelize.define('Markers', {
    // ** FROM ORIGINAL TABLE PARAMETERS
    // githubID: DataTypes.STRING(60),
    // lat: DataTypes.DECIMAL,
    // lng: DataTypes.DECIMAL,
    // preferences: DataTypes.STRING(80)
    name: DataTypes.STRING,
    lat: DataTypes.INTEGER,
    lng: DataTypes.INTEGER,
    title: DataTypes.STRING

  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Markers;
};