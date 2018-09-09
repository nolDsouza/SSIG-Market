import { Component, OnInit } from '@angular/core';
import {UserBuys,CompanyShares, UserBought, Companies} from './buyarrays';
import {Transactions, AllTrans} from './transactions';
@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent implements OnInit {
THISUSER = 'Test';
  constructor() { }

  ngOnInit() {
  }
  
  genTrans(username:string, company:string, shares:number){

  }
  
  Buy(company:string, amount:number){
	 var shareval =0;
	 for (let C of Companies){
	  if (company == C.companycode){
		  var shareval = C.shareprice;
	  }
	}	  
	  for (let user of UserBought){
		  if(this.THISUSER === user.username && company === user.companycode){
			  user.shares =  user.shares + amount;
			  console.log(UserBought);
			  AllTrans.push({username:this.THISUSER, companycode:company, shares:amount, shareprice:shareval , cost:shareval*amount});
			  console.log(AllTrans);
			  return;			  
		  }
	  }
	  //NOT ENTERING THIS CONDITION
	  UserBought.push({username:this.THISUSER, companycode:company, shares:amount});
	  console.log(UserBought);

	  AllTrans.push({username:this.THISUSER, companycode:company, shares:amount, shareprice:shareval , cost:shareval*amount});
	  console.log(AllTrans);
  }

}

