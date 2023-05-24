const express = require("express");
const router = express.Router({ mergeParams: true });
const ExpressError = require("../Utils/ExpressError");
const catchAsync = require("../Utils/catchAsync");
//review controller
const reviews = require("../controllers/reviews");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware");
//add review for campground with validation
router.post("/", isLoggedIn, validateReview, catchAsync(reviews.createReview));

//delete review
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  catchAsync(reviews.deleteReviews)
);

module.exports = router;
