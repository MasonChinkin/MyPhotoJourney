import { combineReducers } from 'redux';

import SessionErrorsReducer from './session_errors_reducer';
import photos from './photo_errors_reducer';
import journeys from './journey_errors_reducer';

export default combineReducers({
  session: SessionErrorsReducer,
  photos,
  journeys
});