import { RECEIVE_JOURNEY } from "../actions/journey_actions";

const JourneysReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_JOURNEY:
      return action.journeyPayload.journey;
    default:
      return state;
  }
};

export default JourneysReducer;