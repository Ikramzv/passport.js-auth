require("dotenv").config();
const express = require("express");
const session = require("express-session");
const Redis = require("ioredis");
const mongoose = require("mongoose");
const passport = require("passport");
const router = require("./routes");
const { isAuth } = require("./midlewares/authMiddleware");
require("./passport");

const redisClient = new Redis();
const RedisStore = require("connect-redis")(session);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    name: "connect_session",
    resave: false,
    saveUninitialized: false,
    store: new RedisStore({
      client: redisClient,
      // disableTouch: true,
    }),
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 5,
      sameSite: "lax",
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(router);

// database connection

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_CONNECTION_URL, {}, () => {
  console.log("MongoDB has been connected");
});

// Listen the app

app.listen(3000, () => {
  console.log("App is listening on port 3000");
});
