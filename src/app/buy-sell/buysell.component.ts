import { Component, OnInit } from '@angular/core';
import {UserBuys,CompanyShares, UserBought, Companies} from './buysellarrays';
import {Transactions, AllTrans} from '../transaction/transactions';
@Component({
  selector: 'app-buysell',
  templateUrl: './buysell.component.html',
  styleUrls: ['./buysell.component.css']
})
export class BuySellComponent implements OnInit {
THISUSER = 'Test';
  constructor() { }

  ngOnInit() {
  }
  
  genTrans(username:string, company:string, shares:number){

  }
  
  Buy(company:string, amount:number){
//Find the value of the share so it can be stored in transactions later	
	var shareval =0;
	 for (let C of Companies){
	  if (company == C.companycode){
		  shareval = C.shareprice;
	  }
	}
	if (shareval == 0){
		return;
	}
	var cost = -(shareval*amount);
	
//Looks for shares already owned by the user, adds a new value if not
	  for (let user of UserBought){
		  if(this.THISUSER === user.username && company === user.companycode){
			  user.shares =  user.shares + amount;
			  console.log(UserBought);
			  AllTrans.push({username:this.THISUSER, companycode:company, shares:amount, shareprice:shareval , cost:cost,signature:""});
			  console.log(AllTrans);
			  return;			  
		  }
	  }
	  UserBought.push({username:this.THISUSER, companycode:company, shares:amount});
	  console.log(UserBought);

	  AllTrans.push({username:this.THISUSER, companycode:company, shares:amount, shareprice:shareval , cost:cost,signature:""});
	  console.log(AllTrans);
  }
  
  
  
  
  
  
    Sell(company:string, amount:number){
	 //Find the value of the share so it can be stored in transactions later
	 var shareval =0;
	 for (let C of Companies){
	  if (company == C.companycode){
		  shareval = C.shareprice;
	  }
	}
	if (shareval == 0){
		return;
	}
	//Looks for shares already owned by the user, returns if nothing is found
	  for (let user of UserBought){
		  if(this.THISUSER === user.username && company === user.companycode){
			if(user.shares == 0 || user.shares < amount){
				  return;
			}
		  user.shares =  user.shares - amount;
		  console.log(UserBought);
		  AllTrans.push({username:this.THISUSER, companycode:company, shares:amount, shareprice:shareval , cost:shareval*amount,signature:""});
		  console.log(AllTrans);
		  return;			  
		  }
	  }
	  return;
  }

}

