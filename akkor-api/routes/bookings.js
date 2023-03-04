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
  res.json(await bookings.find());
});

/* GET a booking by its id */ 
router.get('/:id', async function(req, res, next) {
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