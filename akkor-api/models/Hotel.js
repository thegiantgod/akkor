const mongoose = require('mongoose');

const HotelSchema = new mongoose.Schema({
    "name": {
        type: String,
    },
    "location": {
        type: String
    },
    "description": {
        type: String
    },
    "pictureList": {
        type: []
    }
});

module.exports = mongoose.model('hotel', HotelSchema);