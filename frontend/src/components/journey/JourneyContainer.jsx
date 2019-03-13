import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Journey from './Journey';

const mSP = ({ entities }, ownProps) => ({
  journey: entities.journeys[ownProps.match.params.journey_id],
});

const JourneyMapContainer = connect(mSP)(Journey);

export default withRouter(JourneyMapContainer);