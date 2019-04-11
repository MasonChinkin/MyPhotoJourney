import { connect } from "react-redux";
import * as PhotoActions from "../../actions/photo_actions";
import * as LocationActions from "../../actions/location_actions";
import PhotoUploadForm from "./photo_upload_form";

const mSTP = (state, ownProps) => {
  return {
    photos: state.entities.photos,
    journeyId: state.ui.currentJourneyId,
    currUser: state.session.user,
    errors: state.errors.photos,
    locations: state.ui.locationData[ownProps.id],
    states: [...new Set(state.ui.locationData[ownProps.id].map( location => location.state ))],
    countries: [...new Set(state.ui.locationData[ownProps.id].map( location => location.country ))],
  };
};

const mDTP = (dispatch, ownProps) => {
  return {
    createPhoto: photo => {
      return dispatch(PhotoActions.createPhoto(photo));
    },
    validatePhoto: photo => {
      return dispatch(PhotoActions.validatePhoto(photo));
    },
    fetchLocationData: data => {
      return dispatch(LocationActions.fetchLocationData(data, ownProps.id));
    }
  };
};

export default connect(
  mSTP,
  mDTP
)(PhotoUploadForm);
