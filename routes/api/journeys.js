const express = require("express");
const router = express.Router();
const passport = require('passport');
const Journey = require('../../models/Journey');
const Photo = require('../../models/Photo');
const validateJourneyInput = require('../../validation/journeys');
const validatePhotoInput = require('../../validation/photos');
const NodeGeocoder = require('node-geocoder');
const geocoder = NodeGeocoder({provider: "openstreetmap"});

router.get("/test", (req, res) => res.json({ msg: "This is the journeys route" }));

router.post('/',
  // passport.authenticate('jwt', { session: false }),
  async (req, res) => {

    const { errors, isValid } = await validateJourneyInput(req.body)    
    
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newJourney = new Journey({
      name: req.body.journey.name,
      description: req.body.description,    
      userId: req.body.user.id
    });

    newJourney.save();
    let newPhotos = [];
        
    Object.values(req.body.photos).forEach( async (photo) => {

      const { errors, isValid } = validatePhotoInput(photo)
      if(!isValid) {
        return res.status(400).json({photos: errors});
      }

      let options = {city: photo.city, country: photo.country};
      let data = await geocoder.geocode(options)
      if (data.length === 0) {
        errors.location = "Enter a valid city/country location";
        return res.status(400).json(errors);
      }
      const firstResult = data[0];

      const newPhoto = new Photo({
        city: photo.city,
        region: photo.province || null,
        country: photo.country,
        photoDateTime: new Date(photo.photoDateTime),
        description: photo.description,
        latitude: firstResult.latitude,
        longitude: firstResult.longitude,
        journeyId: newJourney.id
      });

      newPhoto.save();
      newPhotos.push(newPhoto);
      if (newPhotos.length === Object.values(req.body.photos).length) {
        return res.status(200).json({newPhotos});
    }});
  }
);

router.get('/:journey_id',
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