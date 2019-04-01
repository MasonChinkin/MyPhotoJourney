import {
  RECEIVE_CURRENT_JOURNEY,
  CLEAR_UI_JOURNEY
} from "../actions/journey_actions";
import { RECEIVE_PHOTO } from "../actions/photo_actions";
import { RECEIVE_LOCATION_DATA } from "../actions/location_actions";

const initialState = { currentJourneyId: null, photoUpload: false, locationData: [] };

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
      newState.locationData = [];
      return newState;
    case RECEIVE_LOCATION_DATA:
      newState.locationData = action.data;
      return newState;
    default:
      return state;
  }
}
