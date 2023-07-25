const Sequelize = require("sequelize");
const db = require("../db.js");
module.exports = function (sequelize, DataTypes) {
  return db.define(
    "characteristics",
    {
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "products",
          key: "product_id",
        },
      },
      char_id: {
        type: DataTypes.INTEGER,
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
      value: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "characteristics",
      schema: "public",
      timestamps: false,
    },
  );
};
