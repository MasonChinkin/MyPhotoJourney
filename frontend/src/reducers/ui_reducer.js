import {
  RECEIVE_CURRENT_JOURNEY,
  CLEAR_UI_JOURNEY
} from "../actions/journey_actions";
import { RECEIVE_PHOTO } from "../actions/photo_actions";
import { RECEIVE_LOCATION_DATA, RECEIVE_LOCATION_ERRORS, CLEAR_LOCATION_DATA } from "../actions/location_actions";

// Use proxy and handler to simulate default value for locationData (empty array)
const handler = {
  get: function(target, name) {
    return target.hasOwnProperty(name) ? target[name] : []
  }
}

const initialState = { currentJourneyId: null, photoUpload: false, locationData: new Proxy({}, handler) };

export default function(state = initialState, action) {
  Object.freeze(state);
  let newState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_CURRENT_JOURNEY:
      newState.currentJourneyId = action.journeyPayload.journey._id;
      newState.photoUpload = false;
      return newState;
    case CLEAR_UI_JOURNEY:
      return initialState;
    case RECEIVE_PHOTO:
      newState.photoUpload = true;
      newState.locationData = new Proxy({}, handler);;
      return newState;
    case RECEIVE_LOCATION_DATA:
      newState.locationData[action.idx] = action.data;
      return newState;
    case CLEAR_LOCATION_DATA:
      newState.locationData = new Proxy({}, handler);;
      return newState;
    case RECEIVE_LOCATION_ERRORS:
      newState.locationData[action.idx] = [];
      return newState;
    default:
      return state;
  }
}
