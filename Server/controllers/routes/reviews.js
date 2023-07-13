var express = require('express');
var router = express.Router();
var {pool} = require('../../models/db')


/* GET users listing. */
router.get('/', function(req, res, next) {
  let product_id = req.query.product_id;
  let page = req.query.page;
  let count = req.query.count;
  let sort = "";

  if (req.query.sort === 'newest') {
    sort = 'date';
  } else if (req.query.sort === 'helpful' || req.query.sort === 'relevant') {
    sort = 'helpfulness';
  }

  pool.query(
    `SELECT
      reviews.*,
      (
        SELECT json_agg(json_build_object('photo_id', photos.photo_id, 'url_link', photos.url_link))
        FROM photos
        WHERE photos.review_id = reviews.review_id
      ) AS photos
    FROM (
      SELECT
        *,
        ROW_NUMBER() OVER (ORDER BY ${sort}) AS row_number
      FROM reviews
      WHERE product_id = $1
    ) AS reviews
    WHERE row_number > ${(page - 1) * count}
    LIMIT $2`,
    [product_id, count],
    (err, result) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'An error occurred' });
      } else {
        const rows = result.rows;
        res.send({
          product: product_id,
          page: page,
          count: count,
          results: rows
        });
      }
    }
  );
});
module.exports = router;
