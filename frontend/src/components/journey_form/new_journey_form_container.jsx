import { connect } from "react-redux";
import NewJourneyForm from "./new_journey_form";
import * as JourneyActions from "../../actions/journey_actions";

const mSTP = state => {
  return {
    journeys: state.entities.journeys,
    photos: state.entities.photos,
    currUser: state.session.user,
    currentJourneyId: state.ui.currentJourneyId
  };
};

const mDTP = dispatch => {
  return {
    createJourney: journeyPayload => {
      dispatch(JourneyActions.createJourney(journeyPayload));
    }
  };
};

export default connect(
  mSTP,
  mDTP
)(NewJourneyForm);
