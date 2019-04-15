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
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
    index: true
  },
  dateCreated: {
    type: Date,
    default: Date.now
  }
});


module.exports = Journey = mongoose.model('journeys', JourneySchema);