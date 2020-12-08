export default interface User {
  _id: string;
  name: string;
  email: string;
}

export interface LoggedInUser {
  _id: string;
  iat: number;
  isAdmin: boolean;
}
