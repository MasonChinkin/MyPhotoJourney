import { RECEIVE_JOURNEY } from "../actions/journey_actions";
import { RECEIVE_CURRENT_USER } from '../actions/session_actions';

const JourneysReducer = (state = {}, action) => {
  Object.freeze(state);
  const newState = Object.assign({}, state)
  switch (action.type) {
    case RECEIVE_JOURNEY:
      newState[action.journeyPayload.journey.id] = action.journeyPayload.journey; 
      return newState;
    case RECEIVE_CURRENT_USER:
      return Object.assign({}, state, action.currentUser.journeys);
    default:
      return state;
  }
};

export default JourneysReducer;