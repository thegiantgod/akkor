var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://adminUser:adminUser@akkor.mqfuhxy.mongodb.net/Akkor");
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
 
db.once('open', () => {
  console.log("Connection Successful!");
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
