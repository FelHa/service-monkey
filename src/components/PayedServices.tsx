import React, { ReactElement } from 'react';
import { Container, Row, Table } from 'react-bootstrap';
import { useServicesApi } from '../hooks/useServicesApi';
import LoadingSpinner from './shared/LoadingSpinner';
import Subscription from '../types/Subscription';
import { Link } from 'react-router-dom';
import TableHead from './shared/TableHead';

export default function BookedServices(): ReactElement {
  const { state: subscriptions } = useServicesApi<Subscription[]>(
    'api/subscriptions/userSubscriptions',
    'get'
  );

  if (!subscriptions) {
    return <LoadingSpinner />;
  }

  const paidSubscriptions = subscriptions.filter(
    (subscription) => subscription.subscriptionFee
  );

  return (
    <Container fluid>
      <Row className="justify-content-md-center">
        <Table>
          <TableHead labels={['Titel', 'Gebucht am', 'Gesamtkosten']} />
          <tbody>
            {paidSubscriptions.map((subscription) => (
              <tr key={subscription._id}>
                <td>
                  <Link to={`/services/${subscription.service._id}`}>
                    {subscription.service.title}
                  </Link>
                </td>
                <td>{subscription.dateBuyed.toLocaleDateString()}</td>
                <td>{subscription.service.costs.amount}€</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>
    </Container>
  );
}
