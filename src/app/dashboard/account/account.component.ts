import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { Account } from '../../models/account.model';
import { AuthenticationService } from '../../services/authentication.service';
import { TransactionAccountService } from '../../services/transaction-account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  user: User;
  accounts: Account;

  constructor(
  	private auth: AuthenticationService,
  	private accService: TransactionAccountService
  	) { }


  ngOnInit() {
  	this.user = this.auth.getUser() as User;

  	let _id = this.auth.getUser().accounts.pop();
  	/*return this._restService.addRequest('object', 'method').run()
        .subscribe(
            res => {
                // do something here
                res;
            },
            err => {
                console.error(err);
            }
        );*/
  	this.accService.getTransactionAccountById(_id)
  		.subscribe(
  			res => {
  				this.accounts = res;
  			},
  			err => {
  				console.log(err);
  			}
  		);
  }

  onClick() {
  	console.log(this.accounts);
  }

}
