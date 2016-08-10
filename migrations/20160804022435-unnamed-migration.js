'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return queryInterface.createTable('Users', {
        id:{
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        email:{
          allowNull: false,
          type: Sequelize.STRING(50)
        },
        password:{
          allowNull: false,
          type: Sequelize.STRING(40),
        },
        createdAt:{
          type: sequelize.DATE
        },
        updateAt:{
          type: sequelize.DATE
        }
    });


  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return queryInterface.dropTable('Users');
  }


};


