const express = require("express");
const app = express();
require("./services/passport"); //since we're not using this we can just have a require statement and not assign it to a constant or variable

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
