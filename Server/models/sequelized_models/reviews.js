const Sequelize = require("sequelize");
const db = require("../db.js");
module.exports = function (sequelize, DataTypes) {
  return db.define(
    "reviews",
    {
      review_id: {
        autoIncrement: true,
        autoIncrementIdentity: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "products",
          key: "product_id",
        },
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      summary: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      reviewer_name: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      recommended: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      response: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      helpfulness: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      reported: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      date: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      reviewer_email: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "reviews",
      schema: "public",
      timestamps: false,
      indexes: [
        {
          name: "reviews_pkey",
          unique: true,
          fields: [{ name: "review_id" }],
        },
      ],
    },
  );
};
