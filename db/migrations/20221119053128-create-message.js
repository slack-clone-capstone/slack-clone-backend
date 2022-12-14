"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("messages", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: { model: "users", key: "id" },
      },
      chat_id: {
        type: Sequelize.INTEGER,
        references: { model: "chats", key: "id" },
      },
      // user_chat_id: {
      //   type: Sequelize.INTEGER,
      //   references: { model: "user_chats", key: "user_chat_id" },
      // },
      is_edited: {
        type: Sequelize.BOOLEAN,
      },
      text: {
        type: Sequelize.TEXT,
      },
      date: {
        type: Sequelize.DATE,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("messages");
  },
};
