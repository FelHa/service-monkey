import _ from 'lodash';
import Category from '../types/Category';
import Page from '../types/Page';
import Service from '../types/Service';

export default function paginateServices(
  services: Service[],
  selectedCategory: Category | undefined,
  page: Page
): Service[] {
  const filteredServices =
    selectedCategory && selectedCategory._id !== 'Alle_Kategorien'
      ? services.filter((service) =>
          service.categories.some(
            (category) => category._id === selectedCategory._id
          )
        )
      : services;

  const startIndex = (page.currentPage - 1) * page.pageSize;

  const paginatedServices = _(filteredServices)
    .slice(startIndex)
    .take(page.pageSize)
    .value();

  return paginatedServices;
}
