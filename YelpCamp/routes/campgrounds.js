const express = require("express");
const router = express.Router();
const catchAsync = require("../Utils/catchAsync");
const ExpressError = require("../Utils/ExpressError");
const Campground = require("../models/campground");
const { campgroundSchema } = require("../schemas");
const { isLoggedIn } = require("../middleware");

//middleware to validate campground for postman to post
const validateCampground = (req, res, next) => {
  const { error } = campgroundSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((e) => e.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

//views/campgrounds/index: show all campgrounds
router.get(
  "/",
  catchAsync(async (req, res) => {
    const campgrounds = await Campground.find();
    res.render("campgrounds/index", { campgrounds });
  })
);

//new campground only accessible when logged in
router.get("/new", isLoggedIn, (req, res) => {
  res.render("campgrounds/new");
});

router.post(
  "/",
  isLoggedIn,
  validateCampground,
  catchAsync(async (req, res, next) => {
    const campground = new Campground(req.body.campground);
    await campground.save();
    req.flash("success", "successfully made a new campground!");
    res.redirect(`/campgrounds/${campground._id}`);
  })
);

//show one campgrounds
router.get(
  "/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id).populate("reviews");
    if (!campground) {
      req.flash("error", "Cannot find that campground");
      res.redirect("/campgrounds");
    }
    res.render("campgrounds/show", { campground });
  })
);

//edit campground
router.get(
  "/:id/edit",
  isLoggedIn,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    if (!campground) {
      req.flash("error", "Cannot find that campground");
      res.redirect("/campgrounds");
    }
    res.render("campgrounds/edit", { campground });
  })
);
router.put(
  "/:id",
  isLoggedIn,
  validateCampground,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(
      id,
      { ...req.body.campground },
      { new: true }
    );
    req.flash("success", "Successfully updated campground");
    res.redirect(`/campgrounds/${id}`);
  })
);

//delete campground
router.delete(
  "/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect("/campgrounds");
  })
);

module.exports = router;
