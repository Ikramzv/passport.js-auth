module.exports = {
  isAuth: (req, res, next) => {
    if (req.isAuthenticated()) return next();

    res.status(401).send(
      `
                <p style="color: red">You are not authorized to view this page</p>
                <a href="/login">Log in</a>
            `
    );
  },
  isAdmin: (req, res, next) => {
    if (!req.user?.admin)
      return res.status(401).send("You are not admin to edit that page");
    return next();
  },
};
