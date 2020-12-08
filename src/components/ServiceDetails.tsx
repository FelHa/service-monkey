import React, { ReactElement } from 'react';
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useServicesApi } from '../hooks/useServicesApi';
import Service from '../types/Service';
import LoadingSpinner from './shared/LoadingSpinner';

export default function ServiceDetails(): ReactElement {
  const { id } = useParams<{ id: string }>();

  const { state: service } = useServicesApi<Service>(
    `api/services/${id}`,
    'get'
  );

  if (!service) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <h2>Details</h2>
      <div>
        {service.title}, {service.user.name}, {service.date},
        {service.description}
      </div>
      <Button variant="primary">Buchen</Button>
    </>
  );
}
