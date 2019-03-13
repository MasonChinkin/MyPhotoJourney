import React from "react";
import PhotoUploadFormContainer from "../photo_upload_form/photo_upload_form_container";

class NewJourneyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      files: [],
      uploadPhotos: false
    };
    this.handleFile = this.handleFile.bind(this);
    this.handleSubmitJourney = this.handleSubmitJourney.bind(this);
    this.handleCompleteJourney = this.handleCompleteJourney.bind(this);
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
    const upload = Array.from(e.currentTarget.files);
    const files = [];

    upload.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        files.push({ preview: reader.result, file: file });
        if (files.length === upload.length) {
          this.setState({ files: files });
        }
      };
      if (file) {
        reader.readAsDataURL(file);
      }
    });
  }

  render() {
    let nameInput, descriptionInput;
    if (this.props.currentJourneyId) {
      nameInput = (
        <div>
          <h2>Journey name: {this.state.name}</h2>
          <h2>Description: {this.state.description}</h2>
        </div>
      );
      descriptionInput = <></>;
    } else {
      nameInput = (
        <>
          <h2>Name</h2>
          <input
            id="journey-name"
            type="text"
            value={this.state.name}
            onChange={this.handleChange("name")}
          />
        </>
      );
      descriptionInput = (
        <>
          <h2>Description</h2>
          <textarea
            id="journey-description"
            value={this.state.description}
            onChange={this.handleChange("description")}
          />
        </>
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
            <div>{nameInput}</div>
            <div>{descriptionInput}</div>
          </div>
          <div className="submit-button">
            <input
              type="file"
              id="photo-upload"
              multiple
              accept="image/*"
              onChange={this.handleFile}
            />
            {journeyButton}
          </div>
        </div>
        <div className="photo-preview">
          {this.state.files.map((file, idx) => {
            return <PhotoUploadFormContainer key={idx} file={file} />;
          })}
        </div>
        {completeJourneyButton}
      </div>
    );
  }
}

export default NewJourneyForm;
