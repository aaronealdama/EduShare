// Schema
const User = require("../models/user");

module.exports = function (app) {
  // Route that finds the user
  app.post("/api/login", ({ body }, res) => {
    console.log(body);
    User.findOne({
      username: body.username,
      password: body.password,
    }).then((result) => {
      console.log("hello", result);
      if (result === null) {
        console.log("null");
        res.status(404).send({ message: "user not found" });
      } else {
        console.log("success");
        res.status(200).send({ message: "found user" });
      }
    });
  });
};
