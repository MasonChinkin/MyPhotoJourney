import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import * as MapUtils from "../../util/map_util";

class JourneyMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      map: null
    };
  }

  componentWillMount() {
    const myHeaders = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json"
    });

    fetch("/journeys", {
      headers: myHeaders
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({ map: data.map });
      });

    this.props.requestJourney(this.props.match.params.journey_id).then(data => {
      this.setState({ data: data.journeyPayload.data });
    });
  }

  componentDidUpdate() {
    if (this.state.data && this.state.map) {
      MapUtils.drawMap(this.state, this.refs.anchor)
    }
  }

  render() {
    const { data } = this.state;
    if (data === null) return null;
    return (
      <>
        <div ref="anchor" />
        <div id="tooltip" className="hidden">
          <h1 id="city">placeholder</h1>
          <img id="pic" alt="" />
          <p id="date">placeholder</p>
          <p id="description">placeholder</p>
        </div>
      </>
    );
  }
}

export default withRouter(JourneyMap);
