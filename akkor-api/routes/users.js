var express = require('express');
var router = express.Router();
const users = require('../models/User');
const common = require('./commonFunctions');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// get config vars
dotenv.config();

const userExists = async (req, res, next) => {
  const result = await users.findById(req.params.id);
    if (!result) { 
      res.status(404).send("Error : there is no user with this id !");
    } else {
      next()
    }
  
}

const generateAccessToken = (email) => {
  return jwt.sign({email: email}, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}

/* GET Logins user */
router.post('/login', async function(req, res, next) {
  // #swagger.tags = ['User managing']
  /* #swagger.parameters['user'] = {
        in: 'body',
        description: 'email and password',
        required: true,
        type: 'object',
        format: 'json',
        schema: {
          email: "test@gmail.com",
          password: "MyPasswordOk!"
        }
  } */

  const { email, password } = req.body
  const foundUsers = await users.find({email: email})

  foundUsers.forEach(element => {
    if(element.password === password) {
        //if login informations a good, it will send back the correct user
        res.status(200);
        res.set('token', generateAccessToken(element.email))
        res.json(element)
        res.send()
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
router.get('/', common.authentificateToken, async function(req, res, next) {
  // #swagger.tags = ['User managing']
  res.json(await users.find());
});

/* GET a user by its id */ 
router.get('/:id', common.authentificateToken, async function(req, res, next) {
  // #swagger.tags = ['User managing']
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
  // #swagger.tags = ['User managing']
  /* #swagger.parameters['user'] = {
        in: 'body',
        description: 'all of the below body',
        required: true,
        type: 'object',
        format: 'json',
        schema: {
          email: "test@gmail.com",
          pseudo: "MyPseudo",
          password: "MyPasswordOk!",
          role: "admin"
        }
  } */

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
router.delete("/:id", common.authentificateToken, userExists, function (req, res, next) {
  // #swagger.tags = ['User managing']
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
router.put("/:id", common.authentificateToken, userExists, function (req, res, next) {
  // #swagger.tags = ['User managing']
  /* #swagger.parameters['user'] = {
        in: 'body',
        description: 'at least one of the variables in the body (ex : if you only want to update the role, you can just send the role in the body).',
        required: true,
        type: 'object',
        format: 'json',
        schema: {
          email: "test@gmail.com",
          pseudo: "MyPseudo",
          password: "MyPasswordOk!",
          role: "admin"
        }
  } */

  let query = { _id : req.params.id};
  users.updateOne(query, req.body, (err, res) => {
    if (err) res.status(500);
  })
  res.status(200);
  res.json("User updated");
  return;
    
  
});

module.exports = { router, userExists };
