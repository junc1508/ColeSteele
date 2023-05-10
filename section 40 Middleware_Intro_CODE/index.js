const express = require("express");
const app = express();
const morgan = require("morgan");

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
  res.send("sorry you need a password");
};

app.get("/", (req, res) => {
  console.log(`Request Date: ${req.requestTime}`);
  res.send("HOME PAGE");
});

app.get("/dogs", (req, res) => {
  console.log(`Request Date: ${req.requestTime}`);
  res.send("WOOF");
});
app.get("/secret", verifyPassword, (req, res) => {
  res.send("This is my secret");
});

//for unmatched
app.use((req, res) => {
  res.status(404).send("NOT FOUND");
});

app.listen(3000, () => {
  console.log("Listening to port 3000");
});
