const assert = require('assert').strict;
const supertest = require("supertest")
const app = require('../app.js').app;

let body = {
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

let hotel = null
let token = null
const expiredToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QiLCJpYXQiOjE2Nzc2ODg3MjksImV4cCI6MTY3NzY5MDUyOX0.1cZJi-wx-vjVAoXZi8gCl5Rc6p0arBhsL5naurKAv3U"

before("Setting up DB connection", () => {
    return new Promise((resolve) => {
        setTimeout( async () => {
            
            

                await supertest(app).post("/users/").send(userBody).expect(201).then(() => {
                })

                await supertest(app).get('/users/login').send(userBody).expect(200).then(response => {
                    token = response.headers['token']
                    console.log(token)
                })

                await supertest(app).post("/hotels/").set('token', token).send(body).expect(201).then(response => {
                    hotel = response.body
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
        await supertest(app).post("/hotels/").set('token', token).send(body).expect(201).then(response => {
            assert.equal(response.body.name, "test")
        })
    })

    it("Should get a 403 error", async () => {
        await supertest(app).post(`/hotels/`).set('token', expiredToken).expect(403).then(response => {
            assert.equal(response.text, "Forbidden")
        })
    })

    it("Should get a 401 error", async () => {
        await supertest(app).post(`/hotels/`).expect(401).then(response => {
            assert.equal(response.text, "")
        })
    })
})

describe("Test hotel update", () => {
    const name = {name: "updated !"}
    it("Should update a hotel name only", async() => {
        await supertest(app).put(`/hotels/${hotel._id}/`).set('token', token).send(name).expect(200).then(response => {
            assert.equal(response.text, "Hotel updated.")
        })
    })

    it("Should get an error", async() => {
        await supertest(app).put(`/hotels/esgsg`).set('token', token).send(name).expect(404).then(response => {
            assert.equal(response.text, "Error : there is no hotel with this id to update !")
        })
    })

    it("Should get a 403 error", async () => {
        await supertest(app).put(`/hotels/${hotel._id}/`).set('token', expiredToken).expect(403).then(response => {
            assert.equal(response.text, "Forbidden")
        })
    })

    it("Should get a 401 error", async () => {
        await supertest(app).put(`/hotels/${hotel._id}/`).expect(401).then(response => {
            assert.equal(response.text, "")
        })
    })
})

describe("Test hotel delete", () => {
    it("Should delete the hotel", async () => {
        await supertest(app).delete(`/hotels/${hotel._id}`).set('token', token).expect(200).then(response => {
            assert.equal(response.text, "This hotel was succesfully deleted.")
        })
    })

    it("Should get a 404 error", async () => {
        await supertest(app).delete(`/hotels/drhrhdr`).set('token', token).expect(404).then(response => {
            assert.equal(response.text, "Error : there is no hotel with this id to delete !")
        })
    })

    it("Should get a 403 error", async () => {
        await supertest(app).put(`/hotels/${hotel._id}/`).set('token', expiredToken).expect(403).then(response => {
            assert.equal(response.text, "Forbidden")
        })
    })

    it("Should get a 401 error", async () => {
        await supertest(app).put(`/users/${hotel._id}/`).expect(401).then(response => {
            assert.equal(response.text, "")
        })
    })

})