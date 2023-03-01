const assert = require('assert').strict;
const supertest = require("supertest")
const app = require('../app.js').app;

let body = {
    email: "test",
    pseudo: "grdhhhthh",
    password: "TestGRGDHDDH",
    role: "employee"
}

let wrongPasswordBody = {
    email: "test",
    pseudo: "grdhhhthh",
    password: "TeDDH",
    role: "employee"
}

let wrongPseudoBody = {
    email: "test",
    pseudo: "gr",
    password: "TeDDHgsrgsgsgrsgd",
    role: "employee"
}
let user = null
let token = null

before("Setting up DB connection", () => {
    return new Promise((resolve) => {
        setTimeout( async () => {
            await supertest(app).post("/users/").send(body).expect(201).then(response => {
                user = response.body
            })

            await supertest(app).get('/users/login').send(body).expect(200).then(response => {
                token = response.headers['token']
                console.log(token)
            })

            resolve()
        })
        }, 500);
    
    
});

beforeEach(() => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, 500)
    })
})

describe("Test user fetching", async () => {
    it("Should fetch all users", async() => {
        await supertest(app).get("/users/").set('token', token).expect(200).then(response => {
            assert.equal(response.body.length, 1)
        })    
    })

    it("Should get the created user", async () => {
        await supertest(app).get(`/users/${user._id}`).set('token', token).expect(200).then(response => {
            assert.equal(response.body.email, "test")
        })      
    })

    it("Should get a 404 error", async () => {
        await supertest(app).get("/users/rgdr").set('token', token).expect(404).then(response => {
            assert.equal(response.text, "There is no user with this id.")
        })   
    })
})

describe("Test login", () => {
    it("Should login the user", async() => {
        await supertest(app).get("/users/login").send(body).expect(200).then(response => {
            assert.equal(response.body.email, "test")
        })
    })

    it("Should get a 404 error", async() => {
        const newBody = {email: "tes", password: body.password}
        await supertest(app).get("/users/login").send(newBody).expect(404).then(response => {
            assert.equal(response.text, "Error : there is no user with this id !")
        })
    })

    it("Should get a 400 error", async() => {
        await supertest(app).get("/users/login").send(wrongPasswordBody).expect(400).then(response => {
            assert.equal(response.text, "Incorrect email or password !")
        })
    })
})

describe("Test user creation", () => {
    it("Should create a user", async() => {
        await supertest(app).post("/users/").set('token', token).send(body).expect(201).then(response => {
            assert.equal(response.body.email, "test")
        })
    })

    it("Should get an error due to wrong password", async() => {
        await supertest(app).post("/users/").set('token', token).send(wrongPasswordBody).expect(400).then(response => {
            assert.equal(response.body.password.message, "Your password must be at least 10 characters")
        }) 
    })

    it("Should get an error due to wrong pseudo", async() => {
        await supertest(app).post("/users/").set('token', token).send(wrongPseudoBody).expect(400).then(response => {
            assert.equal(response.body.pseudo.message, "Your pseudo must be at least 3 characters")
        })
        
    })
})

describe("Test user update", () => {
    const email = {email: "updated !"}
    it("Should update a user email only", async() => {
        await supertest(app).put(`/users/${user._id}/`).set('token', token).send(email).expect(200).then(response => {
            assert.equal(response.body, "User updated")
        })
    })

    it("Should get an error", async(done) => {
        await supertest(app).put(`/users/esgsg/`).set('token', token).expect(404).then(response => {
            console.log(response)
            assert.equal(response.text, "Error : there is no user with this id to update !")
        }).catch(done)
    })
})

describe("Test user delete", () => {
    it("Should delete the user", async () => {
        await supertest(app).delete(`/users/${user._id}/`).set('token', token).expect(200).then(response => {
            assert.equal(response.text, "This user was succesfully deleted.")
        })
    })

    it("Should get a 404 error", async () => {
        await supertest(app).delete(`/users/drhrhdr/`).set('token', token).expect(404).then(response => {
            assert.equal(response.text, "Error : there is no user with this id to delete !")
        })
    })



})