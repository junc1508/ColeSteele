const express = require("express");
const path = require("path");
//data base
const mongoose = require("mongoose");
//ejs mate template engine
const ejsMate = require("ejs-mate");
//session and flash
const session = require("express-session");
const flash = require("connect-flash");
//passport for authentication
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");

//schema langage, not needed any more because we
//export campgroundSchema now.
//const Joi = require("joi");

const methodOverride = require("method-override");
const catchAsync = require("./Utils/catchAsync");
const ExpressError = require("./Utils/ExpressError");
//router
const campgroundRoutes = require("./routes/campgrounds");
const reviewRoutes = require("./routes/reviews");
const userRoutes = require("./routes/users");
const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/yelp-camp")
  .then(() => {
    console.log("MONGO CONNECTION OPEN!!");
  })
  .catch((err) => {
    console.log("MONGO ERROR!");
    console.log(err);
  });

//handle MongoDB error after connection
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});
//ejs template
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(methodOverride("_method"));
//req.body from URL
app.use(express.urlencoded({ extended: true }));
//serve public
app.use(express.static(path.join(__dirname, "public")));

//session
const sessionConfig = {
  secret: "thisshouldbeabettersecret!",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};
app.use(session(sessionConfig));
app.use(flash());

//authentication with passport
app.use(passport.initialize());
//middleware persistant login
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
//how to store user in session
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//hard code to test passport, will delete later
// app.get("/fakeuser", async (req, res) => {
//   const user = new User({ email: "jche@gmail.com", username: "Jun" });
//   const newUser = await User.register(user, "password");
//   res.send(newUser);
// });

//middleware to call flash when it exists
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

//use the router
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/reviews", reviewRoutes);
app.use("/", userRoutes);

//main page
app.get("/", (req, res) => {
  res.send("Hello from Yelp Camp");
});

//404 for all request, everypath
//will only run when nothing ahead works
app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

//basic error handler
app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) {
    err.message = "Oh No, Something Went Wrong!";
  }
  res.status(statusCode).render("error", { err });
});

app.listen(3000, () => {
  console.log("Serving on port 3000");
});
function newFunction() {
  return "./utils/catchAsync";
}
