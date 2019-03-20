import {
  RECEIVE_JOURNEY,
  RECEIVE_USER_JOURNEYS,
  RECEIVE_JOURNEY_DELETE
} from "../actions/journey_actions";
import { RECEIVE_CURRENT_USER } from "../actions/session_actions";

const JourneysReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_JOURNEY:
      newState[action.journeyPayload.data[0]._id] =
        action.journeyPayload.data[0]; // journey
      return newState;
    case RECEIVE_CURRENT_USER:
      return Object.assign({}, state, action.currentUser.journeys);
    case RECEIVE_USER_JOURNEYS:
      action.currentUserJourneys.forEach(journey => {
        newState[journey._id] = journey;
      });
      return newState;
    case RECEIVE_JOURNEY_DELETE:
      delete newState[action.journeyId];
      return newState;
    default:
      return state;
  }
};

export default JourneysReducer;
