import React, { ReactElement } from 'react';
import { useServicesApi } from '../hooks/useServicesApi';
import ServiceForm from './ServiceForm';
import LoadingSpinner from './shared/LoadingSpinner';
import Category from '../types/Category';

export default function AddService(): ReactElement {
  const { state: categories } = useServicesApi<Category[]>(
    'api/categories/',
    'get'
  );

  if (!categories) return <LoadingSpinner />;

  const categoriesChecked = categories.map((category) => ({
    ...category,
    checked: false,
  }));

  return <ServiceForm isEdit={false} categories={categoriesChecked} />;
}
