const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  first_name: {
    type: String,
    trim: true,
    required: "Enter your first name",
  },
  last_name: {
    type: String,
    trim: true,
    required: "Enter your last name",
  },
  email: {
    type: String,
    trim: true,
    required: "Enter your email",
  },
  username: {
    type: String,
    trim: true,
    required: "Enter a valid username",
  },
  password: {
    type: String,
    trim: true,
    required: "Enter a valid password",
  },
  is_online: {
    type: Boolean,
    default: false,
  },
  following: {
    type: [String],
    default: [],
  },
  buddies: {
    type: [String],
    default: [],
  },
  posted: {
    type: [Buffer],
    default: [],
  },
  notifications: {
    type: [String],
    default: []
  },
  profile_pic: {
    type: String,
    default: "http://sunfieldfarm.org/wp-content/uploads/2014/02/profile-placeholder.png"
  },
  teaches: {
    type: String,
    default: "New to Edushare"
  },
  about: {
    type: String,
    default: "New to Edushare"
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
