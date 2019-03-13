import { connect } from "react-redux";
import { getUserJourneys } from "../../actions/selectors";
import Profile from "./profile";
import { fetchUserJourneys } from "../../actions/journey_actions";

const msp = state => ({
  currentUser: state.session.user.id,
  journeys: getUserJourneys(state.session.user.id, state.entities.journeys)
});

const mdp = dispatch => ({
  fetchUserJourneys: userId => dispatch(fetchUserJourneys(userId))
});

export default connect(
  msp,
  mdp
)(Profile);
