import React from 'react';
import {Link} from 'react-router-dom';
import JourneyListItem from './journey_list_item';

class Profile extends React.Component{


    render(){
        if(this.props.journeys.length === 0){
            return(
                <Link className="button create" to="/journeys/new">Create your first journey!</Link>
            )
        } else{
            return(
                <div className="flex">
                    <div className="journey-list">
                        <h2>My Journeys</h2>
                        <ul>
                            {this.props.journeys.map(journey => <JourneyListItem journey={journey} />)}
                        </ul>
                    </div>
                    <div className="flex column center half">
                        <Link className="button create" to="/journeys/new">Make a new journey!</Link>
                    </div>
                </div>
            )
        }
    }
}


export default Profile