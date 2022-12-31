const UserModel = require("../db/UserModel");

const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

const googleStrategy = new GoogleStrategy(
  {
    callbackURL: "/google/redirect_uri",
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    accessType: "offline",
  },
  async (accessToken, refreshToken, profile, done) => {
    let user = await UserModel.findOne({ username: profile.displayName });
    if (!user) {
      const newUser = new UserModel({
        admin: false,
        username: profile.displayName,
        hash: null,
        salt: null,
      });
      user = await newUser.save();
    }

    done(null, user);
  }
);

module.exports = googleStrategy;
