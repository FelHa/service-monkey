import Service from './Service';
import { LoggedInUser } from './User';

/* Global store */

export interface Store {
  user: LoggedInUser | undefined;
  services: Service[];
  subscribed: Service[];
}
