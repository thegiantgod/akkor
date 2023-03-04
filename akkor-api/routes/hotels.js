var express = require('express');
var router = express.Router();
const common = require('./commonFunctions');
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
  // #swagger.tags = ['Hotel managing']
  res.json(await hotels.find());
});

/* GET a hotel by its id */ 
router.get('/:id', async function(req, res, next) {
  // #swagger.tags = ['Hotel managing']
  try {
    const value = await hotels.findById(req.params.id);
    res.json(value);
  } catch (error) {
    res.status(404);
    res.send("There is no hotel with this id.")
  }
  
});

/* creates a hotel */
router.post('/', common.authentificateToken, common.isAdmin, async function(req, res, next) {
  // #swagger.tags = ['Hotel managing']
  /* #swagger.parameters['hotel'] = {
        in: 'body',
        description: 'All of the body below.',
        required: true,
        type: 'object',
        format: 'json',
        schema: {
          name: "HotelName",
          location: "Paris",
          description: "Just a hotel",
          pictureList: ["blob1", "blob2"]
        }
  } */

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
router.delete('/:id', common.authentificateToken, common.isAdmin, hotelExists, function (req, res, next) {
  // #swagger.tags = ['Hotel managing']
  const newId = req.params.id;

  let query = { _id : newId}
  hotels.deleteOne(query, (err, obj) => {
    if (err) res.status(500);
  });
  res.send("This hotel was succesfully deleted.");
  return;

});

/* updates a hotel */
router.put("/:id", common.authentificateToken, common.isAdmin, hotelExists, function (req, res, next) {
  // #swagger.tags = ['Hotel managing']
  /* #swagger.parameters['hotel'] = {
        in: 'body',
        description: 'at least one of the variables in the body (ex : if you only want to update the name, you can just send the name in the body).',
        required: true,
        type: 'object',
        format: 'json',
        schema: {
          name: "HotelName",
          location: "Paris",
          description: "Just a hotel",
          pictureList: ["blob1", "blob2"]
        }
  } */

  let query = { _id : req.params.id};

  hotels.updateOne(query, req.body, (err, res) => {
    if (err) res.status(500).send("Error");
  })
  res.status(200);
  res.send("Hotel updated.");
});

module.exports =   { router, hotelExists };