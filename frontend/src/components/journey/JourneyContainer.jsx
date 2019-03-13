import { connect } from 'react-redux';
import JourneyMap from './JourneyMap';
import { withRouter } from 'react-router-dom';
import { requestJourney } from '../../actions/journey_actions';
import Journey from './Journey';

const mSP = ({ entities }, ownProps) => ({
  journey: entities.journeys[ownProps.match.params.journey_id],
});

const JourneyMapContainer = connect(mSP)(Journey);

export default withRouter(JourneyMapContainer);