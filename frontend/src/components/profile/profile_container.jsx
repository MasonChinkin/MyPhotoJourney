import {connect} from 'react-redux';
import {getUserJourneys} from '../../actions/selectors';
import Profile from './profile';


const msp = state => ({
  currentUser: state.session.user.id,
  journeys: getUserJourneys(state.session.user.id, state.entities.journeys)
});

const mdp = dispatch => ({

});


export default connect(msp, mdp)(Profile);