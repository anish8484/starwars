import React from 'react';
import { Switch, Route } from 'react-router-dom'
import App from '../components/app.js';
import Login from '../components/login/login.js';

const Routes = () => (
  <div>
    <main>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/" component={App} />
        <Route exact path="/dashboard" component={App} />
      </Switch>
    </main>
  </div>
);

export default Routes;
