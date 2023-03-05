var express = require('express');
var router = express.Router();
const bookings = require('../models/Booking');
const common = require('./commonFunctions');
const users = require('../models/User');
const hotels = require('../models/Hotel');


const bookingExists = async (req, res, next) => {
  const result = await bookings.findById(req.params.id);
    if (!result) { 
      res.status(404).send("Error : there is no booking with this id !");
    } else {
      next()
    }
  
}

const userAndHotelExists = async (req, res, next) => {
  const user = await users.findById(req.body.userId)
  const hotel = await hotels.findById(req.body.hotelId)
  if (!user) {
    res.status(400).send("Error : this user doesn't exists")
  }
  if (!hotel) {
    res.status(400).send("Error : this hotel doesn't exists")
  }
  next()
}

/* GET bookings listing. */
router.get('/', async function(req, res, next) {
  // #swagger.tags = ['Booking managing']
  res.json(await bookings.find());
});

/* GET a booking by its id */ 
router.get('/:id', async function(req, res, next) {
  // #swagger.tags = ['Booking managing']
  try {
    const value = await bookings.findById(req.params.id);
    res.json(value);
  } catch (error) {
    res.status(404);
    res.send("There is no booking with this id.")
  }
  
});

/* creates a booking */
router.post('/', common.authentificateToken, userAndHotelExists, async function(req, res, next) {
  // #swagger.tags = ['Booking managing']
  /* #swagger.parameters['booking'] = {
        in: 'body',
        description: 'All of the body below.',
        required: true,
        type: 'object',
        format: 'json',
        schema: {
          hotelID: "g5sg4sh4s9g4s9",
          from: "02/08/2023",
          to: "02/09/2023",
          userId: "dh4h64dh4d6"
        }
  } */

  try {
    const newBooking = await bookings.create({
      ...req.body
    });
    res.status(201);
    res.json(newBooking);
  } catch (error) {
    res.status(400);
    res.json(error.errors);
  }
});

/* deletes a booking */
router.delete('/:id', common.authentificateToken, bookingExists, function (req, res, next) {
  // #swagger.tags = ['Booking managing']
  const newId = req.params.id;
  let query = { _id : newId}
  bookings.deleteOne(query, (err, obj) => {
    if (err) res.status(500);
  });
  res.send("This booking was succesfully deleted.");
  return;
});

/* updates a booking */
router.put("/:id", common.authentificateToken, bookingExists, function (req, res, next) {
  // #swagger.tags = ['Booking managing']
  /* #swagger.parameters['booking'] = {
        in: 'body',
        description: 'at least one of the variables in the body (ex : if you only want to update from, you can just send from in the body).',
        required: true,
        type: 'object',
        format: 'json',
        schema: {
          hotelID: "g5sg4sh4s9g4s9",
          from: "02/08/2023",
          to: "02/09/2023",
          userId: "dh4h64dh4d6"
        }
  } */

  let query = { _id : req.params.id};

  bookings.updateOne(query, req.body, (err, res) => {
    //if (err) res.status(500);
    return
  })
  res.status(200);
  res.send("Booking updated.");
  return;
});

module.exports = router;