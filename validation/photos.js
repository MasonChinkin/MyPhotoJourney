const NodeGeocoder = require("node-geocoder");
const Validator = require("validator");
const Journey = require("../models/Journey");
const geocoder = NodeGeocoder({ provider: "openstreetmap" });

module.exports = async function validatePhotoInput(data) {
  let errors = {};

  if(data.lat === undefined || data.long === undefined || Validator.isEmpty(data.lat) || Validator.isEmpty(data.long)){
    if (data.city === undefined || Validator.isEmpty(data.city)) {
      errors.city = "City field is required";
    }
    if (data.country === undefined || Validator.isEmpty(data.country)) {
      errors.country = "Country field is required";
    }
  }
  if (data.photoDateTime === undefined) {
    errors.dateTime = "Date/Time is required";
  }

  if (isNaN(data.photoDateTime.getTime())) {
    errors.dateTime = "Enter a valid date";
  }

  try {
    const journey = await Journey.findById(data.journeyId);
  } catch (err) {
    errors.journey = "Journey id is invalid";
  }

  console.log(errors);


  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};
