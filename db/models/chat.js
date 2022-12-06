"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class chat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.user, { through: "user_chats" });
      this.belongsTo(models.workspace);
      this.hasMany(models.message);
    }
  }
  chat.init(
    {
      workspace_id: {
        type: DataTypes.INTEGER,
        reference: { model: "workspaces", key: "id" },
      },
      type: DataTypes.STRING,
      channel_name: DataTypes.STRING,
      channel_description: DataTypes.STRING,
      channel_private: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "chat",
      underscored: true,
    }
  );
  return chat;
};
