const User = require('../models/user');

module.exports = function(app) {
    // route that deletes a specific notification
    app.put("/api/delete/notification", ({body}, res) => {
        User.findOneAndUpdate({username: body.username}, {$pull: {notifications: body.notification}})
        .then(() => {
            console.log("found and removed notification")
            User.find({username: body.username})
            .then(data => {
                res.status(200).send(data)
            });
        })
        .catch(err => res.status(404).send(err))
    })
    // route that handles adding a notification
    app.put("/api/add/notification", ({body}, res) => {
        User.findOneAndUpdate({username: body.username}, {$push: {notifications: body.title}}, 
            {new: true}, (err, doc) => {
                if (err) res.status(404).send(err);
                res.status(200).json(doc);
            })
    })
}
