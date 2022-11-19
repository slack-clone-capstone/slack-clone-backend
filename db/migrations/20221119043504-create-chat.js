"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("chats", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      workspace_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "workspaces", key: "id" },
      },
      type: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      channel_name: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      channel_description: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      channel_private: {
        allowNull: true,
        type: Sequelize.BOOLEAN,
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
    await queryInterface.dropTable("chats");
  },
};
