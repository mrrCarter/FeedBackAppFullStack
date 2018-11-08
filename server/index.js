const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const app = express();

//test route handler... should be deleted
// app.get("/", (req, res) => {
//   res.send(
//     "This is a confirmation that i have received your request. Tried to recommit and checked heroku. This is on ubuntu in tang hall"
//   );
// });

//make passport understand how to use the google library
//new google strategy creates a new istance of the google passport strategy
//ClientID:
//clientSecret: in config/keys
passport.use(new GoogleStrategy());

const PORT = process.env.PORT || 5000;

//localhost:5001
app.listen(PORT);
