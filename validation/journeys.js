const Validator = require('validator');
const User = require('../models/User');

module.exports = async function validateJourneyInput(data) {
  let errors = {};

  debugger;

  if (data.journey.name === undefined || Validator.isEmpty(data.journey.name)) {
    errors.name = "Name field is required";
  }
  if (!data.user) {
    errors.user = "Journey must belong to a user";
  }
  try {
    const user = await User.findById(data.user.id)
  } catch(err) {
    errors.user = "User id is invalid";
  }

  if (Object.values(data.photos).length === 0) {
    errors.photos = "Journey must contain photos"
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  }
}