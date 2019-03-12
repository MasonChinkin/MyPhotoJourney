import * as PhotoActions from "../actions/photo_actions";

const PhotoErrorsReducer = (state = {}, action) => {
  Object.freeze(state);
  const newState = Object.assign({}, state);
  switch(action.type) {
    case PhotoActions.RECEIVE_PHOTO_ERRORS:
      return action.errors
    case PhotoActions.RECEIVE_PHOTO:
      return {};
    case PhotoActions.RECEIVE_PHOTOS:
      return {};
    default:
      return state;
  }
}

export default PhotoErrorsReducer;