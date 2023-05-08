const express = require("express");
const app = express();
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");

app.listen(3000, () => {
  console.log("ON PORT 3000");
});

//request body for post
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//method override for form to submit patch
app.use(methodOverride("_method"));

//set view engine for ejs and directory path for views
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//get comments
let comments = [
  {
    id: uuidv4(),
    username: "Todd",
    comment: "lol that is so funny!",
  },
  {
    id: uuidv4(),
    username: "Skyler",
    comment: "I like to go birdwatching with my dog",
  },
  {
    id: uuidv4(),
    username: "Sk8erBoi",
    comment: "Plz delete your account, Todd",
  },
  {
    id: uuidv4(),
    username: "onlhysayswoof",
    comment: "woof woof woof",
  },
];

//index: show all comments and pass through the comments
app.get("/comments", (req, res) => {
  res.render("comments/index", { comments });
});

//new comment page
app.get("/comments/new", (req, res) => {
  res.render("comments/new");
});
//post new comment
app.post("/comments", (req, res) => {
  //create the new comment
  const { username, comment } = req.body;
  comments.push({ username, comment, id: uuidv4() });
  //redirect to show all comments including the new entry
  res.redirect("/comments");
});

// show: display specific comment
app.get("/comments/:id", (req, res) => {
  const { id } = req.params;
  const comment = comments.find((c) => c.id === id);
  res.render("comments/show", { comment });
});

//edit: get access to edit form
app.get("/comments/:id/edit", (req, res) => {
  const { id } = req.params;
  const comment = comments.find((c) => c.id === id);
  // we might want to edit based on previous content
  // so pass the original content to edit page
  res.render("comments/edit", { comment });
});

//update a comment with patch
app.patch("/comments/:id", (req, res) => {
  const { id } = req.params;
  // the new comment from req
  const newCommentText = req.body.comment;
  // find the original comment with id from data base
  const foundComment = comments.find((c) => c.id === id);
  foundComment.comment = newCommentText;
  res.redirect("/comments");
});

//delete: remove the entire comment from comments array
app.delete("/comments/:id", (req, res) => {
  //use filter to find no match
  //make a copy instead of updating original ar ray
  const { id } = req.params;
  comments = comments.filter((c) => c.id !== id);
  res.redirect("/comments");
});

//
//
//

app.get("/tacos", (req, res) => {
  res.send("GET /tacos response");
});

app.post("/tacos", (req, res) => {
  const { meat, qty } = req.body;
  res.send(`OK, here are your ${qty} ${meat}`);
});
