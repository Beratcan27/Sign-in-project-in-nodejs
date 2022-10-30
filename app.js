const express = require("express");
const session = require("express-session");
const flash = require("connect-flash");
const app = express();
const dotenv = require("dotenv").config();
const passport = require("passport");

require("./src/config/db");
const MongoDBStore = require("connect-mongodb-session")(session);
const store = new MongoDBStore({
  uri: process.env.MONGOOSE_CONNECTION_STRING,
  collection: "sessions",
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
    store: store,
  })
);

app.use(flash());
app.use((req, res, next) => {
  res.locals.validation_error = req.flash("validation_error");
  res.locals.succes_message = req.flash("succes_message");
  res.locals.email = req.flash("email");
  res.locals.name = req.flash("name");
  res.locals.surname = req.flash("surname");
  res.locals.password = req.flash("password");
  res.locals.repassword = req.flash("repassword");

  res.locals.login_error = req.flash('error');


  next();
});
//body-parser
const bp = require("body-parser");
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());

//ejs template settings
const ejs = require("ejs");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");

app.use(expressLayouts);
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "./src/views"));

const authRouter = require("./src/routers/auth_router");
const yonetimRouter = require('./src/routers/yonetim_router')
app.use("/auth", authRouter);
app.use('/yonetim',yonetimRouter);
app.get("/", (req, res) => {
  res.json({
    message: "Hello World",
    kullanici : req.user
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server ${process.env.PORT} portundan ayağa kalktı`);
});
