const assert = require('assert').strict;
const supertest = require("supertest")
const app = require('../app.js').app;

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
let token = null
const expiredToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QiLCJpYXQiOjE2Nzc2ODg3MjksImV4cCI6MTY3NzY5MDUyOX0.1cZJi-wx-vjVAoXZi8gCl5Rc6p0arBhsL5naurKAv3U"

before("Setting up DB connection", () => {
    return new Promise((resolve) => {
        setTimeout( async () => {

            await supertest(app).post("/users/").send(userBody).expect(201).then(response => {
                user = response.body
                body.userId = user._id
            })

            await supertest(app).get('/users/login').send(userBody).expect(200).then(response => {
                token = response.headers['token']
                console.log(token)
            })
            
            await supertest(app).post("/hotels/").set('token', token).send(hotelBody).expect(201).then(response => {
                hotel = response.body;
                body.hotelId = hotel._id;
            })

            await supertest(app).post("/bookings/").set('token', token).send(body).expect(201).then(response => {
                booking = response.body
            })
            resolve()
            
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

describe("Test booking fetching", async () => {
    it("Should fetch all bookings", async() => {
        await supertest(app).get("/bookings/").expect(200).then(response => {
            assert.equal(response.body.length, 1)
        })    
    })

    it("Should get the created booking", async () => {
        await supertest(app).get(`/bookings/${booking._id}`).expect(200).then(response => {
            assert.equal(response.body.userId, body.userId)
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
        await supertest(app).post("/bookings/").set('token', token).send(body).expect(201).then(response => {
            assert.equal(response.body.userId, body.userId)
        })
    })

    it("Should get a 403 error", async () => {
        await supertest(app).post(`/bookings/`).set('token', expiredToken).send(body).expect(403).then(response => {
            assert.equal(response.text, "Forbidden")
        })
    })

    it("Should get a 401 error", async () => {
        await supertest(app).post(`/bookings/`).expect(401).send(body).then(response => {
            assert.equal(response.text, "")
        })
    })

    it("Should get a 400 error", async() => {
        const newBody = {
            hotelId: body.hotelId,
            from: body.from,
            to: body.to,
            userId: "idd"
        }
        await supertest(app).post("/bookings/").set('token', token).send(newBody).expect(400).then(response => {
            assert.equal(response.text, "Error : this user doesn't exists")
        })
    })

    it("Should get a 400 error", async() => {
        const newBody = {
            hotelId: "egssg",
            from: body.from,
            to: body.to,
            userId: body.userId
        }
        await supertest(app).post("/bookings/").set('token', token).send(newBody).expect(400).then(response => {
            assert.equal(response.text, "Error : this hotel doesn't exists")
        })
    })

})

describe("Test booking update", () => {
    const from = {from: Date.UTC(1996,10)}
    it("Should update a booking name only", async() => {
        await supertest(app).put(`/bookings/${booking._id}/`).set('token', token).send(from).expect(200).then(response => {
            assert.equal(response.text, "Booking updated.")
        })
    })

    it("Should get an error", async() => {
        await supertest(app).put(`/bookings/esgsg`).set('token', token).send(from).expect(404).then(response => {
            assert.equal(response.text, "Error : there is no booking with this id !")
        })
    })

    it("Should get a 403 error", async () => {
        await supertest(app).put(`/bookings/${booking._id}/`).set('token', expiredToken).expect(403).then(response => {
            assert.equal(response.text, "Forbidden")
        })
    })

    it("Should get a 401 error", async () => {
        await supertest(app).put(`/bookings/${booking._id}/`).expect(401).then(response => {
            assert.equal(response.text, "")
        })
    })
})

describe("Test booking delete", () => {
    it("Should delete the booking", async () => {
        await supertest(app).delete(`/bookings/${booking._id}`).set('token', token).expect(200).then(response => {
            assert.equal(response.text, "This booking was succesfully deleted.")
        })
    })

    it("Should get a 404 error", async () => {
        await supertest(app).delete(`/bookings/drhrhdr`).set('token', token).expect(404).then(response => {
            assert.equal(response.text, "Error : there is no booking with this id !")
        })
    })

    it("Should get a 403 error", async () => {
        await supertest(app).put(`/bookings/${booking._id}/`).set('token', expiredToken).expect(403).then(response => {
            assert.equal(response.text, "Forbidden")
        })
    })

    it("Should get a 401 error", async () => {
        await supertest(app).put(`/bookings/${booking._id}/`).expect(401).then(response => {
            assert.equal(response.text, "")
        })
    })

})