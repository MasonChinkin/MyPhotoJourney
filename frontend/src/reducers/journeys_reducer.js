import { RECEIVE_JOURNEY } from "../actions/journey_actions";
import { RECEIVE_CURRENT_USER } from '../actions/session_actions';

const JourneysReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_JOURNEY:
      return action.journeyPayload.journey;
    case RECEIVE_CURRENT_USER:
      return Object.assign({}, state, action.currentUser.journeys);
    default:
      return state;
  }
};

export default JourneysReducer;