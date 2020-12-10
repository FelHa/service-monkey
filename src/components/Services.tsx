import React, { ReactElement, useState } from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { useServicesApi } from '../hooks/useServicesApi';
import LoadingSpinner from './shared/LoadingSpinner';
import SelectableListgroup from './shared/SelectableListgroup';
import TableHead from './shared/TableHead';
import Pagination from './shared/Pagination';
import paginateServices from '../shared/paginateServices';
import Category from '../types/Category';
import Service from '../types/Service';
import Page from '../types/Page';

export default function Services(): ReactElement {
  const { state: services } = useServicesApi<Service[]>('api/services/', 'get');
  const { state: categories } = useServicesApi<Category[]>(
    'api/categories/',
    'get'
  );
  const [selectedCategory, setSelectedCategory] = useState<Category>();
  const [page, setPage] = useState<Page>({ pageSize: 5, currentPage: 1 });

  if (!services || !categories) {
    return <LoadingSpinner />;
  }

  const { paginatedServices, filteredServices } = paginateServices(
    services,
    selectedCategory,
    page
  );

  const onListItemSelect = (category: Category) => {
    setSelectedCategory(category);
    setPage((page) => ({ ...page, currentPage: 1 }));
  };

  const onPageSelect = (selectedPage: number) => {
    setPage((page) => ({ ...page, currentPage: selectedPage }));
  };

  return (
    <Container fluid>
      <Row>
        <Col sm={2}>
          <SelectableListgroup<Category>
            objects={[
              { _id: 'Alle_Kategorien', name: 'Alle Kategorien' },
              ...categories,
            ]}
            content="name"
            onSelect={onListItemSelect}
          />
        </Col>
        <Col sm={9}>
          <Table hover>
            <TableHead
              labels={['Titel', 'Kategorie', 'Anbieter', 'Eingestellt am']}
            />
            <tbody>
              {paginatedServices.map((service) => (
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
                  <td>{service.date.toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Pagination
            pageCount={filteredServices.length / page.pageSize}
            selectedPage={page.currentPage}
            onSelect={onPageSelect}
          />
        </Col>
      </Row>
    </Container>
  );
}
