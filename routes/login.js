// Schema
const User = require('../models/user');

module.exports = function(app) {
    // Route that finds the user
    app.post("/api/login", ({body}, res) => {
        console.log(body);
        User.findOne({
            username: body.username,
            password: body.password
        })
        .then(result => {
            if (result === null) {
                res.status(404).send({message: "user not found"});
            } else {
                res.status(200).send({message: "found user"})
            }
        })
    })
}