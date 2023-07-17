var express = require('express');
var router = express.Router();
var {pool} = require('../../models/db');


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
        console.log('Error executing query:', err);
        res.status(500).json({ error: 'An error occurred' });
      } else {
        const rows = result.rows;
        res.status(200)
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

router.post('/', (req, res) => {
  console.log('REQ BODY', req.body)
  let product_id = req.body.product_id;
  console.log('PRODUCT ID', product_id)
  let rating = req.body.rating;
  console.log('rating', rating)
  let summary = req.body.summary;
  console.log('summary', summary)
  let body = req.body.body;
  console.log('body', body)
  let recommended =  req.body.recommended;
  console.log('recommended', recommended)
  let name = req.body.name;
  console.log('name', name)
  let email = req.body.email;
  console.log('email', email)
  let photos = req.body.photos;
  console.log('photos', photos)
  let characteristics = req.body.characteristics
  let date = Date.now().toString();
  console.log('date', date)

  pool.query(
    'INSERT INTO reviews (product_id, rating, summary, body, reviewer_name, date, reviewer_email) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING review_id',
    [product_id, rating, summary, body, name, date, email],
    (err, result) => {
      if (err) {
        console.log('ERROR IN QUERY REVIEWS POST:');
        res.status(500).json({ error: 'Error inserting review into the database' });
      } else {
        if(photos !== undefined) {
        const review_id = result.rows[0].review_id;
        photos.map((photo) => {
          const url_link = photo.url_link;
          console.log(url_link)
          pool.query('INSERT INTO photos (url_link, review_id) VALUES ($1, $2)', [url_link, review_id], (err, result) => {
            if (err) {
              console.log('ERROR IN QUERY PHOTOS POST:', err);
              res.status(500).json({ error: 'Error inserting photo into the database' });
            } else {
              res.status(201).send('Successfully posted review and photo');
            }
          });
        });
      }
      }
    }
  );
  })



module.exports = router;
