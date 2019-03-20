import { connect } from 'react-redux';
import JourneyListItem from './journey_list_item';
import { deleteJourney} from '../../actions/journey_actions';

const mdp = dispatch => ({
  deleteJourney: journeyId => dispatch(deleteJourney(journeyId))
});


export default connect(null, mdp)(JourneyListItem);