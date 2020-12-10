import React, { ReactElement } from 'react';
import { Container, Row, Spinner } from 'react-bootstrap';

export default function LoadingSpinner(): ReactElement {
  return (
    <Container fluid>
      <Row className="justify-content-md-center">
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </Row>
    </Container>
  );
}
