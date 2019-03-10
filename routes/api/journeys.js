const express = require("express");
const router = express.Router();
const passport = require('passport');
const Journey = require('../../models/Journey');

router.get("/test", (req, res) => res.json({ msg: "This is the journeys route" }));

router.post('/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // const { isValid, errors } = validateJourneyInput(req.body);

    // if (!isValid) return res.status(400).json.errors;

    const newJourney = new Journey({
      name: req.body.name,
      description: req.body.description,
      userId: req.user.id
    });

    newJourney
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