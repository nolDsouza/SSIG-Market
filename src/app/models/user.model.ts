export interface User {
  _id: string;
  email: string;
  username: string;
  firstname: string;
  lastname: string;
  balance: number;
  accounts: Array<string>;
  exp: number;
  iat: number;
}
