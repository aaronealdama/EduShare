// Packages
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/edushare";
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 8080;

const app = express();

app.use(logger("dev"));

app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: false }));

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

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
