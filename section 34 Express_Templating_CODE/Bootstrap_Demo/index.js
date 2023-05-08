const express = require("express");
const app = express();
const path = require("path");
const redditData = require("./data.json");

//serve the public folder as static
app.use(express.static(path.join(__dirname, "public")));
//set templating engine to EJS
app.set("view engine", "ejs");
//set the view directory relative to the executing file
app.set("views", path.join(__dirname, "/views"));

//set routing for root
app.get("/", (req, res) => {
  //we sent view engine to jes,
  //can do home instead of home.ejs
  //no need to do /views/home
  res.render("home.ejs");
});

//set routing for cats
app.get("/cats", (req, res) => {
  const cats = ["Blue", "Rocket", "Monty", "Stephanie", "Winston"];
  res.render("cats", { cats });
});

app.get("/rand", (req, res) => {
  //generate number and pass to render and template
  const num = Math.floor(Math.random() * 10) + 1;
  res.render("random.ejs", { rand: num });
});

// data from redditData with pattern and get info from json file
app.get("/r/:subreddit", (req, res) => {
  const { subreddit } = req.params;
  const data = redditData[subreddit];
  //if the data exist in the json
  if (data) {
    res.render("subreddit", { ...data });
    //else, subreddit not found
  } else {
    res.render("notfound", { subreddit });
  }
});

//link to server
app.listen(3000, () => {
  console.log("Listening on port 3000");
});
