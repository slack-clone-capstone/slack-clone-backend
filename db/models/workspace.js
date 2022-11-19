"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class workspace extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.user, { through: "user_workspace" });
      this.hasMany(models.chat);
    }
  }
  workspace.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "workspace",
      underscored: true,
    }
  );
  return workspace;
};
