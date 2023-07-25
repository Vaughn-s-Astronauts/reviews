const Sequelize = require("sequelize");
const db = require("../db.js");
module.exports = function (sequelize, DataTypes) {
  return db.define(
    "photos",
    {
      photo_id: {
        autoIncrement: true,
        autoIncrementIdentity: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      url_link: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      review_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "reviews",
          key: "review_id",
        },
      },
    },
    {
      sequelize,
      tableName: "photos",
      schema: "public",
      timestamps: false,
      indexes: [
        {
          name: "photos_pkey",
          unique: true,
          fields: [{ name: "photo_id" }],
        },
      ],
      as: "photos",
    },
  );
};
