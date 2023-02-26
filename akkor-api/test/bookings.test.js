const assert = require('assert').strict;
const supertest = require("supertest")
const app = require('../app.js').app;
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

let booking = null
let hotel = null
let user = null

before("Setting up DB connection", () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            connectDB().then(async () => {
            
                await supertest(app).post("/hotels/").send(hotelBody).expect(201).then(response => {
                    hotel = response.body;
                    body.hotelId = hotel._id;
                })

                await supertest(app).post("/users/").send(userBody).expect(201).then(response => {
                    user = response.body
                    body.userId = user._id
                })

                await supertest(app).post("/bookings/").send(body).expect(201).then(response => {
                    booking = response.body
                })
                resolve()
            })
        }, 500);
    }
    );
});

beforeEach(() => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, 500)
    })
})

after(() => {
  disconnectDB()
});

describe("Test booking fetching", async () => {
    it("Should fetch all bookings", async() => {
        await supertest(app).get("/bookings/").expect(200).then(response => {
            assert.equal(response.body.length, 1)
        })    
    })

    it("Should get the created booking", async () => {
        await supertest(app).get(`/bookings/${booking._id}`).expect(200).then(response => {
            assert.equal(response.body.to, Date.now())
        })      
    })

    it("Should get a 404 error", async () => {
        await supertest(app).get("/bookings/rgdr").expect(404).then(response => {
            assert.equal(response.text, "There is no booking with this id.")
        })   
    })
})

describe("Test booking creation", () => {
    it("Should create a booking", async() => {
        await supertest(app).post("/bookings/").send(body).expect(201).then(response => {
            assert.equal(response.body.to, Date.now())
        })
    })
})

describe("Test booking update", () => {
    const from = {from: Date.UTC(1996,10)}
    it("Should update a hotel name only", async() => {
        await supertest(app).put(`/bookings/${booking._id}/`).send(from).expect(200).then(response => {
            assert.equal(response.body, "Booking updated")
        })
    })

    it("Should get an error", async() => {
        await supertest(app).put(`/bookings/esgsg`).send(from).expect(404).then(response => {
            assert.equal(response.text, "Error : there is no booking with this id to update !")
        })
    })
})

describe("Test booking delete", () => {
    it("Should delete the booking", async () => {
        await supertest(app).delete(`/bookings/${booking._id}`).expect(200).then(response => {
            assert.equal(response.text, "This booking was succesfully deleted.")
        })
    })

    it("Should get a 404 error", async () => {
        await supertest(app).delete(`/bookings/drhrhdr`).expect(404).then(response => {
            assert.equal(response.text, "Error : there is no booking with this id to delete !")
        })
    })

})