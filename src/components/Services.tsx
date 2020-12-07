import React, { ReactElement } from 'react';
import GenericTable from './shared/GenericTable';
import Service from '../types/Service';
import LoadingSpinner from './shared/LoadingSpinner';
import { useServicesApi } from '../hooks/useServicesApi';

export default function ServicesList(): ReactElement {
  const { state: services } = useServicesApi<Service[]>('api/services/', 'get');

  if (!services) {
    return <LoadingSpinner />;
  }

  return (
    <GenericTable<Service>
      objects={services}
      properties={[
        {
          key: 'title',
          label: 'Titel',
        },
        {
          key: 'date',
          label: 'Datum',
        },
      ]}
    />
  );
}
