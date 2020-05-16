// Schema
const User = require("../models/user");

module.exports = function (app) {
  // Route that finds the user
  app.post("/api/login", ({ body }, res) => {
    const update = {
      is_online: true
    }
    User.findOneAndUpdate({
      username: body.username,
      password: body.password,
    }, update, {new: true}).then((result) => {
      if (result === null) {
        console.log("null");
        res.status(404).send({ message: "user not found" });
      } else {
        console.log("success");
        res.status(200).send({ message: "found user" });
      }
    });
  });
  // Route that logs user out
  app.post("/api/logout", ({body}, res) => {
    const find = {
      username: body.username
    };
    const update = {
      is_online: false
    };
    User.findOneAndUpdate(find, update, {new: true}, (err, result) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.json(result);
      }
    });
  })
};
