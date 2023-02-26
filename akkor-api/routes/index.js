var express = require('express');
var router = express.Router();
const { connectDB } = require('../dbConnection');


!(process.env.NODE_ENV?.trim() === 'test') && connectDB();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
