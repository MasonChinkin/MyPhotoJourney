import * as PhotoActions from "../actions/photo_actions";
import * as LocationActions from "../actions/location_actions";

const PhotoErrorsReducer = (state = {}, action) => {
  Object.freeze(state);
  // const newState = Object.assign({}, state);
  switch (action.type) {
    case PhotoActions.RECEIVE_PHOTO_ERRORS:
      return action.errors
    case LocationActions.RECEIVE_LOCATION_ERRORS:
      return action.errors
    case LocationActions.RECEIVE_LOCATION_DATA:
      return {};
    case PhotoActions.RECEIVE_PHOTO:
      return {};
    case PhotoActions.CLEAR_PHOTO_ERRORS:
      return {};
    case PhotoActions.RECEIVE_PHOTOS:
      return {};
    default:
      return state;
  }
}

export default PhotoErrorsReducer;