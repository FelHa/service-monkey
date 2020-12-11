import { LoggedInUser } from './User';

interface UserLoggedIn {
  type: 'UserLoggedIn';
  user: LoggedInUser;
}

interface UserLoggedOut {
  type: 'UserLoggedOut';
}

export type Actions = UserLoggedIn | UserLoggedOut;
