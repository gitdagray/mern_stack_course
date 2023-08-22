const express = require("express");
const router = express.Router();
const path = require("path");

router.get("^/$|/index(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "index.html")); // runs the index.html file whenever the route is at "/" or "/index" or "/index.html"
});

module.exports = router;
