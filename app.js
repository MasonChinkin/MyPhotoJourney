const express = require("express");
const mongoose = require("mongoose");
const app = express();
const db = require('./config/keys').MongoUri;
const bodyParser = require('body-parser');
const path = require('path'); 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'));
    app.get('/', (req, res) => {  
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

//Routes
const users = require("./routes/api/users");
app.use("/api/users", users);
const journeys = require("./routes/api/journeys");
app.use("/api/journeys", journeys);
const userPhotos = require("./routes/api/photos");
app.use("/api/photos", userPhotos);
const geodata = require("./routes/api/geodata");
app.use("/api/geodata", geodata);

//TESTING DATA
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// const photos = require("./testData/journey_map/map_test_data.json");
const map = require("./testData/journey_map/world.json");
app.get("/journeys", function (req, res, next) {
  res.send({ map });
});
//^^^TESTING DATA

// TESTING AWS
// const fileRoutes = require("./routes/api/image-upload");
// app.use("/api", fileRoutes);
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
