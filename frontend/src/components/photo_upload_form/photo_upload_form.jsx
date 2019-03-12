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
    let newPhoto = {city: this.state.city, 
      country: this.state.country, 
      date: this.state.date, 
      file: this.props.file}
    if(this.state.description !== "") {
      newPhoto.description = this.state.description;
    }
    this.props.createPhoto(newPhoto);
  }

  render() {
    console.log(this.props.file);
    return (
      <div className="center flex column">
        <img src={this.props.file.preview} style={{ width: "250px" }} />
        <label>
          City
          <input
            type="text"
            value={this.state.city}
            placeholder="Enter the city"
            onChange={this.handleInput("city")}
          />
        </label>
        <label>
          Country
          <input
            type="text"
            value={this.state.country}
            placeholder="Enter the country"
            onChange={this.handleInput("country")}
          />
        </label>
        <label>
          Description
          <input
            type="text"
            value={this.state.description}
            placeholder="Enter the description"
            onChange={this.handleInput("description")}
          />
        </label>
        <label>
          Date
          <input
            type="text"
            value={this.state.date}
            placeholder="Enter the date"
            onChange={this.handleInput("date")}
          />
        </label>
        <input
          className="button"
          type="submit"
          value="upload this photo"
          onClick={this.handleUpload}
        />
      </div>
    );
  }
}

export default PhotoUploadForm;
