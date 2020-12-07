import React, { ReactElement } from 'react';
import { ListGroup } from 'react-bootstrap';
import Service from '../types/Service';
import ServiceListItem from './ServiceListItem';
import LoadingSpinner from './shared/LoadingSpinner';
import { useServicesApi } from '../hooks/useServicesApi';

export default function ServicesList(): ReactElement {
  const { state: services } = useServicesApi<Service[]>('api/services/', 'get');

  if (!services) {
    return <LoadingSpinner />;
  }

  return (
    <ListGroup>
      {services.map((service) => (
        <ListGroup.Item key={service._id}>
          <ServiceListItem service={service} />
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}
