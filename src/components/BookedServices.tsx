import React, { ReactElement } from 'react';
import { Button, Container, Row, Table } from 'react-bootstrap';
import { useServicesApi } from '../hooks/useServicesApi';
import LoadingSpinner from './shared/LoadingSpinner';
import Subscription, { CanceledSubscription } from '../types/Subscription';
import { Link } from 'react-router-dom';
import { genericApiAcess } from '../shared/genericApiAcess';

export default function BookedServices(): ReactElement {
  const { state: subscriptions } = useServicesApi<Subscription[]>(
    'api/subscriptions/userSubscriptions',
    'get'
  );

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
  };

  const activeSubscriptions = subscriptions.filter(
    (subscription) => !subscription.subscriptionFee
  );

  const paidSubscriptions = subscriptions.filter(
    (subscription) => subscription.subscriptionFee
  );

  return (
    <Container fluid>
      <Row className="justify-content-md-center">
        <div>Bezahlte Dienste</div>
        <Table>
          <tbody>
            {paidSubscriptions.map((subscription) => (
              <tr key={subscription._id}>
                <td>{subscription.user.name}</td>
                <td>
                  <Link to={`/services/${subscription.service._id}`}>
                    {subscription.service.title}
                  </Link>
                </td>
                <td>{subscription.dateBuyed}</td>
                <td>
                  {subscription.service.costs.isMonthly
                    ? 'montatlich'
                    : 'einmalig'}
                </td>
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
      <Row className="justify-content-md-center">
        <div>Laufende Dienste</div>
        <Table>
          <tbody>
            {activeSubscriptions.map((subscription) => (
              <tr key={subscription._id}>
                <td>{subscription.user.name}</td>
                <td>
                  <Link to={`/services/${subscription.service._id}`}>
                    {subscription.service.title}
                  </Link>
                </td>
                <td>{subscription.dateBuyed}</td>
                <td>
                  {subscription.service.costs.isMonthly
                    ? 'montatlich'
                    : 'einmalig'}
                </td>
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
