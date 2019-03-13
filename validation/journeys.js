const Validator = require("validator");
const User = require("../models/User");

module.exports = async function validateJourneyInput(data) {
  let errors = {};

  if (data.journey.name === undefined || Validator.isEmpty(data.journey.name)) {
    errors.name = "Name field is required";
  }
  if (!data.user) {
    errors.user = "Journey must belong to a user";
  }

  try {
    const user = await User.findById(data.user.id);
  } catch (err) {
    errors.user = "User id is invalid";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};
