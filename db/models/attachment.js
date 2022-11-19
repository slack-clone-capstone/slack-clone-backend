"use strict";
const { Model } = require("sequelize");
const message = require("./message");
module.exports = (sequelize, DataTypes) => {
  class attachment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.message, { foreignkey: "message_id" });
    }
  }
  attachment.init(
    {
      file_url: DataTypes.STRING,
      message_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "messages",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "attachment",
      underscored: true,
    }
  );
  return attachment;
};
