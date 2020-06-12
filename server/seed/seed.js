const mongoose = require('mongoose');
const User = require("../models/user");
const Video = require("../models/video");

mongoose.connect("mongodb://localhost/edushare", {
  useNewUrlParser: true,
  useFindAndModify: false
});

User.deleteMany({}).then(() => {
    console.log("users deleted");
});

Video.deleteMany({}).then(() => {
  console.log("videos deleted");
});