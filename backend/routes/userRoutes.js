const User = require("../models/user");

module.exports = function(app) {
    app.post("/api/user", ({body}, res) => {
        console.log(body)
        User.find({username: body.username}).then(result => {
            console.log(result);
            if (result.length === 0) {
                res.status(404).send({message: "user not found"})
            } else {
                res.status(200).send(result);
            }
        })
    })
}