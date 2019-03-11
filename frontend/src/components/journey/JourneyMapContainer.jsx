import { connect } from 'react-redux';
import JourneyMap from './JourneyMap';

const mSP = ({ entities }) => ({
  journey: entities.journey,
  photos: Object.values(entities.photos)
});

const JourneyMapContainer = connect(mSP)(JourneyMap);

export default JourneyMapContainer;