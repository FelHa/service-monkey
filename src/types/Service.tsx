import Category from './Category';
import Costs from './Cost';
import User from './User';

export default interface Service {
  _id: string;
  user: User;
  costs: Costs;
  title: string;
  categories: Category[];
  date: string;
  __v: number;
}
