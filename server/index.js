const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const keys = require("/Users/carther/Desktop/carther/FeedBackApp/server/FeedBackAppFullStack/server/config/key");

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
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      console.log("access token", accessToken);
      console.log("refresh token", refreshToken);
      console.log("profile", profile);
      console.log("Image", profile.url);
      console.log("HAHA HE'S NAME IS:", profile.displayName);
    }
  )
);

//route handler for the authentification and specify the scope to be profile and email

app.get(
  "/auth/google", //whenever a user comes to this route
  passport.authenticate("google", {
    //google strategy has an internal identifier called 'google'
    //hey passport, attempt to authenticate the user who is coming in on this route (/auth/google) and use the strategy called 'google'
    scope: ["profile", "email"]
  })
);

//now we need another route handler for when the user chooses the account to sign in with. at this point passport will echange the 'code=4' or whatever the code is in the url to the code google has
app.get("/auth/google/callback", passport.authenticate("google"));
//after we get the permission, google will give us an access token that we can then use to get information from the user.

const PORT = process.env.PORT || 5000;

//localhost:5001
app.listen(PORT);
