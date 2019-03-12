import { connect } from "react-redux";
import * as PhotoActions from "../../actions/photo_actions";
import PhotoUploadForm from "./photo_upload_form";

const mSTP = state => {
  return {
    photos: state.entities.photos,
    journeyId: state.ui.currentJourneyId,
    currUser: state.session.user
  };
};

const mDTP = dispatch => {
  return {
    createPhoto: photo => {
      return dispatch(PhotoActions.createPhoto(photo));
    }
  };
};

export default connect(
  mSTP,
  mDTP
)(PhotoUploadForm);
