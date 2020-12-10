import React, { ReactElement } from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { BiUser } from 'react-icons/bi';
import AuthenticatedNav from './shared/AuthenticatedNav';
import AnonymNav from './shared/AnonymNav';

export default function NavBar(): ReactElement {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand as={NavLink} to="/">
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
              <Nav.Link as={NavLink} to="/account">
                Mein Konto
              </Nav.Link>
              <NavDropdown.Divider />
              <Nav.Link as={NavLink} to="/bookedServices">
                Laufende Dienste
              </Nav.Link>
              <NavDropdown.Divider />
              <Nav.Link as={NavLink} to="/payedServices">
                Abgerechnete Dienste
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
