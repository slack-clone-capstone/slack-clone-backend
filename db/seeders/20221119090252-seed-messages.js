"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("messages", [
      {
        // user_chat_id: 1,
        user_id: 1,
        chat_id: 1,
        is_edited: false,
        text: "Free on 27th?",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        // user_chat_id: 2,
        user_id: 2,
        chat_id: 1,
        is_edited: false,
        text: "yasss",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        // user_chat_id: 3,
        user_id: 3,
        chat_id: 1,
        is_edited: false,
        text: "Noooo i cmi ",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        // user_chat_id: 4,
        user_id: 1,
        chat_id: 2,
        is_edited: false,
        text: "What to do for capstone?",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        // user_chat_id: 5,
        user_id: 4,
        chat_id: 2,
        is_edited: false,
        text: "Uh.... idk??",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        // user_chat_id: 6,
        user_id: 3,
        chat_id: 3,
        is_edited: false,
        text: "Wanna go HDL?",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        // user_chat_id: 7,
        user_id: 4,
        chat_id: 3,
        is_edited: false,
        text: "sureee anytime",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        // user_chat_id: 6,
        user_id: 3,
        chat_id: 3,
        is_edited: false,
        text: "ok tonight 7pm",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        // user_chat_id: 8,
        user_id: 5,
        chat_id: 3,
        is_edited: false,
        text: "the usual outlet?",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        // user_chat_id: 9,
        user_id: 4,
        chat_id: 4,
        is_edited: false,
        text: "Happy Birthday Woman!! ",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        // user_chat_id: 10,
        user_id: 5,
        chat_id: 4,
        is_edited: false,
        text: "Thanksss",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("messages", null, {
      // in order to reset auto increment after dropping table
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  },
};
