const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema (
    {
        first_name: {
            type: String,
            trim: true,
            required: "Enter your first name"
        },
        last_name: {
            type: String,
            trim: true,
            required: "Enter your last name"
        },
        email: {
            type: String,
            trim: true,
            required: "Enter your email"
        },
        username: {
            type: String,
            trim: true,
            required: "Enter a valid username"
        },
        password: {
            type: String,
            trim: true,
            required: "Entere a valid password",
        },
        is_online: {
            type: Boolean,
            default: false,
        },
        following: {
            type: [String],
            default: []
        },
        buddies: {
            type: [String],
            default: []
        },
        unwatched: {
            type: [Buffer],
            default: []
        }
    }
);

const User = mongoose.model("User", userSchema);

module.exports = User;