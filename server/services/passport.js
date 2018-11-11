const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/key");

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
