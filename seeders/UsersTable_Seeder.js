'use strict';
var sha1 = require('sha1');

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
        name: 'Todd the Builder',
        email: 'todd@codingpartners.com',
        githubID: 'TGreen97',
        languages: 'jQuery',
        rating: '2',
        userName: 'TG747',
        password: sha1('password'),

      }
      ], {});
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('Users', null, {});
  }
};
