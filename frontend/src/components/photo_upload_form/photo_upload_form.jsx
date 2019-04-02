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
      enterState: false,
      errors: {},
    };
    this.handleUpload = this.handleUpload.bind(this);
    this.updateLocation = this.updateLocation.bind(this);
    this.typingTimer = null;
  }

  handleInput(field) {
    return e => {
      this.setState({ [field]: e.target.value });
    };
  }

  updateLocation(e, field) {
    let newState;
    if (this.state[field] !== e.target.value) {
      if (field === "city") {
        newState = {city: e.target.value, country: "", state: "", enterState: false}
      } else {
        newState = {[field]: e.target.value}
      }
      this.setState(newState, () => {
        this.props.fetchLocationData({
        location: this.state.city,
        country: this.state.country,
        state: this.state.state,
      }).then(() => {if(Object.values(this.props.errors).length > 0) {
        this.setState({errors: this.props.errors})
      } else {
        if(field === "country") {
          this.setState({enterState: true})
        }
        this.setState({errors: {}})
      }})
    })
    }
  }

  locationPrompt() {
    if (this.state.country.length > 0 && 
        this.props.locations.length > 0 && 
        this.props.states.length === 1 &&
        this.props.countries.length === 1) {
          return (<div className="locationPrompt" id="locationDetected">Location Detected!</div>)
        } else {
          return (<div className="locationPrompt">Type a city or location name to search for a new location!</div>)
        }
  }

  is_gps_prefilled(){
    if(this.props.file.metaData.lat !== null && this.props.file.metaData.long !== null){
      return <div className="locationPrompt" id="locationDetected">Location Detected!</div>;
    } else {
      return(
        <>
        <div className="cityUpload">
          <input
            className="cityInput"
            type="text"
            disabled={this.state.status !== "ready"}
            value={this.state.pendingCity }
            placeholder="Enter the city"
            onChange={this.handleInput("pendingCity")}
            onKeyDown={(e) => {
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
        
        {this.props.locations.length > 1 && this.props.countries.length > 1 ?
          <select className="locationSelect" defaultValue="default" onChange={(e) => {this.updateLocation(e, "country")}}>
            <option value="default" disabled >Select the Country</option>
            {this.props.countries.map((country, i) => <option key={`country#${i}`} value={country}>{country}</option>)}
          </select>
        : null}

        {this.props.states.length > 1 && this.state.country.length > 0 && this.state.enterState ?
          <select className="locationSelect" defaultValue="default" onChange={(e) => {this.updateLocation(e, "state")}}>
            <option value="default" disabled >Select the State</option>
            {this.props.states.map((state, i) => <option key={`state#${i}`} value={state}>{state}</option>)}
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
    console.log(this.state.enterState)
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
            {this.locationPrompt()}
            {this.props.file.metaData.lat !== null ? <h2>Location automatically determined using metadata</h2> : ""}
            <div className="photo-data">
              <div className="photo-labels">
                {this.props.file.metaData.lat === null ? 
                <>                
                <label>City</label>
                {this.props.locations.length > 0 && this.props.countries.length > 1 ?
                  <label>Country</label>
                : null}
                {this.state.country.length > 0 && this.props.states.length > 1 && this.state.enterState ? 
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
                  disabled={this.state.status !== "ready"}
                  type="text"
                  value={this.state.description}
                  placeholder="Enter the description"
                  onChange={this.handleInput("description")}
                />
                <input
                  type="date"
                  disabled={this.state.status !== "ready"}
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
              {Object.values(this.state.errors).map((error, i) => {
                return <div key={`error#${i}`} style={{ marginBottom: "5px" }}>{error}</div>;
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