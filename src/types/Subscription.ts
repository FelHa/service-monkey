import Service from './Service';
import User from './User';

export default interface Subscription extends BaseSubscription {
  dateBuyed: Date;
}

export interface SubscriptionRaw extends BaseSubscription {
  dateBuyed: string;
}

export interface BaseSubscription {
  _id: string;
  user: User;
  service: Service;
  subscriptionFee?: number;
  dateReturned?: string;
}

export interface CanceledSubscription extends Subscription {
  subscriptionFee: number;
}

export function isSubscriptionRaw(
  data: SubscriptionRaw
): data is SubscriptionRaw {
  type RawSubscriptionKeys = keyof SubscriptionRaw;
  const mustHaveKeys = [
    '_id',
    'user',
    'service',
    'dateBuyed',
  ] as Array<RawSubscriptionKeys>;
  return data instanceof Object && mustHaveKeys.every((key) => data[key]);
}

export function isSubscriptionRawArray(
  data: SubscriptionRaw[]
): data is SubscriptionRaw[] {
  return (
    data instanceof Array && data.every((service) => isSubscriptionRaw(service))
  );
}
