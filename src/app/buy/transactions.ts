export class Transactions {
	username: string;
	companycode: string;
	shares:number;
	shareprice: number;
	cost:number;
}

export const AllTrans: Transactions[] = [
{username: 'Test', 
companycode: 'ASX', 
shares:3,
shareprice: 1.574
cost: -4.722},

{username: 'JohnTest', 
companycode: 'ASX', 
shares:45,
shareprice: 1.524
cost: -68.58},

{username: 'Test', 
companycode: 'ASX', 
shares:3,
shareprice: 1.574
cost: -4.722}
];
