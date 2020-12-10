import Service from './Service';
import User from './User';

export default interface Subscription {
  _id: string;
  user: User;
  service: Service;
  dateBuyed: string;
  subscriptionFee?: number;
  dateReturned?: string;
}

export interface CanceledSubscription extends Subscription {
  subscriptionFee: number;
}
