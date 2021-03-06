const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/key');

const User = mongoose.model('users');

//make passport understand how to use the google library
//new google strategy creates a new istance of the google passport strategy
//ClientID:
//clientSecret: in config/keys
//we are doing a cookie based authentication

//Let's determine which data of the user object should be stored in the session
//serialize the user for the session
passport.serializeUser((user, done) => {
  done(null, user.id);
  //this is the unique id generated by mongoDB when we save it
});

//deserialize the user for the session
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    (accessToken, refreshToken, profile, done) => {
      console.log('Below is your ID');
      console.log(profile.id);
      //Let's check/query the DB first to see if there's a record before saving them
      User.findOne({ googleId: profile.id }).then(existingUser => {
        if (existingUser) {
          //we already have the user, so do nothing
          done(null, existingUser); //if we find a user, stop the oauth flow
        } else {
          new User({ googleId: profile.id })
            .save() // save it to the DB
            .then(user => done(null, user)); //we just got this fresh 'promise callback' user from our db query so we should use it instead of the one we created. because it might have some additional changes being made to it while it's being saved. Asynchronous!
        }
      });
    }
  )
);
