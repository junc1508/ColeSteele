//set campground - basic model for mongoose/mongoDB

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review");

const campgroundSchema = new Schema({
  title: String,
  image: String,
  price: Number,
  description: String,
  location: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

//middleware to delete reviews associated
campgroundSchema.post("findOneAndDelete", async function (camp) {
  //if we found a campground to delete
  if (camp) {
    await Review.deleteMany({
      _id: {
        $in: camp.reviews,
      },
    });
  }
});

module.exports = mongoose.model("Campground", campgroundSchema);
