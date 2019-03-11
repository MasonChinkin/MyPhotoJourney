const express = require("express");
const router = express.Router();
const passport = require('passport');
const Journey = require('../../models/Journey');

router.get("/test", (req, res) => res.json({ msg: "This is the journeys route" }));

router.post('/journeys',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // const { errors, isValid } = validatePostInput(req.body);

    // if (!isValid) {
    //   return res.status(400).json(errors);
    // }

    const newJourney = new Journey({
      text: req.body.text,    
      user: req.user.id
    });

    newJourney.save();

    Object.values(req.body.photos).forEach(photo => {
      const newPhoto = new Photo({
        city: photo.city,
        region: photo.province || null,
        country: photo.country,
        photoDateTime: photo.photoDateTime,
        description: photo.description,
        journeyId: req.journey.id
      });

      newPhoto
        .save();
    });
  }
);

router.get('/journeys/:journey_id',
  (req, res) => {
    Promise.all([
      Journey.findById(req.params.journey_id),
      Photo
        .find({ journeyId: req.params.journey_id })
        .sort({ photoDateTime: 1 })
    ]).then((journey, photos) => res.json({ journey, photos }))
      .catch(err => res.status(400).json(err));
  }
);

module.exports = router;