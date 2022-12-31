const UserModel = require("../db/UserModel");

const GithubStrategy = require("passport-github2").Strategy;

const githubStrategy = new GithubStrategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "/oauth/github/callback",
  },
  async (accessToken, refreshToken, profile, done) => {
    let user = await UserModel.findOne({ username: profile.username });
    if (!user) {
      const newUser = new UserModel({
        admin: false,
        username: profile.username,
        hash: null,
        salt: null,
      });
      user = await newUser.save();
    }

    done(null, user);
  }
);

module.exports = githubStrategy;
