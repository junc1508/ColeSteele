const express = require("express");
const router = express.Router();
const users = require("../controllers/users");
const ExpressError = require("../Utils/ExpressError");
const catchAsync = require("../Utils/catchAsync");
const passport = require("passport");
const { storeReturnTo } = require("../middleware");

router
  .route("/register")
  .get(users.renderRegister)
  .post(catchAsync(users.register));

//get: login routes
//post: authenticate
router
  .route("/login")
  .get(users.renderLogin)
  .post(
    storeReturnTo,
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/login",
    }),
    users.login
  );

//logout
router.get("/logout", users.logout);

module.exports = router;
