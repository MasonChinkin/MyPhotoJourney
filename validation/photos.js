const NodeGeocoder = require('node-geocoder');
const Validator = require('validator');
const geocoder = NodeGeocoder({ provider: 'openstreetmap' });

module.exports = function validatePhotoInput(data) {
  let errors = {};

  debugger;

  if (data.city === undefined || Validator.isEmpty(data.city)) {
    errors.city = "City field is required";
  }
  if (data.country === undefined || Validator.isEmpty(data.country)) {
    errors.country = "Country field is required";
  }
  if(data.photoDateTime === undefined) {
    errors.dateTime = "Date/Time is required";
  }

  const dateObj = new Date(data.photoDateTime);
  if (isNaN(dateObj.getTime())) {
    errors.dateTime = "Enter a valid date"
  }

  return({
    errors,
    isValid: Object.keys(errors).length === 0,
  });

}

