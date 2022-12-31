const passport = require("passport");

passport.use(require("./google")); // Google strategy
passport.use(require("./local")); // Local strategy
passport.use(require("./github")); // Github strategy

// When user is authenticated , serializeUser function runs to store user information in session
passport.serializeUser((user, done) => {
  process.nextTick(() => {
    return done(null, user);
  });
});
// When session is authenticated , deserializeUser functions runs to set req.user property to the user information
// which is stored previously  by running serializeUser function .
passport.deserializeUser(async (user, done) => {
  process.nextTick(() => {
    return done(null, user);
  });
});

module.exports = {};
