const assert = require('assert').strict;
const supertest = require("supertest")
const app = require('../app.js').app;
const { connectDB, disconnectDB } = require('../dbConnection.js');


before("Setting up DB connection", () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            connectDB().then(() => {
                resolve()
            })
        }, 500);
    }
    );
});

after(() => {
  disconnectDB()
});

describe("Test user fetching", () => {
    it("Should fetch all users", async() => {
        await supertest(app).get("/users/").expect(200).then(response => {
            assert.equal(response.body.length, 0)
        })
        
    })
    it("Should get a 404 error", async () => {
        await supertest(app).get("/users/rgdr").expect(404).then(response => {
            assert.equal(response.body, "There is no user with this id.")
        })
        
    })
})

describe("Test user creation", () => {
    it("Should create a user", async() => {
        let body = {
            email: "test",
            pseudo: "grdhhhthh",
            password: "TestGRGDHDDH",
            role: "employee"
        }
        await supertest(app).post("/users/").send(body).expect(201).then(response => {
            assert.equal(response.body.email, "test")
        })
        
    })
})