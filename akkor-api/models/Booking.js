const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    "hotelId": {
        type: String,
    },
    "from": {
        type: Date
    },
    "to": {
        type: Date
    },
    "userId": {
        type: String
    }
});

module.exports = mongoose.model('booking', BookingSchema);