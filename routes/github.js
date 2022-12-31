const passport = require("passport");

const router = require("express").Router();

router.get(
  "/login/github",
  passport.authenticate("github", {
    scope: ["email", "profile", "openid"],
  })
);

router.get(
  "/oauth/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/",
    successRedirect: "/protected",
  })
);

module.exports = router;
