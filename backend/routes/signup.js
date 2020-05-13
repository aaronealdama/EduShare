// Schema
const User = require("../models/user");

module.exports = function (app) {
  app.get("/api/test", (req, res) => {
    res.send("hello");
  });
  // Route that checks for an existing user
  app.post("/api/find", (req, res) => {
    console.log("hello");
    User.find({ username: req.body.username }).then((result) => {
      console.log(result);
      if (result.length === 0) {
        res.status(200).send({ message: "user does not exist" });
      } else {
        res.status(409).send({ message: "user already exists" });
      }
    });
  });
  // Route that creates new user
  app.post("/api/newUser", (req, res) => {
    User.create(req.body)
      .then((dbUser) => {
        res.json(dbUser);
      })
      .catch((err) => {
        res.status(404).json(err);
      });
  });
};
