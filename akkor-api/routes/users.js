var express = require('express');
var router = express.Router();
const users = require('../models/User');
const common = require('./commonFunctions');

const userExists = async (req, res, next) => {
  const result = await users.findById(req.params.id);
    if (!result) { 
      res.status(404).send("Error : there is no user with this id !");
    } else {
      next()
    }
  
}

/* GET Logins user */
router.get('/login', async function(req, res, next) {
  const { email, password } = req.body
  const foundUsers = await users.find({email: email})

  foundUsers.forEach(element => {
    if(element.password === password) {
        //if login informations a good, it will send back the correct user
        res.status(200);
        res.json(element)
        return
    } else {
      res.status(400).send("Incorrect email or password !")
    }
  });

  if(foundUsers.length === 0) {
    res.status(404).send("Error : there is no user with this id !")
    return
  }
  
})

/* GET users listing. */
router.get('/', async function(req, res, next) {
  res.json(await users.find());
});

/* GET a user by its id */ 
router.get('/:id', async function(req, res, next) {
  try {
    const value = await users.findById(req.params.id);
    res.json(value);
  } catch (error) {
    res.status(404);
    res.send("There is no user with this id.")
  }
  
});

/* creates a user */
router.post('/', async function(req, res, next) {
  try {
    const newUser = await users.create({
      ...req.body
    });
    res.status(201);
    res.json(newUser);
  } catch (error) {
    res.status(400);
    res.json(error.errors);
  }
});

/* deletes an user */
router.delete("/:id",userExists, function (req, res, next) {
  const newId = req.params.id;

  let query = { _id : newId}
  users.deleteOne(query, (err) => {
    if (err) {
      res.status(500);
      return
    }
  });
  res.status(200).send("This user was succesfully deleted.");
  return;
    
  
});

/* updates an user */
router.put("/:id", userExists, function (req, res, next) {
  
  let query = { _id : req.params.id};
  users.updateOne(query, req.body, (err, res) => {
    if (err) res.status(500);
  })
  res.status(200);
  res.json("User updated");
  return;
    
  
});

module.exports = { router, userExists };
