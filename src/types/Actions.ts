import Service from './Service';
import { LoggedInUser } from './User';

interface AddToSubscribed {
  type: 'AddToSubscribed';
  service: Service;
}

interface RemoveFromSubscribed {
  type: 'RemoveFromSubscribed';
  service: Service;
}

interface UserLoggedIn {
  type: 'UserLoggedIn';
  user: LoggedInUser;
}

interface UserLoggedOut {
  type: 'UserLoggedOut';
}

export type Actions =
  | AddToSubscribed
  | RemoveFromSubscribed
  | UserLoggedIn
  | UserLoggedOut;
