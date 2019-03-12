const express = require("express");
const mongoose = require("mongoose");
const app = express();
const db = require("./config/keys_dev").MongoUri;
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Routes
const users = require("./routes/api/users");
app.use("/api/users", users);
const journeys = require("./routes/api/journeys");
app.use("/api/journeys", journeys);
const userPhotos = require("./routes/api/photos");
app.use("/api/photos", userPhotos);

//TESTING DATA
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const photos = require("./testData/journey_map/map_test_data.json");
const map = require("./testData/journey_map/world.json");
app.get("/journeys", function(req, res, next) {
  res.send({ photos, map });
});
//^^^TESTING DATA

// TESTING AWS
const fileRoutes = require("./routes/api/image-upload");
app.use("/api", fileRoutes);
// TESTING AWS

const passport = require("passport");
app.use(passport.initialize());
require("./config/passport")(passport);

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
