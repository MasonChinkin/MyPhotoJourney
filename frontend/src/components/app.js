import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch } from 'react-router-dom';
import Splash from './splash/splash';
import Profile from './profile/profile';
import "./App.scss";

const App = () => (
    <>
        <Switch>
            <AuthRoute exact path="/" component={Splash} />
            <ProtectedRoute exact path="/profile" component={Profile} />
        </Switch>
    </>
);

export default App;