import React from "react";
import PhotoUploadFormContainer from "../photo_upload_form/photo_upload_form_container";

class NewJourneyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      files: []
    };
    this.handleFile = this.handleFile.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(field) {
    return e => {
      this.setState({ [field]: e.target.value });
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    const newJourney = {
      name: this.state.name,
    }
    if (this.state.description !== "") {
      newJourney.description = this.state.description
    }
    this.props.createJourney({journey: newJourney, user: this.props.currUser});
  }

  handleFile(e) {
    const upload = Array.from(e.currentTarget.files);
    const files = [];

    upload.map(file => {
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
    return (
      <div className="create-journey">
        <div id="form-div">
          <h1>Create a Photo Journey</h1>
        </div>
        <form id="new-journey-form" onSubmit={this.handleSubmit}>
          <div className="form-fields">
            <div>
              <h2>Name</h2>
              <input
                id="journey-name"
                type="text"
                value={this.state.name}
                onChange={this.handleChange("name")}
              />
            </div>
            <div>
              <h2>Description</h2>
              <textarea
                id="journey-description"
                value={this.state.description}
                onChange={this.handleChange("description")}
              />
            </div>
          </div>
          <div className="submit-button">
            <input
              type="file"
              id="photo-upload"
              style={{ display: "none" }}
              multiple
              accept="image/*"
              onChange={this.handleFile}
            />
            <input
              className="upload-photos"
              type="submit"
              value="Upload Photos"
              onClick={() => {
                const upload = document.getElementById("photo-upload");
                upload.click();
              }}
            />
          </div>
        </form>
        <div className="photo-preview">
          {this.state.files.map((file, idx) => {
            return <PhotoUploadFormContainer key={idx} file={file} />;
          })}
        </div>
      </div>
    );
  }
}

export default NewJourneyForm;
