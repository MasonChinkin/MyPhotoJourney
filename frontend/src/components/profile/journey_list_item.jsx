import React from "react";
import { Link } from "react-router-dom";

export default class JourneyListItem extends React.Component {
  constructor(props) {
    super(props);
    this.copyURL = this.copyURL.bind(this);
  }

  copyURL() {
    let el = document.createElement("textarea");
    document.body.appendChild(el);
    el.value = `https://myphotojourney.herokuapp.com/#/journey/${
      this.props.journey._id
    }`;
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    alert(`URL copied to clipboard!`);
  }

  render() {
    return (
      <div className="journey-list-item">
        <Link to={`/journey/${this.props.journey._id}`}>
          <span>{this.props.journey.name}</span>
        </Link>
        <i className="fa fa-clipboard" onClick={this.copyURL} />
      </div>
    );
  }
}
