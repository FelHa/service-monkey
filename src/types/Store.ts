import { LoggedInUser } from './User';

/* Global store */

export interface Store {
  user: LoggedInUser | undefined;
}
