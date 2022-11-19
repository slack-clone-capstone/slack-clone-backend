"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("user_workspaces", [
      {
        user_id: 1,
        workspace_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 2,
        workspace_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 3,
        workspace_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 4,
        workspace_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 5,
        workspace_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 1,
        workspace_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 2,
        workspace_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 3,
        workspace_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("user_workspaces", null, {
      // in order to reset auto increment after dropping table
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  },
};
