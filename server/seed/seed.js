const mongoose = require('mongoose');
const User = require("../models/user");

mongoose.connect("mongodb://localhost/edushare", {
  useNewUrlParser: true,
  useFindAndModify: false
});

User.deleteMany({}).then(() => {
    console.log("users deleted");
});