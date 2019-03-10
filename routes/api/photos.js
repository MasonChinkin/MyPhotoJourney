const express = require("express");
const router = express.Router();
const passport = require('passport');
const Photo = require('../../models/Photo');

router.get("/test", (req, res) => res.json({ msg: "This is the photos route" }));

router.post('/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // const { isValid, errors } = validatePhotoInput(req.body);

    // if (!isValid) return res.status(400).json.errors;

    const newPhoto = new Photo({
      city: req.body.city,
      province: req.body.province,
      country: req.body.country,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      photoDateTime: req.body.photoDateTime,
      description: req.body.description,
      journeyId: req.journey.id
    });

    newPhoto
      .save();
  }
);

router.get('/journey/:journey_id',
  (req, res) => {
    Photo
      .find({ journeyId: req.params.journey_id })
      .sort({ photoDateTime: 1 }) // sorted oldest to newest
      .then(photos => res.json(photos))
      .catch(err => res.status(400).json(err));
  }
);

module.exports = router;