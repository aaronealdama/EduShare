// Packages
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/edushare";
const bodyParser = require("body-parser");
const path = require("path");

const PORT = process.env.PORT || 8080;

const app = express();

app.use(logger("dev"));

app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));
}

if (process.env.NODE_ENV === "production") {
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/client/build/index.html"));
  });
}

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useFindAndModify: false,
});

// API routes connected to express server
require("./routes/signup")(app);
require("./routes/login")(app);
require("./routes/userRoutes")(app);
require("./routes/videoRoutes")(app);
require("./routes/buttonRoutes")(app);
require("./routes/notificationRoutes")(app);
require("./routes/emailRoutes")(app);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
