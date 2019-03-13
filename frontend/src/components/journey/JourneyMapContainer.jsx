import { connect } from 'react-redux';
import JourneyMap from './JourneyMap';
import { withRouter } from 'react-router-dom';
import { requestJourney } from '../../actions/journey_actions';

const mSP = ({ entities }, ownProps) => ({
  journey: entities.journeys[ownProps.match.params.journey_id],
  photos: entities.photos
});

const mDP = dispatch => ({
  requestJourney: journeyId => dispatch(requestJourney(journeyId))
});

const JourneyMapContainer = connect(mSP, mDP)(JourneyMap);

export default withRouter(JourneyMapContainer);