const express = require('express');
var router = express.Router();
var {pool} = require('../../models/db');


router.get('/', (req, res) => {
  let product_id = req.query.product_id;

  pool.query(`
  SELECT char_id, value FROM characteristics WHERE product_id = ${product_id};
  SELECT
   product_id, rating, recommended
   FROM reviews WHERE product_id = ${product_id}`, (err, result) => {
    if (err) {
      console.log('ERROR IN QUERY /METADATA GET ROUTE')
    } else {
      console.log('rows 0', result[0]);
      console.log('rows 1', result[1].rows);

      let reviewQueryResult = result[1].rows;
      let ratingsObj = {};
      let reccomendedCount = 0;

      reviewQueryResult.forEach((review) => {
        if (ratingsObj[review.rating] === undefined) {
          ratingsObj[review.rating] = 1;
        } else {
          ratingsObj[review.rating]++;
        }

        if (review.recommended === 'TRUE') {
          reccomendedCount++;
        }
      })
        res.send({
          product_id: product_id,
          ratings: ratingsObj,
          recommended: { 0: reccomendedCount},
          characteristics: {
            "Size": {
            "id": 14,
            "value": "4.0000"
            },
            "Width": {
            "id": 15,
            "value": "3.5000"
            },
            "Comfort": {
            "id": 16,
            "value": "4.0000"
            }
          }
        })
    }
  })

})



module.exports = router;
