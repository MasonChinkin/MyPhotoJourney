import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Route, Switch } from 'react-router-dom';
import Splash from './splash/splash';
import Profile from './profile/profile';
import "./App.scss";
import Journey from './journey/Journey';

const App = () => (
    <>
        <Switch>
            <AuthRoute exact path="/" component={Splash} />
            <ProtectedRoute exact path="/profile" component={Profile} />
        </Switch>
        <Route path={`/journey`} component={Journey} />
    </>
);

export default App;