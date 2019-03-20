import {
  RECEIVE_CURRENT_JOURNEY,
  CLEAR_UI_JOURNEY
} from "../actions/journey_actions";
import { RECEIVE_PHOTO } from "../actions/photo_actions";

const initialState = { currentJourneyId: null, photoUpload: false };

export default function(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_CURRENT_JOURNEY:
      return {
        currentJourneyId: action.journeyPayload.journey._id,
        photoUpload: false
      };
    case CLEAR_UI_JOURNEY:
      return initialState;
    case RECEIVE_PHOTO:
      let newState = Object.assign({}, state);
      newState.photoUpload = true;
      return newState;
    default:
      return state;
  }
}
