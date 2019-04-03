const express = require('express');
const router = express.Router();
const NodeGeocoder = require('node-geocoder');
const geocoder = NodeGeocoder({provider: "openstreetmap", language: "en"});

router.post("/", (req, res) => {
  geocoder.geocode(req.body.location).then( (data) => {
    if (data.length === 0) {
      return res.status(400).json({location: "Location can't be found"});
    }
    if (!req.body.country && !req.body.state) {
      return res.status(200).json(data);
    } else {
      let filteredData = data;
      if (req.body.country) {
        filteredData = filteredData.filter( location => location.country === req.body.country);
      }
      if (req.body.state) {
        filteredData = filteredData.filter( location => location.state === req.body.state);
      }
      if (filteredData.length === 0) {
        return res.status(400).json({location: "Location can't be found"});
      }
      return res.status(200).json(filteredData);
    }
  });
})

module.exports = router;