import React, { ReactElement } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import { useStore } from '../hooks/useStore';
import { useServicesApi } from '../hooks/useServicesApi';
import LoadingSpinner from './shared/LoadingSpinner';
import Service from '../types/Service';
import { subscribe } from '../shared/subscriptionService';

export default function ServiceDetails(): ReactElement {
  const { id } = useParams<{ id: string }>();
  const { store } = useStore();
  const { state: service } = useServicesApi<Service>(
    `api/services/${id}`,
    'get'
  );

  const history = useHistory();

  if (!service) {
    return <LoadingSpinner />;
  }

  const onEdit = () => {
    history.push(`/editService/${service._id}`);
  };

  const onBook = async () => {
    const data = {
      user: store.user?._id,
      service: service._id,
    };

    await subscribe(data);
    history.push(`/services`);
  };

  return (
    <Container fluid>
      <Row className="justify-content-md-center">
        <Col md="auto">
          <Card style={{ width: '35rem' }}>
            <Card.Body>
              <Card.Title style={{ textAlign: 'center' }}>
                {service.title}
              </Card.Title>
              <Card.Text style={{ fontWeight: 'bold' }}>Anbieter</Card.Text>
              <Card.Text>{service.user.name}</Card.Text>
              <Card.Text style={{ fontWeight: 'bold' }}>
                Eingestellt am
              </Card.Text>
              <Card.Text>{service.date.toLocaleDateString()}</Card.Text>
              <Card.Text style={{ fontWeight: 'bold' }}>Beschreibung</Card.Text>
              <Card.Text>{service.description}</Card.Text>
              <Card.Text style={{ fontWeight: 'bold' }}>Kosten</Card.Text>
              <Card.Text>
                {service.costs.amount}€{' '}
                {service.costs.isMonthly ? '(monatlich)' : '(einmalig)'}
              </Card.Text>
              {store.user && store.user._id === service.user._id && (
                <Button variant="primary" onClick={onEdit}>
                  Bearbeiten
                </Button>
              )}
              {store.user && store.user._id !== service.user._id && (
                <Button variant="primary" onClick={onBook}>
                  Buchen
                </Button>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
