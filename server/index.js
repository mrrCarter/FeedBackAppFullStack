const express = require("express");
const mongoose = require("mongoose");
const keys = require("./config/key");

require("./models/User"); //ensure that whenever our app boots up, mongoose will be informed that it is responsible for creating a collection of users

require("./services/passport"); //since we're not using this we can just have a require statement and not assign it to a constant or variable

mongoose.connect(keys.mongoURI); //go to mlab.com and pass the address of the instance we created as an object. imported from config/keys.js for sec purpose

const app = express();

require("./routes/authRoutes")(app); //same as...(we required a function and then immediately evoque it with the 'app' object   ->
//const authRoutes = require("./routes/authRoutes");
// //now we call authRoutes
// authRoutes(app);

var PORT = process.env.PORT || 5000;

//localhost:5001
app.listen(PORT);

//test route handler... should be deleted
// app.get("/", (req, res) => {
//   res.send(
//     "This is a confirmation that i have received your request. Tried to recommit and checked heroku. This is on ubuntu in tang hall"
//   );
// });
