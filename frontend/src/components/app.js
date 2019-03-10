import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import NavBarContainer from './nav/navbar_container';
import { Switch } from 'react-router-dom';
import Splash from './splash/splash';
import Profile from './profile/profile';

const App = () => (
    <>
        <Switch>
            <AuthRoute exact path="/" component={Splash} />
            <ProtectedRoute exact path="/profile" component={Profile} />
        </Switch>
    </>
);

export default App;