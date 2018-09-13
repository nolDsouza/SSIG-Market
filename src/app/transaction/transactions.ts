export class Transactions {
	username: string;
	companycode: string;
	shares:number;
	shareprice: number;
	cost:number;
	signature:string;
}

export const AllTrans: Transactions[] = [
{username: 'Test', 
companycode: 'ASX', 
shares:3,
shareprice: 1.574,
cost: -4.722,
signature: ""},
{username: 'JohnTest', 
companycode: 'ASX', 
shares:45,
shareprice: 1.524,
cost: -68.58,
signature: ""},
{username: 'Test', 
companycode: 'ASX', 
shares:3,
shareprice: 1.574,
cost: -4.722,
signature:""}
];
