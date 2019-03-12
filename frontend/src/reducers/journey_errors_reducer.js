import * as JourneyActions from "../actions/journey_actions";

const JourneyErrorsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch(action.type) {
    case JourneyActions.RECEIVE_JOURNEY_ERRORS:
      return action.errs
    case JourneyActions.RECEIVE_JOURNEY:
      return {}
    default:
      return state;
  }
}

export default JourneyErrorsReducer;