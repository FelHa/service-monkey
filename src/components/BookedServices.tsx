import React, { ReactElement } from 'react';
import { Button, Container, Row, Table } from 'react-bootstrap';
import { useServicesApi } from '../hooks/useServicesApi';
import LoadingSpinner from './shared/LoadingSpinner';
import Subscription, { CanceledSubscription } from '../types/Subscription';
import { Link, useHistory } from 'react-router-dom';
import { genericApiAcess } from '../shared/genericApiAcess';
import TableHead from './shared/TableHead';

export default function BookedServices(): ReactElement {
  const { state: subscriptions } = useServicesApi<Subscription[]>(
    'api/subscriptions/userSubscriptions',
    'get'
  );
  const history = useHistory();

  if (!subscriptions) {
    return <LoadingSpinner />;
  }

  const onCancelation = async (subscription: Subscription) => {
    const data = {
      userId: subscription.user._id,
      serviceId: subscription.service._id,
    };

    await genericApiAcess<CanceledSubscription>(
      'api/cancelations',
      'post',
      data
    );
    history.push('/payedServices');
  };

  const activeSubscriptions = subscriptions.filter(
    (subscription) => !subscription.subscriptionFee
  );

  if (activeSubscriptions.length === 0) {
    return (
      <Container fluid>
        <Row className="justify-content-md-center">
          Momentan gibt es keine laufenden Dienste
        </Row>
      </Container>
    );
  }

  return (
    <Container fluid>
      <Row className="justify-content-md-center">
        <Table>
          <TableHead labels={['Titel', 'Gebucht am', 'Kosten', '']} />
          <tbody>
            {activeSubscriptions.map((subscription) => (
              <tr key={subscription._id}>
                <td>
                  <Link to={`/services/${subscription.service._id}`}>
                    {subscription.service.title}
                  </Link>
                </td>
                <td>{subscription.dateBuyed.toLocaleDateString()}</td>
                <td>{subscription.service.costs.amount}€</td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() => onCancelation(subscription)}
                  >
                    Kündigen
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>
    </Container>
  );
}
