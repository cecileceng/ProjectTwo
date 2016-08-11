'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

    */
    return queryInterface.bulkInsert('Markers', [{
      githubID: 'TGreen97',
      lat: '30.3548766',
      lng: '-97.7362257',
      preferences: 'jQuery, Sequelize, Node',
    }], {});

  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

    */
    return queryInterface.bulkDelete('Markers', null, {});

  }
};
