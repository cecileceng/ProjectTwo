'use strict';
module.exports = function(sequelize, DataTypes) {
  var Markers = sequelize.define('Markers', {
    githubID: DataTypes.STRING(60),
    lat: DataTypes.DECIMAL,
    lng: DataTypes.DECIMAL,
    preferences: DataTypes.STRING(80)
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Markers;
};