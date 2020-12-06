import React, { ReactElement } from 'react';
import { Form, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  NavLink,
} from 'react-router-dom';
import './App.css';

function App(): ReactElement {
  return (
    <Router>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">servicebox</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={NavLink} to="/home">
              Home
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Switch>
        <Route path="/home">
          <div>Home</div>
        </Route>
        <Route path="/edit">
          <div>edit</div>
        </Route>
        <Route path="/">
          <Redirect to="/home"></Redirect>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
