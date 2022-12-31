const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: String,
  hash: String,
  salt: String,
  admin: Boolean,
});

module.exports = mongoose.model("User", UserSchema, "users");
