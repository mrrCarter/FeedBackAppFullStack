const passport = require("passport");

//to make sure we are able to make use of express app declaration on index.js, we have to export this bit of code and make sure in index.js we call this file... see in index.js

//so we will have an arrow function module.exports...
module.exports = app => {
  // route handler for the authentification and specify the scope to be profile and email

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
};
