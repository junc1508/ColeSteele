const mongoose = require("mongoose");
//default port is 27017, movieApp is the database to use
//if the database does not exist in mongoDB, mongoose will create it
mongoose
  .connect("mongodb://127.0.0.1:27017/shopApp")
  .then(() => {
    console.log("CONNECTION OPEN!!");
  })
  .catch((err) => {
    console.log("ERROR!");
    console.log(err);
  });

//virtuals
//schema for person
const personSchema = new mongoose.Schema({
  first: String,
  last: String,
});

//define virtual property fullName
personSchema.virtual("fullName").get(function () {
  //this refers to the instance
  return `${this.first} ${this.last}`;
});

// const tammy = new Person({ first: "Tammy", last: "Chow" });
// tammy.fullName;

// tammy.toJSON({ virtuals: true }).fullName;
// console.log(tammy.toObject({ virtuals: true }));

//middleware
// before save
personSchema.pre("save", async function () {
  this.first = "Yo";
  console.log("ABOUT TO SAVE");
});
//after save
personSchema.post("save", async function () {
  this.last = "MAMA";
  console.log("JUST SAVED");
});

const Person = mongoose.model("Person", personSchema);
