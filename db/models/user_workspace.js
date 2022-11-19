"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user_workspace extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user_workspace.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        references: { model: "users", key: "id" },
      },
      workspace_id: {
        type: DataTypes.INTEGER,
        references: { model: "workspaces", key: "id" },
      },
    },
    {
      sequelize,
      modelName: "user_workspace",
      underscored: true,
    }
  );
  return user_workspace;
};
