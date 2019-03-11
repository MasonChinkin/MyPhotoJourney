const NodeGeocoder = require('node-geocoder');
const Validator = require('validator');
const geocoder = NodeGeocoder({ provider: 'openstreetmap' });

module.exports = function validatePhotoInput(data) {
  let errors = {};
  let geodata = {};

  if (Validator.isEmpty(data.city)) {
    errors.city = "City field is required";
    return ({
      errors,
      isValid: false,
    });
  }

  let options = {city: data.city}
  if (data.country) {
    options.country = data.country;
  }

  geocoder.geocode(options)
    .then(function(res) {
      if (res.length === 0) {
        errors.city = "Enter a valid city";
      } else {
        let firstResult = res[0];
        geodata.longitude = firstResult.longitude;
        geodata.latitude = firstResult.latitude;
        if (!data.country) {
          geodata.country = firstResult.country;
        }
      }

    })
    .catch(function(err) {
      errors.api = err
    });

  return({
    errors,
    geodata,
    isValid: Object.keys(errors).length === 0,
  });

}

