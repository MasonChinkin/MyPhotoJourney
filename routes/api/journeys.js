const express = require("express");
const router = express.Router();
const passport = require("passport");
const Journey = require("../../models/Journey");
const Photo = require("../../models/Photo");
const validateJourneyInput = require("../../validation/journeys");

router.get("/test", (req, res) =>
  res.json({ msg: "This is the journeys route" })
);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
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

    newJourney.save(function (err, newJourney) {
      if (err) {
        return res.status(400).json(err);
      } else {
        return res.status(200).json(newJourney);
      }
    });
  }
);

// Get journeys by user for profile page
router.get("/user/:user_id", async (req, res) => {
  const user = req.params.user_id;
  const journeys = await Journey.find({userId: user});
  return res.status(200).json(journeys);
});

router.get("/:journey_id", (req, res) => {
  Promise.all([
    Journey.findById(req.params.journey_id),
    Photo.find({ journeyId: req.params.journey_id }).sort({ photoDateTime: 1 })
  ])
    .then((response) => res.status(200).json(response))
    .catch(err => res.status(400).json(err));
});

router.delete("/:journey_id", async (req, res) => {
  const del = await Journey.deleteOne({_id: req.params.journey_id});
  if(del.n){
    return res.status(200).json({id: req.params.journey_id});
  } else{
    return res.status(400).json({});
  }
});

module.exports = router;
