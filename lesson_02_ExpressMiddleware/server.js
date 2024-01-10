const express = require("express");
const app = express();
const path = require("path");
const { logger } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const PORT = process.env.PORT || 3500;

app.use(logger); // log the server RESTFUL Apis activities

app.use(cors(corsOptions)); // by default, no CORS (others cannot access the apis of this site), need to enable it (choose who is allow to access our apis)

app.use(express.json());

app.use(cookieParser()); // parse cookies

app.use("/", express.static(path.join(__dirname, "public"))); // tell express where the static resources are at

app.use("/", require("./routes/root"));

// routes that cannot be resolved will send back different responses based on the requests accept header
app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
