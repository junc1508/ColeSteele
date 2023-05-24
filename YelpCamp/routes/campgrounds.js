const express = require("express");
const router = express.Router();
//controller
const campgrounds = require("../controllers/campgrounds");
const catchAsync = require("../Utils/catchAsync");
const { isLoggedIn, isAuthor, validateCampground } = require("../middleware");
//cloudinary storage
const { storage } = require("../cloudinary");

//multer for file
const multer = require("multer");
//specify storage
const upload = multer({ storage });

//get: index page to show all
//post: submit form to create new campground
router
  .route("/")
  .get(catchAsync(campgrounds.index))
  .post(
    isLoggedIn,
    upload.array("image"),
    validateCampground,
    catchAsync(campgrounds.createCampground)
  );
//field name is image

//new campground only accessible when logged in
router.get("/new", isLoggedIn, campgrounds.renderNewForm);

//get: show one campgrounds, if not logged in, no review form
//put: update campground
//delete: delete campground
router
  .route("/:id")
  .get(catchAsync(campgrounds.showCampground))
  .put(
    isLoggedIn,
    isAuthor,
    upload.array("image"),
    validateCampground,
    catchAsync(campgrounds.updateCampground)
  )
  .delete(isAuthor, catchAsync(campgrounds.deleteCampground));

//edit campground
router.get(
  "/:id/edit",
  isLoggedIn,
  isAuthor,
  catchAsync(campgrounds.renderEditForm)
);

module.exports = router;
