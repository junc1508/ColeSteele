//self contained, connect to mongoose and use Model.
const mongoose = require("mongoose");
const Campground = require("../models/campground");
const axios = require("axios");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
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

//return random number based on the length of an array
const sample = (array) => array[Math.floor(Math.random() * array.length)];
//call  unsplash and return medium image
async function seedImg() {
  try {
    const result = await axios.get("https://api.unsplash.com/photos/random", {
      params: {
        client_id: "yKiVuP46ObY2G8XSUiOhgusIvdzOvphOVjnrhdj8ZjE",
        collections: 483251,
      },
    });
    return result.data.urls.raw;
  } catch (err) {
    console.error(err);
  }
}

//seed data
//clear previous data
//create 200 random camp sites from random cities

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    //random number between 1 - 1000 for 1000 cities in cities
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      //your user id jun chen
      author: "6469707f6b415a7c32dd99c4",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      images: [
        {
          url: await seedImg(),
          filename: "YelpCampSeeds",
        },
      ],
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit excepturi atque, animi assumenda aliquid modi libero blanditiis voluptatem recusandae iste ratione laudantium rerum nesciunt velit incidunt quasi doloribus, aut vero?",
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
    });
    await camp.save();
  }
};

//close the database connection
seedDB().then(() => {
  mongoose.connection.close();
});
