const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = function(app) {
    app.post("/api/send/email", ({body}, res) => {
        const msg = {
            to: "aaronealdama@gmail.com",
            from: "lovequestbot@gmail.com",
            subject: `${body.name} is emailing you, contact them back at ${body.emailAddress}`,
            text: `${body.message}`
        };
        sgMail.send(msg)
        .then(
            () => res.status(200),
            err => {
                console.error(err);
                res.status(401)
                if (err.response) {
                    console.error(err.response.body)
                }
            }
        )
    })
}
