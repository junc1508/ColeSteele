const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser("thisismysecret"));
app.get("/greet", (req, res) => {
  const { name = "Anon" } = req.cookies;
  res.send(`Hey there! ${name}`);
});

//send cookie: set name by cookies
app.get("/setname", (req, res) => {
  res.cookie("name", "Diedies");
  res.send("OK SEND YOU A COOKIE");
});

//send signed cookie
app.get("/getsignedcookie", (req, res) => {
  res.cookie("fruit", "grape", { signed: true });
  res.send(req.signedCookies);
});

//unsign
app.get("/verifyfruit", (req, res) => {
  res.send("unsign cookies");
});

app.listen(3000, () => {
  console.log("SERVING at 3000!");
});
