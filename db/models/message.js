"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.user, { foreignkey: "user_id" });
      this.belongsTo(models.chat, { foreignkey: "chat_id" });
      this.hasMany(models.attachment);
    }
  }
  message.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        references: { model: "users", key: "id" },
      },
      chat_id: {
        type: DataTypes.INTEGER,
        references: { model: "chats", key: "id" },
      },

      // user_chat_id: {
      //   type: DataTypes.INTEGER,
      //   references: { model: "user_chats", key: "user_chat_id" },
      // },
      is_edited: DataTypes.BOOLEAN,
      text: DataTypes.TEXT,
      date: DataTypes.DATE,
      read: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: true,
      },
      unread: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "message",
      underscored: "true",
    }
  );
  return message;
};
