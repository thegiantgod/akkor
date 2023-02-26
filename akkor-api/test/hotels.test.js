const assert = require('assert').strict;
const supertest = require("supertest")
const app = require('../app.js').app;
const { connectDB, disconnectDB } = require('../dbConnection.js');

let body = {
    name: "test",
    location: "grdhhhthh",
    description: "TestGRGDHDDH",
    pictureList: ['1', '2']
}

let hotel = null

before("Setting up DB connection", () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            connectDB().then(async () => {
            
                await supertest(app).post("/hotels/").send(body).expect(201).then(response => {
                    hotel = response.body
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

describe("Test hotel fetching", async () => {
    it("Should fetch all hotels", async() => {
        await supertest(app).get("/hotels/").expect(200).then(response => {
            assert.equal(response.body.length, 1)
        })    
    })

    it("Should get the created hotel", async () => {
        await supertest(app).get(`/hotels/${hotel._id}`).expect(200).then(response => {
            assert.equal(response.body.name, "test")
        })      
    })

    it("Should get a 404 error", async () => {
        await supertest(app).get("/hotels/rgdr").expect(404).then(response => {
            assert.equal(response.text, "There is no hotel with this id.")
        })   
    })
})

describe("Test hotel creation", () => {
    it("Should create a hotel", async() => {
        await supertest(app).post("/hotels/").send(body).expect(201).then(response => {
            assert.equal(response.body.name, "test")
        })
    })
})

describe("Test hotel update", () => {
    const name = {name: "updated !"}
    it("Should update a hotel name only", async() => {
        await supertest(app).put(`/hotels/${hotel._id}/`).send(name).expect(200).then(response => {
            assert.equal(response.body, "Hotel updated")
        })
    })

    it("Should get an error", async() => {
        await supertest(app).put(`/hotels/esgsg`).send(name).expect(404).then(response => {
            assert.equal(response.text, "Error : there is no hotel with this id to update !")
        })
    })
})

describe("Test hotel delete", () => {
    it("Should delete the hotel", async () => {
        await supertest(app).delete(`/hotels/${hotel._id}`).expect(200).then(response => {
            assert.equal(response.text, "This hotel was succesfully deleted.")
        })
    })

    it("Should get a 404 error", async () => {
        await supertest(app).delete(`/hotels/drhrhdr`).expect(404).then(response => {
            assert.equal(response.text, "Error : there is no hotel with this id to delete !")
        })
    })

})