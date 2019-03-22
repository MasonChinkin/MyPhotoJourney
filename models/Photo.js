const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const PhotoSchema = new Schema({
  city: {
    type: String  
  },
  region: {
    type: String
  },
  country: {
    type: String
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
  journeyId: {
    type: Schema.Types.ObjectId,
    ref: "journeys",
    required: true,
    index: true
  },
  photoUrl: {
    type: String,
    required: true
  }
});

module.exports = Photo = mongoose.model('photos', PhotoSchema);