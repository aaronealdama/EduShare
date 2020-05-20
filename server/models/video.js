const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const videoSchema = new Schema({
    title: {
        type: String,
        trim: true
    },
    id: {
        type: String,
        trim: true
    },
    video_url: {
        type: String,
        trim: true,
        required: "Please enter a video"
    },
    author: {
        type: String,
        trim: true,
        required: "Enter a user"
    },
    date: {
        type: Date,
        default: Date.now()
    },
    likes: {
        type: Number,
        default: 0
    },
    who_liked: {
        type: [String],
        default: []
    }
})

const Video = mongoose.model("Video", videoSchema);

module.exports = Video;
