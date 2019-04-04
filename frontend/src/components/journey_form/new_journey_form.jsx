import React from "react";
import PhotoUploadFormContainer from "../photo_upload_form/photo_upload_form_container";
import {convertDate, convertLatLong} from '../../util/metadata_utils';
const EXIF = require('exif-js');

class NewJourneyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      files: [],
      uploadPhotos: false,
      numSelections: 0
    };
    this.handleFile = this.handleFile.bind(this);
    this.handleSubmitJourney = this.handleSubmitJourney.bind(this);
    this.handleCompleteJourney = this.handleCompleteJourney.bind(this);
  }

  componentDidMount() {
    this.props.clearUIJourney();
  }

  componentWillUnmount() {
    if (!this.props.photoUpload) {
      this.props.deleteJourney(this.props.currentJourneyId);
    }
  }

  handleChange(field) {
    return e => {
      this.setState({ [field]: e.target.value }); 
    };
  }

  handleCompleteJourney() {
    let path = `/journey/${this.props.currentJourneyId}`;
    this.props.history.push(path);
  }

  handleSubmitJourney(e) {
    e.preventDefault();
    const newJourney = {
      name: this.state.name
    };
    if (this.state.description !== "") {
      newJourney.description = this.state.description;
    }
    this.props.createJourney({
      journey: newJourney,
      user: this.props.currUser
    });
  }

  handleFile(e) {
    this.setState({numSelections: this.state.numSelections + 1})
    const upload = Array.from(e.currentTarget.files);
    const files = [];

    upload.forEach(file => {
      const reader = new FileReader();
      const metaData = {
        time: null,
      lat: null,
        long: null
      };
      EXIF.getData(file, function(){
        const time = EXIF.getTag(this, "DateTime");
        const long = EXIF.getTag(this, "GPSLongitude");
        const lat = EXIF.getTag(this, "GPSLatitude");
        const latRef = EXIF.getTag(this, "GPSLatitudeRef");
        const longRef = EXIF.getTag(this, "GPSLongitudeRef");
        if(time) metaData.time = convertDate(time);
        if(long !== undefined && lat !== undefined){
          metaData.lat = convertLatLong(lat, latRef === "S" ? -1 : 1);
          metaData.long = convertLatLong(long, longRef === "W" ? -1 : 1);
        }
      });
      reader.onloadend = () => {
        files.push({ preview: reader.result, file, metaData});
        if (files.length === upload.length) {
          this.setState({ files: files });
        }
      };
      if (file) {
        reader.readAsDataURL(file);
      }
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.files !== prevState.files) {
      this.props.clearLocationData();
    }
  }


  render() {
    let nameInput, descriptionInput;
    if (this.props.currentJourneyId) {
      nameInput = (
        <div className="submitted-journey-info">
          <h2>{this.state.name}</h2>
          <h3>{this.state.description}</h3>
        </div>
      );
      descriptionInput = <></>;
    } else {
      nameInput = (
        <div>
          <h2>Name</h2>
          <input
            id="journey-name"
            type="text"
            value={this.state.name}
            onChange={this.handleChange("name")}
          />
        </div>
      );
      descriptionInput = (
        <div>
          <h2>Description</h2>
          <textarea
            id="journey-description"
            value={this.state.description}
            onChange={this.handleChange("description")}
          />
        </div>
      );
    }
    let journeyButton = this.props.currentJourneyId ? (
      <input
        className="upload-photos"
        type="submit"
        value="Upload Photos"
        onClick={e => {
          e.preventDefault();
          const upload = document.getElementById("photo-upload");
          upload.click();
          this.setState({ uploadPhotos: true });
        }}
      />
    ) : (
      <input
        className="upload-photos"
        type="submit"
        value="Save &amp; Continue"
        onClick={this.handleSubmitJourney}
      />
    );

    let completeJourneyButton = this.state.uploadPhotos ? (
      <div className="complete-journey">
        <h2>Finished uploading photos?</h2>
        <input
          className="finalize-journey"
          type="submit"
          value="Map my Journey"
          onClick={this.handleCompleteJourney}
        />
      </div>
    ) : (
      <></>
    );

    return (
      <div className="create-journey background">
        <div id="form-div">
          <h1>Create a Photo Journey</h1>
        </div>
        <div id="new-journey-form">
          <div className="form-fields">
            {nameInput}
            {descriptionInput}
          </div>
          <div className="submit-button">
            <input
              type="file"
              id="photo-upload"
              multiple
              accept="image/*"
              onChange={this.handleFile.bind(this)}
            />
            {journeyButton}
          </div>
        </div>
        {this.state.files.length === 0 ? (
          <></>
        ) : (
          <div className="photo-preview">
            {this.state.files.map((file, idx) => {
              return <PhotoUploadFormContainer id={idx} key={`sel#${this.state.numSelections}idx#${idx}`} file={file} />;
            })}
          </div>
        )}
        {completeJourneyButton}
      </div>
    );
  }
}

export default NewJourneyForm;
