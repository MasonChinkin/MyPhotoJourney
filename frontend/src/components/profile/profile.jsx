import React from "react";
import { Link } from "react-router-dom";
import JourneyListItem from "./journey_list_item";

class Profile extends React.Component {
  componentDidMount() {
    const userId = this.props.currentUser;
    this.props.fetchUserJourneys(userId);
  }

  render() {
    let journeys = this.props.journeys.map(journey => (
      <JourneyListItem key={journey._id} journey={journey} />
    ));

    if (this.props.journeys.length === 0) {
      return (
        <div className="make-new-journey background">
          <Link className="button create" to="/journeys/new">
            Make your first journey!
          </Link>
        </div>
      );
    } else {
      return (
        <div className="profile-content background">
          <div className="journey-list">
            <h2>My Journeys</h2>
            <ul>{journeys}</ul>
          </div>
          <div className="new-journey flex column center">
            <Link className="button create" to="/journeys/new">
              Make a new journey!
            </Link>
          </div>
        </div>
      );
    }
  }
}

export default Profile;
