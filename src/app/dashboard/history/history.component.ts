import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../../services/authentication.service';
import { AccountBlueprint, TransactionAccountService } from '../../services/transaction-account.service';
import { Transaction, TransactionPayload  } from '../../models/transaction.model';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  user: User;
  transactions_unf;
  sold = false;

  get transactions() {
    if (!this.transactions_unf) {
      return;
    }
    if (!this.sold) {
      return this.transactions_unf.filter(t => t.amount > 0);
    } else {
      return this.transactions_unf.filter(t => t.amount < 0);
    }
  }


  constructor(
    private auth: AuthenticationService,
    private transactionService: TransactionAccountService
  ) { }

  ngOnInit() {
    this.user = this.auth.getUser() as User;
    this.getTransactions();
  }

  async getTransactions() {
    this.transactions_unf = await this.transactionService.getTransactions(this.user._id);
    console.log(this.transactions_unf);
  }

}
