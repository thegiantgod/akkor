const { describe } = require("mocha");
const { connectDB, disconnectDB } = require('../dbConnection.js');


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