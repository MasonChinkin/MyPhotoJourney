const Validator = require("validator");
const Journey = require("../models/Journey");
const Photo = require("../models/Photo");

module.exports = async function validatePhotoInput(data) {
  let errors = {};

  if (data.journeyId === undefined) {
    errors.journey = "Photo must be attached to a journey";
    return {
      errors,
      isValid: Object.keys(errors).length === 0
    };
  }

  if(!data.lat || !data.long){
    if (data.city === undefined || Validator.isEmpty(data.city)) {
      errors.city = "City field is required";
    }
    if (data.country === undefined || Validator.isEmpty(data.country)) {
      errors.country = "Country field is required";
    }
    if (data.state === undefined || Validator.isEmpty(data.state)) {
      errors.state = "State field is required";
    }
  }

  let photoDateTime = new Date(data.date)

  if (photoDateTime === undefined) {
    errors.dateTime = "Date/Time is required";
  }

  if (isNaN(photoDateTime.getTime())) {
    errors.dateTime = "Enter a valid date";
  }

  try {
    const journey = await Journey.findById(data.journeyId);
  } catch (err) {
    errors.journey = "Journey id is invalid";
  }

  const journeyPhotos = await Photo.find({journeyId: data.journeyId});
  journeyPhotos.forEach( (currPhoto) => { 
    if (currPhoto.longitude === data.long && currPhoto.latitude === data.lat) {
      errors.location = "Only one picture per city in a photo journey!";
    }
    if (currPhoto.photoDateTime.getDate() === photoDateTime.getDate() &&
        currPhoto.photoDateTime.getMonth() === photoDateTime.getMonth() &&
        currPhoto.photoDateTime.getYear() === photoDateTime.getYear()) {
          errors.date = "Only one picture per day in a photo journey!";
    }
  });

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};