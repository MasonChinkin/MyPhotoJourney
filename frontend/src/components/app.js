import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Route, Switch } from 'react-router-dom';
import NavbarContainer from './nav/navbar_container';
import Splash from './splash/splash';
import Profile from './profile/profile';
import "./App.scss";

const App = () => {
    return(<>  
        <Route path="/journey" component={NavbarContainer}></Route>
        <Route path="/profile" component={NavbarContainer}></Route>
        <Route path="/map" component={NavbarContainer}></Route>
        <Switch>
            <AuthRoute exact path="/" component={Splash} />
            <ProtectedRoute exact path="/profile" component={Profile} />
        </Switch>
    </>)
};

export default App;