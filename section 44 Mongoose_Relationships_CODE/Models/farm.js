//one to many example, embedded + reference

const mongoose = require("mongoose");
const { Schema } = mongoose;
//default port is 27017, movieApp is the database to use
//if the database does not exist in mongoDB, mongoose will create it
mongoose
  .connect("mongodb://127.0.0.1:27017/relationshipDemo")
  .then(() => {
    console.log("CONNECTION OPEN!!");
  })
  .catch((err) => {
    console.log("ERROR!");
    console.log(err);
  });

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  season: {
    type: String,
    enum: ["Spring", "Summer", "Fall", "Winter"],
  },
});

const Product = mongoose.model("Product", productSchema);
// Product.insertMany([
//   { name: "Goddess Melon", price: 4.99, season: "Summer" },
//   { name: "Sugar Baby Watermelon", price: 5.99, season: "Summer" },
//   { name: "Asparagus", price: 3.99, season: "Spring" },
// ]);

const farmSchema = new mongoose.Schema({
  name: String,
  city: String,
  products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
});

const Farm = new mongoose.model("Farm", farmSchema);

// const makeFarm = async () => {
//   const farm = new Farm({ name: "Full Belly Farms", city: "Guida, CA" });
//   const melon = await Product.findOne({ name: "Goddess Melon" });
//   farm.products.push(melon);
//   await farm.save();
//   console.log(farm);
// };
// makeFarm();

const addProduct = async () => {
  const farm = await Farm.findOne({ name: "Full Belly Farms" });
  const watermelon = await Product.findOne({ name: "Sugar Baby Watermelon" });
  farm.products.push(watermelon);
  await farm.save();
  console.log(farm);
};

//Mongoose populate
Farm.findOne({ name: "Full Belly Farms" })
  .populate("products")
  .then((farm) => console.log(farm));
