import React from "react";

class PhotoUploadForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      country: "",
      description: "",
      date: "",
      submitted: false,
      errors: {},
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
    const formData = new FormData();

    formData.append("image", this.props.file.file);
    formData.append("city", this.state.city);
    formData.append("country", this.state.country);
    formData.append("description", this.state.description);
    formData.append("date", this.state.date);
    formData.append("journeyId", this.props.journeyId);

    this.props.createPhoto(formData).then( () => {
      if(Object.values(this.props.errors).length === 0) {
        this.setState({submitted: true, errors: {}});
      } else {
        this.setState({errors: this.props.errors})
      }
    })
  }

  render() {
    let photoSubmitButton;
    if(this.state.submitted) {
      photoSubmitButton = (
        <input
          className="button disabledButton"
          type="submit"
          value="Photo Uploaded!"
          disabled
        />
      )
    } else {
      photoSubmitButton = (
        <input
          className="button"
          type="submit"
          value="Upload Photo!"
          onClick={this.handleUpload}
        />
      )
    }
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
        <div style={{
          "color": "red",
          "display": "flex",
          "flexDirection": "column",
          "justifyContent": "center",
          "fontSize": "12px"}}>
        {Object.values(this.state.errors).map( (error) => {
          return(<div style={{"marginBottom": "5px"}}>{error}</div>);
        })}
        </div>
        <div className="photo-button">
          {photoSubmitButton}
        </div>
      </div>
    );
  }
}

export default PhotoUploadForm;
