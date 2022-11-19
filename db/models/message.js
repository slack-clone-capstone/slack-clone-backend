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
      this.belongsTo(models.user_chats, { foreignkey: "user_chat_id" });
      this.hasMany(models.attachment);
    }
  }
  message.init(
    {
      user_chat_id: {
        type: DataTypes.INTEGER,
        references: { model: "user_chats", key: "id" },
      },
      is_edited: DataTypes.BOOLEAN,
      text: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "message",
      underscored: "true",
    }
  );
  return message;
};
