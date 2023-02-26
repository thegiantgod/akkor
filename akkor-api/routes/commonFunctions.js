const isAdmin = (req, res, next) => {
    if(req.headers.role !== "admin") {
      res.status(403).send("Error : you are not allowed to make this request !");
    } else {
      next()
    }
}

module.exports = {isAdmin}