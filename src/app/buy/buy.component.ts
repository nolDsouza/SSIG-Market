import { Component, OnInit } from '@angular/core';
import {UserBuys,CompanyShares, UserBought, Companies} from './buyarrays';
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
  //SHARE NUMBER DOESNT UPDATE YET
  Buy(company:string, amount:number){
	  var loop = 0;
	  for (let C of Companies){
		  if(company != C.companycode){
			  loop = 1;
		  }
	  }
	  for (let user of UserBought){
		  if(this.THISUSER === user.username && company === user.companycode){
			  user.shares =  user.shares + amount;
			  loop = 1;
			  break;			  
		  }
	  }
	  //NOT ENTERING THIS CONDITION
	  if (loop != 1){
	  UserBought.push({username:this.THISUSER, companycode:company, shares:amount});
	  }
	  console.log(UserBought);
	  console.log(Companies);
  }

}

