const jwt = require('jsonwebtoken');

const isAdmin = (req, res, next) => {
    if(req.headers.role !== "admin") {
      res.status(403).send("Error : you are not allowed to make this request !");
    } else {
      next()
    }
}

const authentificateToken = (req, res, next) => {
  const authHeader = req.headers['token']

  if (authHeader === undefined) {
     res.status(401)
     res.send()
  }

  jwt.verify(authHeader, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)

    req.user = user

    next()
  })
}

module.exports = {isAdmin, authentificateToken}