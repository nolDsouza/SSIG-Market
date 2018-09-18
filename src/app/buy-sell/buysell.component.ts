import { Component, OnInit } from '@angular/core';
import {UserBuys,CompanyShares, UserBought, Companies} from './buysellarrays';
import {Transactions, AllTrans} from '../transaction/transactions';
import {UserData} from '../userVal'; //Get all user info
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
  
  
  Buy(company:string, amount:number, tradingacc:string){
//Find the value of the share so it can be stored in transactions later	
	if(amount == 0 || amount == null){
		return;
	}
	var shareval = 0;
	 for (let C of Companies){
	  if (company == C.companycode){
		  shareval = C.shareprice;
	  }
	}
	if (shareval == 0){ //In case the retrieval fails
		return;
	}
	var cost = -(shareval*amount); //Sets the cost of the transaction
	
//Deducts the amount of money from the trading account
	for(let user of UserData){  
	if(user.username == this.THISUSER){
	  for(let account of user.accounts){
		if(account.accountID == tradingacc){
			account.accountValue = parseFloat(account.accountValue)+ parseFloat(cost);
			console.log(UserData);
		}
	  }
	}
	}
//Looks for shares already owned by the user, adds a new value if not
	  for (let user of UserBought){
		  if(this.THISUSER === user.username && company === user.companycode && user.accountID == tradingacc){
			  user.shares =  parseInt(user.shares)+parseInt(amount);
			  AllTrans.push({username:this.THISUSER, companycode:company, shares:parseInt(amount), shareprice:shareval , cost:cost,signature:""});
			  console.log(UserBought);
			  console.log(AllTrans);
			  return;			  
		  }
	  }
	  UserBought.push({username:this.THISUSER, companycode:company, shares:parseInt(amount), accountID: tradingacc});
	  console.log(UserBought);

	  AllTrans.push({username:this.THISUSER, companycode:company, shares:parseInt(amount), shareprice:shareval , cost:parseFloat(cost),signature:""});
	  console.log(AllTrans);
}
  
  
  
  
  
  
Sell(company:string, amount:number, tradingacc:string){
 //Find the value of the share so it can be stored in transactions later
if(amount == 0 || amount == null){
	return;
}	 
 var shareval =0;
 for (let C of Companies){
  if (company == C.companycode){
	  shareval = C.shareprice;
  }
}
if (shareval == 0){
	return;
}
var cost = (shareval*amount)

//Looks for shares already owned by the user, returns if nothing is found
  for (let user of UserBought){
	  if(this.THISUSER === user.username && company === user.companycode && user.accountID == tradingacc){
		if(user.shares == 0 || user.shares < amount || user.shares == null){
			  var confirmed = false;
			  return;
		}
	  user.shares =  parseInt(user.shares) - parseInt(amount);
	  var confirmed = true;
	  console.log(UserBought);
	  AllTrans.push({username:this.THISUSER, companycode:company, shares:parseInt(amount), shareprice:shareval , cost:parseFloat(cost),signature:""});
	  console.log(AllTrans);
	  return;			  
	  }
  }
	if(confirmed == true){ //Executes only if the shares are sold
		for(let user of UserData){  
			if(user.username == this.THISUSER){
			  for(let account of user.accounts){
				if(account.accountID == tradingacc){
					account.accountValue = parseFloat(account.accountValue) - parseFloat(cost);
					console.log(UserData);
				}
			  }
			}
		}
	}
}

}

