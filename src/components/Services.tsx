import React, { ReactElement, useState } from 'react';
import Service from '../types/Service';
import { Link } from 'react-router-dom';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { useServicesApi } from '../hooks/useServicesApi';
import LoadingSpinner from './shared/LoadingSpinner';
import SelectableListgroup from './shared/SelectableListgroup';
import TableHead from './shared/TableHead';
import Category from '../types/Category';

export default function Services(): ReactElement {
  const { state: services } = useServicesApi<Service[]>('api/services/', 'get');
  const { state: categories } = useServicesApi<Category[]>(
    'api/categories/',
    'get'
  );
  const [selectedCategory, setSelectedCategory] = useState<Category[]>();

  if (!services || !categories) {
    return <LoadingSpinner />;
  }

  return (
    <Container fluid>
      <Row>
        <Col sm={2}>
          <SelectableListgroup
            items={categories.map((category) => ({
              _id: category._id,
              content: category.name,
            }))}
            onItemSelect={() => setSelectedCategory}
          />
        </Col>
        <Col sm={9}>
          <Table bordered hover>
            <TableHead labels={['Titel', 'Kategorie', 'Anbieter', 'Datum']} />
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
        </Col>
      </Row>
    </Container>
  );
}
