import React, { ReactElement } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  NavLink,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Auth from './Auth';
import Services from './Services';
import './App.css';

function App(): ReactElement {
  return (
    <>
      <ToastContainer />

      <Router>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand as={NavLink} to="/home">
            servicebox
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={NavLink} to="/home">
                Home
              </Nav.Link>
              <Nav.Link as={NavLink} to="/services">
                Services
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Switch>
          <Route path="/home">
            <Auth />
          </Route>
          <Route path="/services">
            <Services />
          </Route>
          <Route path="/edit">
            <div>edit</div>
          </Route>
          <Route path="/">
            <Redirect to="/home"></Redirect>
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
