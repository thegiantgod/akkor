const { describe } = require("mocha");

describe("User test file", () => {
    require('./users.test')
})

describe("Hotel test file", () => {
    require('./hotels.test')
})

describe("Booking test file", () => {
    require('./bookings.test')
})