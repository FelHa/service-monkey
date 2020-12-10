import React, { ReactElement } from 'react';
import { useServicesApi } from '../hooks/useServicesApi';
import LoadingSpinner from './shared/LoadingSpinner';
import User from '../types/User';
import { Card, Col, Container, Row } from 'react-bootstrap';

export default function Account(): ReactElement {
  const { state: user } = useServicesApi<User>(`api/users/me`, 'get');

  if (!user) {
    return <LoadingSpinner />;
  }

  return (
    <Container fluid>
      <Row className="justify-content-md-center">
        <Col md="auto">
          <Card style={{ width: '35rem' }}>
            <Card.Body>
              <Card.Title>{user.name}</Card.Title>
              <Card.Text>{user.email}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
