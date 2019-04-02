import React from "react";
import Loader from "react-loader-spinner";

class PhotoUploadForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      pendingCity: "",
      country: "",
      state: "",
      description: "",
      date: this.props.file.metaData.time || "",
      status: "ready",
      countries: new Set(),
      states: new Set(),
      errors: {}
    };
    this.handleUpload = this.handleUpload.bind(this);
    this.updateLocation = this.updateLocation.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.typingTimer = null;

    this.is_gps_prefilled = this.is_gps_prefilled.bind(this);
  }

  handleInput(field) {
    return e => {
      this.setState({ [field]: e.target.value });
    };
  }

  updateLocation(e, field) {
    if (this.state[field] !== e.target.value) {
      this.setState({[field]: e.target.value}, () => {
        this.props.fetchLocationData({
        location: this.state.city,
        country: this.state.country,
        state: this.state.state,
      })})
    }
  }

  is_gps_prefilled(){
    if(this.props.file.metaData.lat !== null && this.props.file.metaData.long !== null){
      return null;
    } else {
      return(
        <>
        <div className="cityUpload">
          <input
            className="cityInput"
            type="text"
            value={this.state.pendingCity }
            placeholder="Enter the city"
            onChange={this.handleInput("pendingCity")}
            onKeyPress={(e) => {
              e.persist();
              clearTimeout(this.typingTimer);
              if (e.target.value) {
                this.typingTimer = setTimeout(() => {
                  this.updateLocation(e, "city");
                }, 400)
              }
            }}
          />
        </div>
        
        {this.props.locations.length > 1 ?
          <select className="locationSelect" onChange={(e) => {
            this.updateLocation(e, "country");
          }}>
            <option value="" disabled selected>Select the Country</option>
            {this.props.countries.map(country => <option value={country}>{country}</option>)}
          </select>
        : null}

        {this.props.states.length > 1 && this.state.country.length > 0 ?
          <select className="locationSelect" onChange={this.handleInput("state")}>
            <option value="" disabled selected>Select the State</option>
            {this.props.states.map(state => <option value={state}>{state}</option>)}
          </select>
        : null}
      </>
      )
    }
  }

  handleUpload(e) {
    e.preventDefault();
    this.setState({ status: "loading" });
    const formData = new FormData();

    formData.append("image", this.props.file.file);
    formData.append("city", this.state.city);
    formData.append("lat", this.props.file.metaData.lat || "");
    formData.append("long", this.props.file.metaData.long || "");
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
            {this.props.file.metaData.lat !== null ? <h2>Location automatically determined using metadata</h2> : ""}
            <div className="photo-data">
              <div className="photo-labels">
                {this.props.file.metaData.lat === null ? 
                <>                
                <label>City</label>
                {this.props.locations.length > 0 ?
                  <label>Country</label>
                : null}
                {this.state.country.length > 0 && this.props.locations.length > 1 ? 
                  <label>State</label>
                : null}
                </> :
                null
              }
                <label>Description</label>
                <label>Date</label>
              </div>
              <div className="photo-inputs">
                {this.is_gps_prefilled()}
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