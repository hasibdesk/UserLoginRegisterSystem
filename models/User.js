const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Creating User Schema using Mongoose
const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  avatar: { type: String, required: true },
  date: { type: Date, default: Date.now }
});
module.exports = User = mongoose.model("user", UserSchema);
