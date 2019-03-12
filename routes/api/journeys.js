const express = require("express");
const router = express.Router();
const passport = require("passport");
const Journey = require("../../models/Journey");
const Photo = require("../../models/Photo");
const validateJourneyInput = require("../../validation/journeys");
const NodeGeocoder = require("node-geocoder");
const geocoder = NodeGeocoder({ provider: "openstreetmap" });

router.get("/test", (req, res) =>
  res.json({ msg: "This is the journeys route" })
);

router.post(
  "/",
  // passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    debugger;

    const { errors, isValid } = await validateJourneyInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newJourney = new Journey({
      name: req.body.journey.name,
      userId: req.body.user.id
    });

    if (req.body.journey.description) {
      newJourney.description = req.body.journey.description;
    }

    newJourney.save(function(err, newJourney) {
      if (err) {
        return res.status(400).json(err);
      } else {
        debugger;
        return res.status(200).json(newJourney);
      }
    });
  }
);

router.get("/:journey_id", (req, res) => {
  Promise.all([
    Journey.findById(req.params.journey_id),
    Photo.find({ journeyId: req.params.journey_id }).sort({ photoDateTime: 1 })
  ])
    .then((journey, photos) => res.json({ journey, photos }))
    .catch(err => res.status(400).json(err));
});

module.exports = router;
