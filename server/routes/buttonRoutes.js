const User = require("../models/user");

module.exports = function(app) {
    // route that handles follows
    app.put("/api/follow", ({body}, res) => {
        User.findOneAndUpdate({username: body.user}, {$push: {following: body.profile}}, 
            {new: true}, (err, doc) => {
                if (err) res.status(404).send(err);
                console.log(doc);
            })
        User.findOneAndUpdate({username: body.profile}, {$push: {buddies: body.user}},
            {new: true}, (err, doc) => {
                if (err) res.status(404).send(err);
                console.log(doc);
            })
        User.find({username: body.user})
        .then(data => {
            res.status(200).send(data);
        })
    })
    // route that handles following a follower
    app.put("/api/buddy", ({body}, res) => {
        User.findOneAndUpdate({username: body.user}, {$push: {following: body.profile, buddies: body.profile}},
            {new: true}, (err, doc) => {
                if (err) res.status(404).send(err);
        })
        User.findOneAndUpdate({username: body.profile}, {$push: {buddies: body.user}},
            {new: true}, (err, doc) => {
                if (err) res.status(404).send(err);
        })
        User.find({username: body.user})
        .then(data => {
            res.status(200).send(data);
        })
    })
    // route that handles unfollowing a user
    app.put("/api/remove", ({body}, res) => {
        User.findOneAndUpdate({username: body.user}, {$pull: {following: body.profile}},
            {new: true}, (err, doc) => {
                if (err) res.status(404).send(err);
        })
        User.findOneAndUpdate({username: body.profile}, {$pull: {buddies: body.user}},
            {new: true}, (err, doc) => {
                if (err) res.status(404).send(err);
        })
        User.find({username: body.user}).then(data => {
            res.status(200).send(data);
        })
        
    })
    // route that handles unfollowing someone 
    app.put("/api/unfollow", ({body}, res) => {
        User.findOneAndUpdate({username: body.user}, {$pull: {following: body.profile}},
            {new: true}, (err, doc) => {
                if (err) res.status(404).send(err);
            })
        User.find({username: body.user})
        .then(data => {
            res.status(200).send(data);
        })
    })   
}