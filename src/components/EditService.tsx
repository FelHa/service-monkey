import React, { ReactElement } from 'react';
import { useServicesApi } from '../hooks/useServicesApi';
import { useParams } from 'react-router-dom';
import ServiceForm from './ServiceForm';
import LoadingSpinner from './shared/LoadingSpinner';
import Category from '../types/Category';
import Service from '../types/Service';

export default function AddService(): ReactElement {
  const { id } = useParams<{ id: string }>();

  const { state: service } = useServicesApi<Service>(
    `api/services/${id}`,
    'get'
  );

  const { state: allCategories } = useServicesApi<Category[]>(
    'api/categories/',
    'get'
  );

  if (!allCategories || !service) return <LoadingSpinner />;

  const categoriesChecked = allCategories.map((category) => {
    const checkedCategory = { ...category, checked: false };
    if (
      service.categories.find((serviceCat) => serviceCat._id === category._id)
    )
      checkedCategory.checked = true;
    return checkedCategory;
  });

  return (
    <ServiceForm
      serviceId={service._id}
      title={service.title}
      description={service.description}
      costs={service.costs}
      categories={categoriesChecked}
    />
  );
}
