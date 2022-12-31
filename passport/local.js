const LocalStrategy = require("passport-local").Strategy;
const { validPassword } = require("../lib/passwordUtils");
const User = require("../db/UserModel");

const verifyCallback = (username, password, cb) => {
  User.findOne({ username })
    .then((user) => {
      if (!user) return cb(null, false, { message: "Username is invalid" });
      const isValid = validPassword(password, user.hash, user.salt);
      if (isValid) return cb(null, user);
      return cb(null, false, { message: "Password is invalid" });
    })
    .catch((err) => cb(err));
};

// Initialize the strategy by passing the options object and verify function
const localStrategy = new LocalStrategy(verifyCallback);

// Register the strategy to passport.js

module.exports = localStrategy;
