import React, { ReactElement } from 'react';
import { Spinner } from 'react-bootstrap';

export default function LoadingSpinner(): ReactElement {
  return (
    <Spinner animation="border" role="status">
      <span className="sr-only">Loading...</span>
    </Spinner>
  );
}
