import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Route, Switch } from 'react-router-dom';
import NavbarContainer from './nav/navbar_container';
import Splash from './splash/splash';
import ProfileContainer from './profile/profile_container';
import "./App.scss";
import NewJourneyForm from './journey_form/new_journey_form';
import Journey from './journey/Journey';

const App = () => {
    return(
        <>  
            <Route path="/journeys" component={NavbarContainer}></Route>
            <Route path="/profile" component={NavbarContainer}></Route>
            <Route path="/map" component={NavbarContainer}></Route>
            <Switch>
                <AuthRoute exact path="/" component={Splash} />
                <ProtectedRoute exact path="/profile" component={ProfileContainer} />
                <ProtectedRoute exact path="/journeys/new" component={NewJourneyForm} />
            </Switch>
        </>
    )
};
export default App;