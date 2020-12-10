import React, { ReactElement } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Account from './Account';
import AddService from './AddService';
import BookedServices from './BookedServices';
import EditService from './EditService';
import Login from './Login';
import Logout from './Logout';
import Register from './Register';
import ServiceDetails from './ServiceDetails';
import Services from './Services';
import ProtectedRoute from './shared/ProtectedRoute';

export default function Routes(): ReactElement {
  return (
    <Switch>
      <ProtectedRoute path="/addService" component={<AddService />} />
      <ProtectedRoute path="/editService/:id" component={<EditService />} />
      <ProtectedRoute path="/bookedServices" component={<BookedServices />} />
      <Route path="/services/:id">
        <ServiceDetails />
      </Route>
      <Route path="/services">
        <Services />
      </Route>
      <Route path="/account">
        <Account />
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
