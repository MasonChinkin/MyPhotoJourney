import React from "react";
import Loader from "react-loader-spinner";

class PhotoUploadForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      country: "",
      description: "",
      date: "",
      status: "ready",
      errors: {}
    };
    this.handleUpload = this.handleUpload.bind(this);
  }

  handleInput(field) {
    return e => {
      this.setState({ [field]: e.target.value });
    };
  }

  handleUpload(e) {
    e.preventDefault();
    this.setState({ status: "loading" });
    const formData = new FormData();

    formData.append("image", this.props.file.file);
    formData.append("city", this.state.city);
    formData.append("country", this.state.country);
    formData.append("description", this.state.description);
    formData.append("date", this.state.date);
    formData.append("journeyId", this.props.journeyId);

    this.props.createPhoto(formData).then(() => {
      if (Object.values(this.props.errors).length === 0) {
        this.setState({ status: "submitted", errors: {} });
      } else {
        this.setState({ status: "ready", errors: this.props.errors });
      }
    });
  }

  render() {
    let photoSubmitButton;
    if (this.state.status === "submitted") {
      photoSubmitButton = (
        <input
          className="button disabledButton"
          type="submit"
          value="Photo Uploaded!"
          disabled
        />
      );
    } else if (this.state.status === "ready") {
      photoSubmitButton = (
        <input
          className="button"
          type="submit"
          value="Upload Photo!"
          onClick={this.handleUpload}
        />
      );
    } else if (this.state.status === "loading") {
      photoSubmitButton = <Loader color="#000000" height={20} width={100} />;
    }

    return (
      <div className="photo-form">
        <div className="photo-img">
          <img src={this.props.file.preview} alt="your-upload" />
        </div>
        {this.props.file.file.size > 10485760 ? (
          <div className="photo-too-large">
            <p>This photo is too large. 10MB max</p>
          </div>
        ) : (
          <>
            <div className="photo-data">
              <div className="photo-labels">
                <label>City</label>
                <label>Country</label>
                <label>Description</label>
                <label>Date</label>
              </div>
              <div className="photo-inputs">
                <input
                  type="text"
                  value={this.state.city}
                  placeholder="Enter the city"
                  onChange={this.handleInput("city")}
                />
                <input
                  type="text"
                  value={this.state.country}
                  placeholder="Enter the country"
                  onChange={this.handleInput("country")}
                />
                <input
                  type="text"
                  value={this.state.description}
                  placeholder="Enter the description"
                  onChange={this.handleInput("description")}
                />
                <input
                  type="date"
                  value={this.state.date}
                  placeholder="Enter the date"
                  onChange={this.handleInput("date")}
                />
              </div>
            </div>
            <div
              style={{
                color: "red",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                fontSize: "12px"
              }}
            >
              {Object.values(this.state.errors).map(error => {
                return <div style={{ marginBottom: "5px" }}>{error}</div>;
              })}
            </div>
            <div className="photo-button">{photoSubmitButton}</div>
          </>
        )}
      </div>
    );
  }
}

export default PhotoUploadForm;
