// Schemas
const User = require("../models/user");
const Video = require("../models/video");

module.exports = function(app) {
    // Route that gets all the videos
    app.get("/api/videos", (req, res) => {
        Video.find({}).then(result => {
            if (result === null) {
                res.status(404).send({message: "No videos found"})
            } else {
                res.status(200).send(result);
            }
        });
    });
    // Route for posting a video
    app.post("/api/post", ({body}, res) => {
        const find = {
            username: body.author
        };
        const video = {
            title: body.title,
            id: body.id,
            video_url: body.url,
            author: body.author,
            date: Date.now()
        }
        Video.create(video).then(() => {
            console.log("video created")
        });
        User.findOneAndUpdate(find, {$push: {posted: video}},
            {new: true}, (err, doc) => {
                if (err) res.status(404).send(err);
                console.log("updated user");
                res.status(200).json(doc);
            });
    });
    // Route used to handling liking a video
    app.put("/api/like", ({body}, res) => {
        Video.findOneAndUpdate({id: body.id}, {$inc: {likes: 1}, $push: {who_liked: body.username}}, {new:true}, (err, doc) => {
            if (err) res.status(404).send(err);
            console.log("video updated");
            res.status(200).json(doc);
        });
    });
}