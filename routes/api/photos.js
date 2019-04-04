const express = require("express");
const router = express.Router();
const passport = require("passport");
const Photo = require("../../models/Photo");
const validatePhotoInput = require("../../validation/photos");
const upload = require("../../services/file-upload");

router.get("/test", async (req, res) =>
  res.json({ msg: "This is the photos  route" })
);

router.post("/validate", 
  passport.authenticate("jwt", { session: false }), 
  async (req, res) => {
    const { errors, isValid } = await validatePhotoInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    } else {
      return res.status(200).json("success");
    }

});

router.post(
  "/upload",
  upload.single("image"),
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {

    const newPhoto = new Photo({
      photoUrl: req.file.location,
      city: req.body.city,
      region: req.body.state,
      country: req.body.country,
      photoDateTime: new Date(req.body.date),
      description: req.body.description,
      latitude: req.body.lat,
      longitude: req.body.long,
      journeyId: req.body.journeyId
    });

    newPhoto.save(function(err, newPhoto) {
      if (err) {
        return res.status(400).json(err);
      } else {
        return res.status(200).json(newPhoto);
      }
    });
  }
);

module.exports = router;
