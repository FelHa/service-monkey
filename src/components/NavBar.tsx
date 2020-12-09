import React, { ReactElement } from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { BiUser } from 'react-icons/bi';

import { useStore } from '../hooks/useStore';
import AuthenticatedNav from './shared/AuthenticatedNav';
import AnonymNav from './shared/AnonymNav';

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
            Dienstleistungen
          </Nav.Link>
          <AuthenticatedNav>
            <Nav.Link as={NavLink} to="/addService">
              Dienstleistung anbieten
            </Nav.Link>
          </AuthenticatedNav>
        </Nav>
        <Nav>
          <AuthenticatedNav>
            <NavDropdown
              title={<BiUser size={26} />}
              id="basic-nav-dropdown"
              alignRight
            >
              <Nav.Link as={NavLink} to="/user">
                Mein Konto
              </Nav.Link>
              <NavDropdown.Divider />
              <Nav.Link as={NavLink} to="/logout">
                Logout
              </Nav.Link>
            </NavDropdown>
          </AuthenticatedNav>
          <AnonymNav>
            <>
              <Nav.Link as={NavLink} to="/login">
                Login
              </Nav.Link>
              <Nav.Link as={NavLink} to="/register">
                Registrieren
              </Nav.Link>
            </>
          </AnonymNav>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
