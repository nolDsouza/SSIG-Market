import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { TransactionAccountService } from '../../services/transaction-account.service';
import { User } from '../../models/user.model';
import { Account } from '../../models/account.model';

const summable = base => {
  return Object.assign(base, {
    sum: () => {
      let total = 0;

      for (const property of base) {
          total += base[property];
      }
      return total;
    },
  });
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {
  private user: User;
  private companies: string[];
  private names: string[];
  private values: number[];
  private accounts: Account[];
  constructor(
    private auth: AuthenticationService,
    private treasury: TransactionAccountService,
  ) { }


  /**
   * Get the total balance of all transaction accounts.
   */
  get total() {
    if (!this.accounts) {
      return null;
    } else {
      return this.accounts.reduce( function(a, b) {
          return a + b.balance;
      }, 0);
    }
  }

  /**
   * Get the total amount of shares this user owns.
   */
  get stockOwned() {
    if (!this.accounts) {
      return 0;
    }
    if (!this.accounts) {
      return null;
    } else {
      return this.accounts.reduce( function(a, b) {
        return a + Object.values(b.shares).reduce ( function(c, d) {
          return c + parseFloat(d);
        }, 0);
      }, 0);
    }
  }

  get profits() {
   const profits = this.total - 100000000;
    return (profits > 0) ? profits : 0;
  }

  ngOnInit() {

    this.treasury.getUserAccounts(this.auth.getAccounts()).subscribe(accounts => {
      this.accounts = accounts as Array<Account>;
      console.log(this.accounts);
    });

    this.user = this.auth.getUser() as User;

    this.companies = [
      'NAB',
      'MQG',
      'COM',
      'DOM',
      'ABC',
      'DMT',
      'ASD',
      'GHJ',
      'YUI',
      'POI'
    ];

    this.names = [
      'username0',
      'username1',
      'username2',
      'username3',
      'username4',
      'username5',
      'username6',
      'username7',
      'username8',
      'username9'
    ];

    this.values = [
      12, 324, 635, 2345, 64, 77, 0, 2342, 33, 55
    ];
  }

  range() {
    // const _i = 10;
    const arr = Array.from(Array(10).keys());
    return arr;
  }
}
