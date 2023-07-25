const Sequelize = require("sequelize");
const db = require("../db.js");
module.exports = function (sequelize, DataTypes) {
  return db.define(
    "products",
    {
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "products",
      schema: "public",
      timestamps: false,
      indexes: [
        {
          name: "products_pkey",
          unique: true,
          fields: [{ name: "product_id" }],
        },
      ],
    },
  );
};
