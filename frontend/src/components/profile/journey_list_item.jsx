import React from 'react';
import {Link} from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

class JourneyListItem extends React.Component{


   deleteJourney(){
    confirmAlert({
       message: 'Are you sure to delete this journey?',
      buttons: [
      {
        label: 'Yes',
        onClick: () => this.props.deleteJourney(this.props.journey._id)
        },
      {
        label: 'No',
        onClick: () => {} 
        }
      ]
    });
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


  render(){
    const journey = this.props.journey;
    return (
      <div className="journey-list-item">
        <Link to={`/journey/${journey._id}`}>
          <span>{journey.name}</span>
        </Link>
        <i className="fa fa-clipboard" onClick={this.copyURL.bind(this)}/>
        <i className="fa fa-remove" style={{marginLeft: "5px", fontSize: "26px", color: "red"}} onClick={this.deleteJourney.bind(this)}/>
      </div>
    )
  }
}

export default JourneyListItem