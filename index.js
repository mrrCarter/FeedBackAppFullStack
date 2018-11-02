const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("This is a confirmation that i have received your request");
});

const PORT = process.env.PORT || 5000;

//localhost:5001
app.listen(PORT);
