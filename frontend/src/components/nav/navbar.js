import React from 'react';
import { Link } from 'react-router-dom';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.logoutUser = this.logoutUser.bind(this);
    this.getLinks = this.getLinks.bind(this);
  }

  logoutUser(e) {
      e.preventDefault();
      this.props.logout();
  }

  
  getLinks() {
      if (this.props.loggedIn) {
        return (
            <div>
                <button onClick={this.logoutUser}>Sign Out</button>
            </div>
        );
      } else {
        return (
            <div>
                <Link to={'/login'}>Sign In</Link>
            </div>
        );
      }
  }

  render() {
      return (
        <div>
            <h1>MyPhotoJourney</h1>
            { this.getLinks() }
        </div>
      );
  }
}

export default NavBar;