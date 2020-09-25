const db = require('../models')
module.exports = (app) => {
    app.post("/api/signup", (req, res) => {
        // conditional needed
            // Look for user based on email
            // if found
                // update first and last name accordingly
            // else
                // create new user
        db.Users.create({
            name: req.body.name,
            lastname: req.body.lastname,
            email: req.body.email
        })

            // Whether we create a new user or update user
            // Send back a user object from the DB
            .then(() => {
                //redirect wont work here, we need to send a user object
                //res.redirect(307, '/api/login');
            })
            .catch((err) => {
                res.status(401).json(err);
            })

    });

    app.get("/users/:email", function () {
        //make sure an email was passed
        //use the email and our db.User model to lookup a user
        //send that user object back in the response
    })


}