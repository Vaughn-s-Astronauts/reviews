var DataTypes = require("sequelize").DataTypes;
var _characteristics = require("./characteristics");
var _photos = require("./photos");
var _products = require("./products");
var _reviews = require("./reviews");

function initModels(sequelize) {
  var characteristics = _characteristics(sequelize, DataTypes);
  var photos = _photos(sequelize, DataTypes);
  var products = _products(sequelize, DataTypes);
  var reviews = _reviews(sequelize, DataTypes);

  characteristics.belongsTo(products, { as: "product", foreignKey: "product_id"});
  products.hasMany(characteristics, { as: "characteristics", foreignKey: "product_id"});
  reviews.belongsTo(products, { as: "product", foreignKey: "product_id"});
  products.hasMany(reviews, { as: "reviews", foreignKey: "product_id"});
  characteristics.belongsTo(reviews, { as: "review", foreignKey: "review_id"});
  reviews.hasMany(characteristics, { as: "characteristics", foreignKey: "review_id"});
  photos.belongsTo(reviews, { as: "review", foreignKey: "review_id"});
  reviews.hasMany(photos, { as: "photos", foreignKey: "review_id"});

  return {
    characteristics,
    photos,
    products,
    reviews,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
