const express = require("express");
const app = express();

const router = express.Router();

//url?isAdmin=true
router.use((req, res, next) => {
  if (req.query.isAdmin) {
    next();
  }
  res.send("Sorry not an admin!");
});

router.get("/topsecret", (req, res) => {
  res.send("This is top secret!");
});

router.get("/deleteeverything", (req, res) => {
  res.send("OK deleting all!");
});

module.exports = router;
