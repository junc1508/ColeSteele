//All approaches to RESTful routing

const express = require("express");
const app = express();
path = require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");

//link to localport 3000

app.listen(3000, () => {
  console.log("listen to port 3000");
});

//define request body for post
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//set view engine and view folder
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(methodOverride("_method"));

//airbnb house data array
let airbnb = [
  {
    id: uuidv4(),
    owner: "Steve",
    house: "2124 Maple Ave, Dallas",
  },
  {
    id: uuidv4(),
    owner: "Bucky",
    house: "21 Jump street, New York",
  },
  {
    id: uuidv4(),
    owner: "Chase",
    house: "2033 Brooklyn Blvd, New York",
  },
  {
    id: uuidv4(),
    owner: "Holmmes",
    house: "221 Becker Street, London",
  },
];

//Index - show all airbnbs with GET
app.get("/houses", (req, res) => {
  res.render("houses/index", { airbnb });
});

//new - get to form to input new aribnb with GET
app.get("/houses/new", (req, res) => {
  res.render("houses/new");
});

//create - create new airbnb with POST
app.post("/houses", (req, res) => {
  const { owner, house } = req.body;
  airbnb.push({ owner, house, id: uuidv4() });
  res.redirect("/houses");
});

//show - display airbnb by id
app.get("/houses/:id", (req, res) => {
  const { id } = req.params;
  const targetAirbnb = airbnb.find((house) => house.id === id);
  res.render("houses/show", { airbnb: targetAirbnb });
});

//edit - GET
app.get("/houses/:id/edit", (req, res) => {
  const { id } = req.params;
  const targetAirbnb = airbnb.find((house) => house.id === id);
  res.render("houses/edit", { targetAirbnb });
});

//update - PATCH (through method override)
app.patch("/houses/:id", (req, res) => {
  const { id } = req.params;
  const newAddress = req.body.house;
  const targetAirbnb = airbnb.find((house) => house.id === id);
  targetAirbnb.house = newAddress;
  //   console.log(newAddress);
  res.redirect("/houses");
});

//delete
app.delete("/houses/:id", (req, res) => {
  const { id } = req.params;
  airbnb = airbnb.filter((a) => a.id !== id);
  res.redirect("/houses");
});
