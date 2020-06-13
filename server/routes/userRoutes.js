const User = require("../models/user");

module.exports = function (app) {
  // Route for getting specific user information
  app.post("/api/user", ({ body }, res) => {
    console.log("hey");
    console.log(body);
    User.find({ username: body.username }).then((result) => {
      console.log(result);
      if (result.length === 0) {
        res.status(404).send({ message: "user not found" });
      } else {
        res.status(200).send(result);
      }
    });
  });
  // Route to get all the users
  app.get("/api/users", (req, res) => {
    User.find({})
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        res.status(404).send(err);
      });
  });
  // Route to update user information
  app.post("/api/update", ({ body }, res) => {
    console.log("hi");
    console.log(body);
    const update = {
      profile_pic: body.profile_pic,
      teaches: body.teaches,
      about: body.about,
    };
    User.findOneAndUpdate(
      { username: body.username },
      update,
      { new: true },
      (err, doc) => {
        if (err) {
          console.log(err);
          res.status(404).send(err);
        }
        res.status(200).json(doc);
      }
    );
  });
};
