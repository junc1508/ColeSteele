const express = require("express");
const app = express();
const morgan = require("morgan");
const AppError = require("./AppError");
//log every request with morgan
// app.use(morgan("common"));

//middleware
// app.use((req, res, next) => {
//   console.log("this is my first middleware");
//   return next();
// });

//more middlewares
app.use((req, res, next) => {
  req.requestTime = Date.now();
  console.log(req.method.toUpperCase(), req.path);
  next();
});

app.use("/dogs", (req, res, next) => {
  console.log("dogs middleware");
  return next();
});

//middleware to protect secrete page
const verifyPassword = (req, res, next) => {
  //only password is assigned,
  //if query is { food : chicken }
  // there is no value for password
  const { password } = req.query;
  if (password === "chickennugget") {
    return next();
  }
  // res.send("sorry you need a password");
  throw new AppError("password required", 401);
};

app.get("/", (req, res) => {
  console.log(`Request Date: ${req.requestTime}`);
  res.send("HOME PAGE");
});

app.get("/error", (req, res) => {
  //chicken is undefined, so returns reference error
  chicken.fly();
});

app.get("/dogs", (req, res) => {
  console.log(`Request Date: ${req.requestTime}`);
  res.send("WOOF");
});
app.get("/secret", verifyPassword, (req, res) => {
  res.send("This is my secret");
});

//fake admin page
app.get("/admin", (req, res) => {
  throw new AppError("You are not an admin", 403);
});

//for unmatched
app.use((req, res) => {
  res.status(404).send("NOT FOUND");
});

//my error handling middleware
// app.use((err, req, res, next) => {
//   console.log("**********************************");
//   console.log("**************ERROR***************");
//   console.log("**********************************");
//   // res.status(500).send("error message");
//   next(err);
// });

app.use((err, req, res, next) => {
  const { status = 500, message = "Something Went Wrong" } = err;
  res.status(status).send(message);
});

app.listen(3000, () => {
  console.log("Listening to port 3000");
});
