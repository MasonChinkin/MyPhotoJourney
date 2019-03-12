import React from "react";
import PhotoUploadForm from "../photo_upload_form/photo_upload_form";

class NewJourneyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      files: []
    };
    this.handleFile = this.handleFile.bind(this);
  }

  handleChange(field) {
    return e => {
      this.setState({ [field]: e.target.value });
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    //do upload things
  }

  handleFile(e) {
    const upload = Array.from(e.currentTarget.files);
    const files = [];

    upload.map(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log(reader.result);
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
      <div className="center flex column">
        <form id="new-journey-form" onSubmit={this.handleSubmit}>
          <h2>Name</h2>
          <input
            id="journey-name"
            type="text"
            value={this.state.name}
            onChange={this.handleChange("name")}
          />
          <h2>Description</h2>
          <textarea
            id="journey-description"
            value={this.state.description}
            onChange={this.handleChange("description")}
          />
          <input
            type="file"
            id="photo-upload"
            style={{ display: "none" }}
            multiple
            accept="image/*"
            onChange={this.handleFile}
          />
          <input
            className="button create"
            type="submit"
            value="Upload Photos"
            onClick={() => {
              const upload = document.getElementById("photo-upload");
              upload.click();
            }}
          />
        </form>
        <div className="photoPreview flex">
          {this.state.files.map((file, idx) => {
            return <PhotoUploadForm key={idx} file={file} />;
          })}
        </div>
      </div>
    );
  }
}

export default NewJourneyForm;
