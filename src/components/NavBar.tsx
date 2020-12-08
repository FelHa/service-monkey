import React, { ReactElement } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useStore } from '../hooks/useStore';

export default function NavBar(): ReactElement {
  const { store } = useStore();

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand as={NavLink} to="/home">
        servicebox
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={NavLink} to="/services">
            Services
          </Nav.Link>
          {store.user ? (
            <>
              <Nav.Link as={NavLink} to="/user">
                User
              </Nav.Link>
              <Nav.Link as={NavLink} to="/logout">
                Logout
              </Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link as={NavLink} to="/login">
                Login
              </Nav.Link>
              <Nav.Link as={NavLink} to="/register">
                Registrieren
              </Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
