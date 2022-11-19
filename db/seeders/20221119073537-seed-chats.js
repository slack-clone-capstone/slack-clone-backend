"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("chats", [
      {
        workspace_id: 1,
        type: "channel",
        channel_name: "Volley Ball Gang",
        channel_description: "Every 1st Sat of the month",
        channel_private: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        workspace_id: 1,
        type: "channel",
        channel_name: "PTBC3-S1",
        channel_description: "Rocket Academy Section 3-1",
        channel_private: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        workspace_id: 1,
        type: "direct message",
        channel_name: null,
        channel_description: null,
        channel_private: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        workspace_id: 1,
        type: "direct message",
        channel_name: null,
        channel_description: null,
        channel_private: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("chats", null, {
      // in order to reset auto increment after dropping table
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  },
};
