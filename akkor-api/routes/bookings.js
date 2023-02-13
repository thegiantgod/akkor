var express = require('express');
var router = express.Router();
const bookings = require('../models/Booking');

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
router.post('/', async function(req, res, next) {
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
router.delete('/:id', function (req, res, next) {
  const newId = req.params.id;
  if (bookings.findById(newId) !== null) {
    
    let query = { _id : newId}
    bookings.deleteOne(query, (err, obj) => {
      if (err) res.status(500);
    });
    res.send("This booking was succesfully deleted.");
    return;
  }
  res.status(404).send("Error : there is no booking with this id to delete !");
});

/* updates a booking */
router.put("/:id", function (req, res, next) {
  
  let query = { _id : req.params.id};
  if(bookings.findById(req.params.id) !== null) {
    bookings.updateOne(query, req.body, (err, res) => {
      //if (err) res.status(500);
      return
    })
    res.status(200);
    res.send("Booking updated.");
    return;
  }
  res.status(404).send("Error : there is no booking with this id to update !");
});

module.exports = router;