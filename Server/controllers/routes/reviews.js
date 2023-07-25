var express = require("express");
var router = express.Router();
var sequelize = require("../../models/db");
const initModels =
  require("../../models/sequelized_models/init-models.js").initModels;
const models = initModels(sequelize);
const Reviews = models.reviews;
const Photos = models.photos;

router.get("/", function (req, res, next) {
  try {
    let product_id = req.query.product_id;
    let page = req.query.page;
    let count = req.query.count;
    let sort = "";

    if (req.query.sort === "newest") {
      sort = "date";
    } else if (req.query.sort === "helpful" || req.query.sort === "relevant") {
      sort = "helpfulness";
    }

    Reviews.findAll({
      where: { product_id: product_id },
      order: [[sort, "DESC"]],
      offset: (page - 1) * count,
      limit: count,
      include: {
        model: Photos,
        as: "photos",
        attributes: ["photo_id", "url_link"],
      },
    }).then((results) => {
      res.status(200).send({
        product: product_id,
        page: page,
        count: count,
        results: results, // Replace 'results' with 'reviews'
      });
    });
    // res.status(200).send({
    //   product: product_id,
    //   page: page,
    //   count: count,
    //   results: reviews, // Replace 'results' with 'reviews'
    // });
  } catch (err) {
    console.log("Error executing query:", err);
    res.status(500).json({ error: "An error occurred" });
  }
});

module.exports = router;
