const express = require('express');
var router = express.Router();
var {pool} = require('../../models/db');

router.put('/:review_id/helpful', (req, res) => {
  let review_id = req.params.review_id;
  console.log(review_id)

  pool.query(`UPDATE reviews SET helpfulness = (
    SELECT helpfulness + 1 FROM reviews WHERE review_id = $1
  ) WHERE review_id = $1`, [review_id], (err, result) => {
    if (err) {
      console.log('STATUS: 204 NO CONTENT')
    } else {
      res.send('REVIEW UPDATED')
    }
  })
})

module.exports = router;
