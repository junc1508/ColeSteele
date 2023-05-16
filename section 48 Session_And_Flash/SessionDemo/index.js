const express = require("express");
const app = express();
const session = require("express-session");

const sessionOptions = {
  secret: "thisisnotagoodsecret",
  resave: false,
  saveUninitialized: false,
};
//middleware to configure express session with secret
app.use(session(sessionOptions));

//keep track of how many times a page is viewed
app.get("/viewcount", (req, res) => {
  if (req.session.count) {
    req.session.count += 1;
  } else {
    req.session.count = 1;
  }
  res.send(`You have viewed this page ${req.session.count} times`);
});

app.get("/register", (req, res) => {
  const { username = "Anon" } = req.query;
  req.session.username = username;
  res.redirect("/greet");
});
app.get("/greet", (req, res) => {
  const { username } = req.session;
  res.send(`Welcomeback ${username}`);
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});
