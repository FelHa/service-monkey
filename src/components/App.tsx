import React, { ReactElement } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Login from './Login';
import Services from './Services';
import ServiceDetails from './ServiceDetails';
import Register from './Register';
import NavBar from './NavBar';
import Logout from './Logout';
import { StoreProvider } from '../Store';
import './App.css';

function App(): ReactElement {
  return (
    <StoreProvider>
      <>
        <ToastContainer />
        <Router>
          <NavBar />

          <Switch>
            <Route path="/services/:id">
              <ServiceDetails />
            </Route>
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
              <Redirect to="/home"></Redirect>
            </Route>
          </Switch>
        </Router>
      </>
    </StoreProvider>
  );
}

export default App;
