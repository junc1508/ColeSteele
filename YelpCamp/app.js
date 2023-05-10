const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
//ejs mate template engine
const ejsMate = require("ejs-mate");
const Campground = require("./models/campground");
const methodOverride = require("method-override");

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

//handle error after connection
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello from Yelp Camp");
});

//views/campgrounds/index: show all campgrounds
app.get("/campgrounds", async (req, res) => {
  const campgrounds = await Campground.find();
  res.render("campgrounds/index", { campgrounds });
});

//new campground
app.get("/campgrounds/new", (req, res) => {
  res.render("campgrounds/new");
});
app.post("/campgrounds", async (req, res) => {
  const campground = new Campground(req.body.campground);
  await campground.save();
  res.redirect(`/campgrounds/${campground._id}`);
});

//show one campgrounds
app.get("/campgrounds/:id", async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  res.render("campgrounds/show", { campground });
});

//edit campground
app.get("/campgrounds/:id/edit", async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  res.render("campgrounds/edit", { campground });
});
app.put("/campgrounds/:id", async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findByIdAndUpdate(
    id,
    { ...req.body.campground },
    { new: true }
  );
  res.redirect(`/campgrounds/${id}`);
});

//delete campground
app.delete("/campgrounds/:id", async (req, res) => {
  const { id } = req.params;
  await Campground.findByIdAndDelete(id);
  res.redirect("/campgrounds");
});

// app.get("/makecampground", async (req, res) => {
//   const camp = new Campground({
//     title: "my backyard",
//     description: "cheap camping",
//   });
//   await camp.save();
//   res.send(camp);
// });

app.listen(3000, () => {
  console.log("Serving on port 3000");
});
