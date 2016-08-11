'use strict';
module.exports = function(sequelize, DataTypes) {
  var Markers = sequelize.define('Markers', {
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