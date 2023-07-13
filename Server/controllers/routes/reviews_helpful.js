const express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
  res.send('all good')
})


module.exports = router;
