import React from "react";

class PhotoUploadForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      country: "",
      region: "",
      description: "",
      date: ""
    };
  }

  // handleChange(field) {
  //   return e => {
  //     this.setState({ [field]: e.target.value });
  //   };
  // }

  handleUpload(e) {
    e.preventDefault();
    //do upload things
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
          />
        </label>
        <label>
          Country
          <input
            type="text"
            value={this.state.country}
            placeholder="Enter the country"
          />
        </label>
        <label>
          Region
          <input
            type="text"
            value={this.state.region}
            placeholder="Enter the region"
          />
        </label>
        <label>
          Description
          <input
            type="text"
            value={this.state.description}
            placeholder="Enter the description"
          />
        </label>
        <label>
          Date
          <input
            type="text"
            value={this.state.date}
            placeholder="Enter the date"
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
