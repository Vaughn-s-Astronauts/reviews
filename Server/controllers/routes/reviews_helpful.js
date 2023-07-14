const express = require('express');
var router = express.Router();
var {pool} = require('../../models/db');

router.put('/', (req, res) => {
  let review_id = req.query.review_id;

  pool.query(`UPDATE reviews SET helpfulness = helpfulness + 1 WHERE review_id = ${review_id}`, (err, result) => {
    if (err) {
      console.log('STATUS: 204 NO CONTENT')
    } else {
      res.send('REVIEW UPDATED')
    }
  })
})

module.exports = router;
