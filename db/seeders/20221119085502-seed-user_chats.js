"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("user_chats", [
      {
        user_id: 1,
        chat_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 2,
        chat_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 3,
        chat_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 1,
        chat_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 4,
        chat_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 3,
        chat_id: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 4,
        chat_id: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 5,
        chat_id: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 4,
        chat_id: 4,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 5,
        chat_id: 4,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("user_chats", null, {
      // in order to reset auto increment after dropping table
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  },
};
