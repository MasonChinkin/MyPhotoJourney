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
    Journey
      .findById(req.params.journey_id)
      .then(journey => res.json(journey))
      .catch(err => res.status(400).json(err));
  }
);

module.exports = router;