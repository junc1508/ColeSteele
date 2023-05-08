const mongoose = require("mongoose");
//default port is 27017, movieApp is the database to use
//if the database does not exist in mongoDB, mongoose will create it
mongoose
  .connect("mongodb://127.0.0.1:27017/movieAapp")
  .then(() => {
    console.log("CONNECTION OPEN!!");
  })
  .catch((err) => {
    console.log("ERROR!");
    console.log(err);
  });

//creating schema
const { Schema } = mongoose;
const movieSchema = new Schema({
  title: String,
  year: Number,
  score: Number,
  rating: String,
});

//creating Movie model
const Movie = mongoose.model("Movie", movieSchema);
//make a new instance of movie, id is created automatically
// const amadius = new Movie({
//   title: "Amadeus",
//   year: 1986,
//   score: 9.2,
//   rating: "R",
// });
// amadius.save();

// Movie.insertMany([
//   { title: "Amelie", year: 2001, score: 8.3, rating: "R" },
//   { title: "Alien", year: 1979, score: 8.1, rating: "R" },
//   { title: "The Iron Giant", year: 1999, score: 7.5, rating: "PG" },
//   { title: "Stand By Me", year: 1986, score: 8.6, rating: "R" },
//   { title: "Moonrise Kingdom", year: 2012, score: 7.3, rating: "PG-13" },
// ]).then((data) => {
//   console.log("IT WORKS");
//   console.log(data);
// });
