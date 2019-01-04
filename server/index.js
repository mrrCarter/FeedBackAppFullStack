const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/key');

require('./models/User'); //ensure that whenever our app boots up, mongoose will be informed that it is responsible for creating a collection of users

require('./services/passport'); //since we're not using this we can just have a require statement and not assign it to a constant or variable

mongoose.connect(
  keys.mongoURI,
  { useNewUrlParser: true }
); //go to mlab.com and pass the address of the instance we created as an object. imported from config/keys.js for sec purpose

const app = express();

//code that will tell express how to handle cookie
app.use(
  cookieSession({
    //30days, 24hr in a day, 60min in hr, 60s in min, 1000millisec to a sec
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey] //randomly generated key in config/keys.js
  })
);

//tell passport to make use of cookies to handle auth
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app); //same as...(we required a function and then immediately evoque it with the 'app' object   ->
//const authRoutes = require('./routes/authRoutes');
// //now we call authRoutes
// authRoutes(app);

var PORT = process.env.PORT || 5000;

//localhost:5001
app.listen(PORT);

//test route handler... should be deleted
// app.get('/', (req, res) => {
//   res.send(
//     'This is a confirmation that i have received your request.'
//   );
// });
