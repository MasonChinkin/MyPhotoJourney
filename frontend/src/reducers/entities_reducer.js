import { RECEIVE_JOURNEY } from "../actions/journey_actions";

const EntitiesReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_JOURNEY:
      return action.journeyPayload;
    default:
      return state;
  }
};

export default EntitiesReducer;