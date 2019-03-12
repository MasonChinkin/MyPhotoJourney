import { combineReducers } from 'redux';
import journeys from './journeys_reducer';
import photos from './photos_reducer';

export default combineReducers({
  journeys,
  photos,
})