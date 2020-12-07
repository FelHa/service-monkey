import React, { ReactElement } from 'react';
import Service from '../types/Service';
import { useServicesApi } from '../hooks/useServicesApi';
import LoadingSpinner from './shared/LoadingSpinner';
import ListGroup from 'react-bootstrap/esm/ListGroup';
import ServiceListItem from './ServiceListItem';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function ServicesList(): ReactElement {
  const { state: services } = useServicesApi<Service[]>('api/services/', 'get');

  if (!services) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <h2>Services</h2>

      <Table bordered hover>
        <thead>
          <tr>
            <th>Titel</th>
            <th>Kategorie</th>
            <th>Anbieter</th>
            <th>Datum</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service._id}>
              <td>
                <Link to={`/services/${service._id}`}>{service.title}</Link>
              </td>
              <td>
                {service.categories.map((category, index) => (
                  <span key={index}>
                    {index < service.categories.length - 1
                      ? category.name + ', '
                      : category.name}
                  </span>
                ))}
              </td>
              <td>{service.user.name}</td>
              <td>{new Date(service.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
