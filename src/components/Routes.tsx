import React, { ReactElement } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useStore } from '../hooks/useStore';
import Login from './Login';
import Logout from './Logout';
import Register from './Register';
import ServiceDetails from './ServiceDetails';
import Services from './Services';
import ProtectedRoute from './shared/ProtectedRoute';

export default function Routes(): ReactElement {
  const { store } = useStore();
  console.log(store);

  return (
    <Switch>
      <Route path="/services/:id">
        <ServiceDetails />
      </Route>
      {/* <ProtectedRoute path="/services" component={<Services />} /> */}
      <Route path="/services">
        <Services />
      </Route>
      <Route path="/edit">
        <div>edit</div>
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
      <Route path="/logout">
        <Logout />
      </Route>
      <Route path="/home">
        <div>Home</div>
      </Route>
      <Route path="/">
        <Redirect to="/home" />
      </Route>
    </Switch>
  );
}
