import { connect } from "react-redux";
import NewJourneyForm from "./new_journey_form";
import * as JourneyActions from "../../actions/journey_actions";
import { clearLocationData } from "../../actions/location_actions";

const mSTP = state => {
  return {
    journeys: state.entities.journeys,
    photos: state.entities.photos,
    currUser: state.session.user,
    currentJourneyId: state.ui.currentJourneyId,
    photoUpload: state.ui.photoUpload
  };
};

const mDTP = dispatch => {
  return {
    createJourney: journeyPayload => {
      dispatch(JourneyActions.createJourney(journeyPayload));
    },
    clearUIJourney: () => dispatch(JourneyActions.clearUIJourney()),
    deleteJourney: journeyId =>
      dispatch(JourneyActions.deleteJourney(journeyId)),
    clearLocationData: () => dispatch(clearLocationData())
  };
};

export default connect(
  mSTP,
  mDTP
)(NewJourneyForm);
