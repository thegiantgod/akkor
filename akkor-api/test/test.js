const { describe } = require("mocha");
const { connectDB, disconnectDB } = require('../dbConnection.js');

let body = {
    hotelId: "test",
    from: Date.UTC(1985, 5),
    to: Date.now(),
    userId: "idd"
}

let hotelBody = {
    name: "test",
    location: "grdhhhthh",
    description: "TestGRGDHDDH",
    pictureList: ['1', '2']
}

let userBody = {
    email: "test",
    pseudo: "grdhhhthh",
    password: "TestGRGDHDDH",
    role: "employee"
}

before("Setting up DB connection", () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            connectDB().then(async () => {
            
                resolve()
            })
        }, 500);
    }
    );
});

describe("User test file", () => {
    require('./users.test')
})

describe("Hotel test file", () => {
    require('./hotels.test')
})

describe("Booking test file", () => {
    require('./bookings.test')
})

after(() => {
    disconnectDB()
  });