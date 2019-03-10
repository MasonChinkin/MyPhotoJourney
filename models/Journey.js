const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const JourneySchema = new Schema({
  name: {
    type: String,
    required: true,
    index: true
  },
  description: {
    type: String
  },
  userId: {
    type: Number,
    required: true,
    index: true
  },
});


module.exports = Journey = mongoose.model('users', JourneySchema);