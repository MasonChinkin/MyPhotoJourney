const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const PhotoSchema = new Schema({
  city: {
    type: String,
    required: true
  },
  region: {
    type: String
  },
  country: {
    type: String,
    required: true
  },
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  },
  photoDateTime: {
    type: Date,
    required: true
  },
  description: {
    type: String
  },
  jounreyId: {
    type: Schema.Types.ObjectId,
    ref: "journeys",
    required: true,
    index: true
  },
});

module.exports = Photo = mongoose.model('photos', PhotoSchema);