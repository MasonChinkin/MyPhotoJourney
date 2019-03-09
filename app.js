const express = require('express');
const mongoose = require('mongoose');
const app = express();
const db = require('./config/keys').MongoURI;
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Routes
const users = require("./routes/api/users");
app.use("/api/users", users);



const passport = require('passport');
app.use(passport.initialize());
require('./config/passport')(passport);


mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));