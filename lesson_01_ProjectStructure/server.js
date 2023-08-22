const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3500;

app.use("/", express.static(path.join(__dirname, "/public"))); // telling express where to find static files

app.use("/", require("./routes/root"));

app.all("*", (req, res) => {
  res.status(404);
  // responses based on the html request headers
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
