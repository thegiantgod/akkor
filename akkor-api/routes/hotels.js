var express = require('express');
var router = express.Router();
const hotels = require('../models/Hotel');

const hotelExists = async (req, res, next) => {
  const result = await hotels.findById(req.params.id);
    if (!result) { 
      res.status(404).send("Error : there is no hotel with this id !");
    } else {
      next()
    }
  
}

/* GET hotels listing. */
router.get('/', async function(req, res, next) {
  res.json(await hotels.find());
});

/* GET a hotel by its id */ 
router.get('/:id', async function(req, res, next) {
  try {
    const value = await hotels.findById(req.params.id);
    res.json(value);
  } catch (error) {
    res.status(404);
    res.send("There is no hotel with this id.")
  }
  
});

/* creates a hotel */
router.post('/', async function(req, res, next) {
  try {
    const newHotel = await hotels.create({
      ...req.body
    });
    res.status(201);
    res.json(newHotel);
  } catch (error) {
    res.status(400);
    res.json(error.errors);
  }
});

/* deletes a hotel */
router.delete('/:id', hotelExists, function (req, res, next) {
  const newId = req.params.id;

  let query = { _id : newId}
  hotels.deleteOne(query, (err, obj) => {
    if (err) res.status(500);
  });
  res.send("This hotel was succesfully deleted.");
  return;

});

/* updates a hotel */
router.put("/:id", hotelExists, function (req, res, next) {
  
  let query = { _id : req.params.id};

  hotels.updateOne(query, req.body, (err, res) => {
    if (err) res.status(500).send("Error");
  })
  res.status(200);
  res.send("Hotel updated.");
});

module.exports =   { router, hotelExists };