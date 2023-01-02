"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user_chat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // this.hasMany(models.message);
    }
  }
  user_chat.init(
    {
      // user_chat_id: DataTypes.INTEGER,
      user_id: {
        type: DataTypes.INTEGER,
        // references: { model: "user", key: "id" },
      },
      chat_id: {
        type: DataTypes.INTEGER,
        // references: { model: "chat", key: "id" },
      },
    },
    {
      sequelize,
      modelName: "user_chat",
      underscored: true,
    }
  );
  return user_chat;
};
