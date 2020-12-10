import Category from './Category';
import Costs from './Cost';
import User from './User';

export default interface Service extends ServiceBase {
  date: Date;
}

export interface ServiceRaw extends ServiceBase {
  date: string;
}

export interface ServiceBase {
  _id: string;
  user: User;
  description: string;
  costs: Costs;
  title: string;
  categories: Category[];
}

function isServiceBase(data: ServiceBase): data is ServiceBase {
  type ServiceBaseKeys = keyof ServiceBase;
  const mustHaveKeys = [
    '_id',
    'user',
    'description',
    'costs',
    'title',
    'categories',
  ] as Array<ServiceBaseKeys>;
  return data instanceof Object && mustHaveKeys.every((key) => data[key]);
}

export function isServiceRaw(data: ServiceRaw): data is ServiceRaw {
  type ServiceRawKeys = keyof ServiceRaw;
  const mustHaveKeys = ['date'] as Array<ServiceRawKeys>;
  return (
    data instanceof Object &&
    isServiceBase(data) &&
    mustHaveKeys.every((key) => data[key])
  );
}

export function isServiceRawArray(data: ServiceRaw[]): data is ServiceRaw[] {
  return (
    data instanceof Array && data.every((service) => isServiceRaw(service))
  );
}
