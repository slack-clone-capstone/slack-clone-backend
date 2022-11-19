"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("workspaces", [
      {
        name: "Rocket Academy Capstone",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "The Most Awesome Gang",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("workspaces", null, {
      // in order to reset auto increment after dropping table
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  },
};
