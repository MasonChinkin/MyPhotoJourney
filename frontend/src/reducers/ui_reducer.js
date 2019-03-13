import {
  RECEIVE_CURRENT_JOURNEY,
  CLEAR_UI_JOURNEY
} from "../actions/journey_actions";

const initialState = { currentJourneyId: null };

export default function(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_CURRENT_JOURNEY:
      return { currentJourneyId: action.journeyPayload.journey._id };
    case CLEAR_UI_JOURNEY:
      return initialState;
    default:
      return state;
  }
}
