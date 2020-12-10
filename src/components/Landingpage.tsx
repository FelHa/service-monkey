import React, { ReactElement } from 'react';
import { Container, Row } from 'react-bootstrap';

export default function Landingpage(): ReactElement {
  return (
    <Container fluid>
      <Row className="justify-content-md-center">
        <h1 className="h1-landingPage">SERVICEBOX</h1>
      </Row>
    </Container>
  );
}
