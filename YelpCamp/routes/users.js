const express = require("express");
const router = express.Router();
const User = require("../models/user");
const ExpressError = require("../Utils/ExpressError");
const catchAsync = require("../Utils/catchAsync");
const passport = require("passport");
const { storeReturnTo } = require("../middleware");

router.get("/register", (req, res) => {
  res.render("users/register");
});

router.post(
  "/register",
  catchAsync(async (req, res) => {
    try {
      const { email, username, password } = req.body;
      //register user
      const user = new User({ email, username });
      const registeredUser = await User.register(user, password);
      //login user
      req.login(registeredUser, (err) => {
        if (err) {
          return next(err);
        } else {
          req.flash("success", "Welcome to Yelp Camp!");
          res.redirect("/campgrounds");
        }
      });
    } catch (e) {
      req.flash("error", e.message);
      res.redirect("/register");
    }
  })
);

//login routes
router.get("/login", (req, res) => {
  res.render("users/login");
});

//authenticate
router.post(
  "/login",
  storeReturnTo,
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login",
  }),
  (req, res) => {
    req.flash("success", "Welcome Back");
    const redirectUrl = res.locals.returnTo || "/campgrounds";
    res.redirect(redirectUrl);
  }
);

//logout
router.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash("success", "goodbye");
    res.redirect("/campgrounds");
  });
});

module.exports = router;
