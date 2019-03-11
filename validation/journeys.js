const passport = require('passport');
const validatePhotoInput = require('./photos');
const Validator = require('validator');

module.exports = function validateJourneyInput(data) {
  let errors = {};

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }
  if (!data.user) {
    errors.user = "Journey must belong to a user";
  }

  Object.values(data.photos).forEach( function(photo) {
    let photoInfo = validatePhotoInput(photo);
    if(!photoInfo.isValid) {
      errors.photos = photoInfo.errors;
    } else {
      
    }
  })

  return {
    errors,
    isValid: Object.keys(errors) === 0,
  }
}