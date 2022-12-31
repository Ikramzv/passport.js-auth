const router = require("express").Router();
const passport = require("passport");
const { isAuth } = require("../midlewares/authMiddleware");

router.get(
  "/login/google",
  passport.authenticate("google", {
    scope: ["email", "profile", "openid"],
  })
);
router.get(
  "/google/redirect_uri",
  passport.authenticate("google", {
    failureRedirect: "/login/google",
    successRedirect: "/protected",
  })
);

module.exports = router;
