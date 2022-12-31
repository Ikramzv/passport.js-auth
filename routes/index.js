const router = require("express").Router();
const { isAuth } = require("../midlewares/authMiddleware");

// require("./github");
// require("./local");
// require("./google");

router.use(require("./github"));
router.use(require("./local"));
router.use(require("./google"));

router.get("/", (req, res) => {
  console.log(req.user);
  res.send(`
  
  ${
    req?.user
      ? '<p><a href="/logout">LOG OUT</a></p>'
      : `
        <p>If you have not an account , please <a href="/register">REGISTER</a></p>
        <p><a href="/login">LOGIN</a></p>
        <p><a href="/login/google">SIGN IN WITH GOOGLE</a></p>
        <p><a href="/login/github">SIGN IN WITH GITHUB</a></p>
        `
  }
        <p><a href="/protected">GO TO PROTECTED</a>
  `);
});

router.get("/login", (req, res) => {
  const form = `<h1>Login Page</h1><form method="POST" action="/login">
    ${
      req.session?.messages
        ? `<h3 style='color: red;'>${
            req.session.messages[req.session.messages.length - 1]
          }</h3>`
        : ""
    }
    Enter Username:<br><input type="text" name="username">
    <br>Enter Password:<br><input type="password" name="password">
    <br><br>
    <input type="submit" value="Submit"><br /><hr />
    <button><a href="/register">register</a></button>
    <button><a href="/">home</a></button>
    </form>`;

  res.send(form);
});

router.get("/register", (req, res) => {
  const form =
    '<h1>Register Page</h1><form method="post" action="register">\
                    Enter Username:<br><input type="text" name="uname">\
                    <br>Enter Password:<br><input type="password" name="pw">\
                    <br><br><input type="submit" value="Submit"></form>';

  res.send(form);
});

router.get("/protected", isAuth, (req, res) => {
  res.send(`
        <h1>Protected Route</h1>
        <p>Welcome to protected page , <strong><u>${
          req.user?.username || req.user?.displayName
        }</u></strong></p>
        <p><a href="/logout">logout</a>
    `);
});

module.exports = router;
