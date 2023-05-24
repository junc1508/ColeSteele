//set campground - basic model for mongoose/mongoDB

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review");

// https://res.cloudinary.com/dasrff0vo/image/upload/w_200/v1684813605/YelpCamp/zx9uddsddfnfteukeji3.jpg
const ImageSchema = new Schema({
  url: String,
  filename: String,
});

ImageSchema.virtual("thumbnail").get(function () {
  return this.url.replace("/upload", "/upload/w_200");
});

const campgroundSchema = new Schema({
  title: String,
  images: [ImageSchema],
  geometry: {
    type: {
      type: String, // Don't do `{ geometry: { type: String } }`
      enum: ["Point"], // 'geometry.type' must be 'Point'
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  price: Number,
  description: String,
  location: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
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
