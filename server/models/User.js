const mongoose = require("mongoose");
const { Schema } = mongoose; // same as const Schema = mongoose.Schema;

const userSchema = new Schema({
  googleId: String //it tells our schema that everytime there is a value on this google id property it will always be a string and it should treat it like a string.
});

//now lets create a model class for mongoose
mongoose.model("users", userSchema); //we want to create a new userSchema collection called users.
