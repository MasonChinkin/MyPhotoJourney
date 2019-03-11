import React from 'react';


class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.logoutUser = this.logoutUser.bind(this);
  }

  logoutUser(e) {
      e.preventDefault();
      this.props.logout();
  }

  render() {
      if(!this.props.loggedIn){
        return null;
      }
      return (
        <div id="navbar">
            <img src="./myphotojourney_logo_for_light_background.png" alt="MyPhotoJourney Logo" height="100" />
            <button className="button" onClick={this.logoutUser}>Log Out</button>
        </div>
      );
  }
}

export default NavBar;