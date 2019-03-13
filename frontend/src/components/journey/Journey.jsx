import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
// import JourneyMap from './JourneyMap';
import JourneyMapContainer from './JourneyMapContainer';

class Journey extends Component {
  constructor(props) {
    super(props);
    this.copyURL = this.copyURL.bind(this);
  }

  copyURL() {
    let url = document.getElementById('journey-url');
    url.select();
    document.execCommand('copy');
    alert(`URL copied to clipboard!`);
  }

  render() {
    console.log(this.props.history);
    return (
      <div className="journey">
        <h1>Your Journey (will be journey.name)</h1>
        <JourneyMapContainer />
        <div className="share">
          <input type="text" id="journey-url" value={this.props.history.location.pathname} />
          <button onClick={this.copyURL}>copy url</button>
        </div>
      </div>
    );
  }
}

export default withRouter(Journey);
