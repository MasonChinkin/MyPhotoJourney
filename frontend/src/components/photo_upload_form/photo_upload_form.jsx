import React from "react";

class PhotoUploadForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      country: "",
      description: "",
      date: ""
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
    // const formData = new FormData();
    let newPhoto = {
      city: this.state.city,
      country: this.state.country,
      date: this.state.date
    };
    if (this.state.description !== "") {
      newPhoto.description = this.state.description;
    }
    // formData.append("image", this.props.file);
    // formData.append("photo", newPhoto);
    // formData.append("journey", { id: this.props.journeyId });
    const photoPayload = {};
    photoPayload.photo = newPhoto;
    photoPayload.journey = { id: this.props.journeyId };

    this.props.createPhoto(photoPayload);
  }

  render() {
    return (
      <div className="photo-form">
        <div className="photo-img">
          <img src={this.props.file.preview} />
        </div>
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
              type="text"
              value={this.state.date}
              placeholder="Enter the date"
              onChange={this.handleInput("date")}
            />
          </div>
        </div>
        <div className="photo-button">
          <input
            className="button"
            type="submit"
            value="Add Photo to Journey"
            onClick={this.handleUpload}
          />
        </div>
      </div>
    );
  }
}

export default PhotoUploadForm;
