const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const AppError = require("./AppError");

//import models
const Product = require("./models/product");

mongoose
  .connect("mongodb://127.0.0.1:27017/farmStand2")
  .then(() => {
    console.log("MONGO CONNECTION OPEN!!");
  })
  .catch((err) => {
    console.log("MONGO ERROR!");
    console.log(err);
  });

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
//for post
app.use(express.urlencoded({ extended: true }));
//method override for patch, put, delete
app.use(methodOverride("_method"));

const categories = ["fruit", "vegetable", "dairy"];

// show all the products
app.get("/products", async (req, res) => {
  //find all products, takes time, so async
  const { category } = req.query;
  //if there is a category,
  //we will route to the /products?category=category
  //if not, we will see all product
  if (category) {
    const products = await Product.find({ category: category });
    //pass category to define title
    res.render("products/index", { products, category });
  } else {
    const products = await Product.find({});
    res.render("products/index", { products, category: "All" });
  }
});
// create one product
// get the form
app.get(
  "/products/new",
  wrapAsync((req, res, next) => {
    res.render("products/new", { categories });
  })
);

// post the form, set up where it submit to
// and create product (add to database)
app.post(
  "/products",
  wrapAsync(async (req, res, next) => {
    //we need error handling and data validation

    const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect(`/products/${newProduct._id}`);
  })
);

function wrapAsync(fn) {
  return function (req, res, next) {
    fn(req, res, next).catch((e) => next(e));
  };
}

// show one product using id
app.get(
  "/products/:id",
  wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    //need to await, otherwise gives query
    //if the id is wrong, product does not exist
    const product = await Product.findById(id);
    if (!product) {
      throw new AppError("object not found", 404);
    }
    res.render("products/show", { product });
  })
);

// update product using id
// get the edit form
app.get(
  "/products/:id/edit",
  wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      throw new AppError("object not found", 404);
    }
    res.render("products/edit", { product, categories });
  })
);
//update request
app.put(
  "/products/:id",
  wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, {
      //new true returns the updated value
      runValidators: true,
      new: true,
    });
    res.redirect(`/products/${id}`);
  })
);

// delete one product
app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  const deleteProduct = await Product.findByIdAndDelete(id);
  res.redirect("/products");
});

const handleValidationError = (err) => {
  console.dir(err);
  return err;
};
//logger of error name
app.use((err, req, res, next) => {
  console.log(err.name);
  if (err.name === "ValidationError") err = handleValidationError(err);
  next(err);
});
//error middleware
app.use((err, req, res, next) => {
  const { status = 500, message = "Something went wrong" } = err;
  res.status(status).send(message);
});

//listen to port 3000
app.listen(3000, () => {
  console.log("APP IS LISTENING ON PORT 3000!");
});
