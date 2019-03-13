import * as PhotoActions from "../actions/photo_actions";
import * as JourneyActions from "../actions/journey_actions";

const PhotosReducer = (state = {}, action) => {
  Object.freeze(state);
  const newState = Object.assign({}, state)
  switch (action.type) {
    case PhotoActions.RECEIVE_PHOTO:
      newState[action.photo.data._id] = action.photo.data;
      return newState;
    case PhotoActions.RECEIVE_PHOTOS:
      return action.photos;
    case JourneyActions.RECEIVE_JOURNEY:
      if (action.journeyPayload.data[1] !== undefined) {
        return action.journeyPayload.data[1]; // photos
      } else {
        return state;
      }
    default:
      return state;
  }
}

export default PhotosReducer;