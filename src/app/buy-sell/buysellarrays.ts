export class UserBuys {
	username: string;
	companycode: string;
	shares:number;
}

export class CompanyShares {
	companyname:string;
	companycode: string;
	shareprice: number;
	numshares: number;
}

export const UserBought: UserBuys[] = [
{username: 'Test', companycode: 'ASX', shares:3}
];

export const Companies: CompanyShares[]= [
{companyname: 'Australian Securities Exchange', companycode: 'ASX', shareprice:1.574, numshares:123554},
{companyname: 'Test Company', companycode: 'TST', shareprice:1.324, numshares:1134}
];