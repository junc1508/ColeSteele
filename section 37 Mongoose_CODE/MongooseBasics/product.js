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

//create schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLenth: 20,
  },
  price: {
    type: Number,
    required: true,
    min: [0, "price must be positive"],
  },
  onSale: {
    type: Boolean,
    default: false,
  },
  categories: {
    type: [String],
  },
  qty: {
    online: {
      type: Number,
      default: 0,
    },
    inStore: {
      type: Number,
      default: 0,
    },
  },
  size: {
    type: String,
    enum: ["S", "M", "L"],
  },
});

//instance method
productSchema.methods.toggleOnSale = function () {
  this.onSale = !this.onSale;
  return this.save();
};
//instance method 2
productSchema.methods.addCategory = function (newCat) {
  this.categories.push(newCat);
  return this.save();
};

//static method
productSchema.statics.fireSale = function () {
  //this refer to the class
  return this.updateMany({}, { onSale: true, price: 0 });
};

//operation buffering, so we don't need to upt in the connect
//create model
const Product = mongoose.model("Product", productSchema);

//call static method
Product.fireSale().then((res) => console.log(res));

//better to use try and catch
//call instance method
const findProduct = async () => {
  const foundProduct = await Product.findOne({ name: "Tire pump" });
  console.log(foundProduct);
  await foundProduct.toggleOnSale();
  console.log(foundProduct);
};

findProduct();

const bike = new Product({
  name: "Tire pump",
  price: 19.95,
  categories: ["cycling", "pump"],
});

bike
  .save()
  .then((data) => {
    console.log("IT WORKED");
    console.log(data);
  })
  .catch((err) => {
    console.log("ERROR");
    console.log(err);
  });

//shows the new data when we update
Product.findOneAndUpdate(
  { name: "Tire pump" },
  { price: -19.99 },
  { new: true, runValidators: true }
)
  .then((data) => {
    console.log("IT WORKED");
    console.log(data);
  })
  .catch((err) => {
    console.log("ERROR");
    console.log(err);
  });
