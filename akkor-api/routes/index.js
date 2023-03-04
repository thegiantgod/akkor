var express = require('express');
var router = express.Router();
const { connectDB } = require('../dbConnection');


!(process.env.NODE_ENV?.trim() === 'test') && connectDB();


module.exports = router;
