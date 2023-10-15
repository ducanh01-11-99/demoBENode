var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json( { title: 'Express12345' });
});

module.exports = router;
