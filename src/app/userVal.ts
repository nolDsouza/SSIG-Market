import {Accounts} from './buy-sell/buysellarrays';
export class UserArray {
	username: string;
	password: string;
	accounts: Accounts[];
	firstname: string;
	lastname: string;
	email: string;
}
export const UserData: UserArray[] = [
  { username: 'Test', password: 'Test123',
accounts: [{accountID: 'TA1', accountValue: 1586.42},{accountID: 'TA2', accountValue: 12.42}],
  firstname: 'TestF', lastname: 'TestL', email: 'test@test.com' }
];